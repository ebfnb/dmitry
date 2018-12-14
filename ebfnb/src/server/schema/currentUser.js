import {schemaComposer} from 'graphql-compose'
import handleResolverErrors from './handleResolverErrors'
import {ServerError,CurrentUserError} from './errorClasses'
import _ from 'ramda'
const uuidv1 = require('uuid/v1')

const {TypeComposer,InputTypeComposer,Query,Mutation}=schemaComposer
let currentUser
const throwServerError=(message)=>{
    throw new ServerError({ data:{message}})
}
const UserProfileTC=TypeComposer.create(`type UserProfile {
    firstName:String
    lastName:String
    notes:String
    roles:[String]
}`)
const CurrentUserTC=TypeComposer.create(`type CurrentUser {
    currentUser:UserProfile
}`)
const UserProfileITC=InputTypeComposer.create(`input UserProfileInput {
    firstName:String
    lastName:String
    notes:String
    roles:[String]
}`)
const LoginITC=InputTypeComposer.create(`input LoginInput {
    username:String
    password:String
}`)
const RegisterITC=InputTypeComposer.create(`input RegisterInput {
    username:String
    password:String
    profile:UserProfileInput
}`)
Mutation.addFields({
    login:{
        name:'login',
        type:'Void',
        args:{input:LoginITC},
        resolve:handleResolverErrors(
            ({users},{input:{username,password}})=>{
                const user=_.find(_.propEq('username',username))(users)
                if(!user)throwServerError(`can not find user ${username}`)
                if(user.password!==password)throwServerError(`bad password`)
                currentUser=user
                return {}
            }
        )
    },
    logout:{
        type:'Void',
        resolve:()=>{
            currentUser=undefined
            return {}
        },
    },
    register:{
        type:'Void',
        args:{input:RegisterITC},
        resolve:handleResolverErrors(
            ({users},{input:{username,password,profile={}}})=>{
                if(_.find(_.propEq('username',username))(users))throwServerError(`username ${username} not available`)
                users.push({username,password,profile,
                    id:uuidv1(),
                    roles:['registered']
                })
                return {}
            }
        )
    },
    updateCurrentUserProfile:{
        type:'Void',
        args:{input:UserProfileITC},
        resolve:(__,{input:profileUpdater})=>{
            if(!currentUser)throwServerError('no current user')
            Object.assign(currentUser.profile,profileUpdater)
            return {}
        }
    }
})
Query.addFields({
  CurrentUser:{
    type:'CurrentUser',
    resolve:()=>(
        currentUser?{currentUser:currentUser.profile}:{}
    )
  },
})
