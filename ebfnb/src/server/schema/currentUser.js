import {schemaComposer} from 'graphql-compose'
import {AuthenticationError, UserInputError} from 'apollo-server'
import _ from 'ramda'
const uuidv1 = require('uuid/v1')

const {TypeComposer,InputTypeComposer,Query,Mutation}=schemaComposer
let currentUser
const UserProfileTC=TypeComposer.create(`type UserProfile {
    firstName:String
    lastName:String
    notes:String
    roles:[String]
}`)
const UpdateProfileITC=InputTypeComposer.create(`input UpdateProfileInput {
    firstName:String
    lastName:String
    notes:String
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
        resolve:({users},{input:{username,password}})=>{
            const user=_.find(_.propEq('username',username))(users)
            if(!user)throw new UserInputError(`can not find user ${username}`)
            if(user.password!==password)throw new UserInputError('password does not match')
            currentUser=user
        }
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
        resolve:({users},{input:{username,password,profile={}}})=>{
            if(_.find(_.propEq('username',username))(users))throw new UserInputError(`${username} username is not available`)
            currentUser={username,password,profile,
                id:uuidv1(),
                roles:['registered']
            }
            users.push(currentUser)
        }
    },
    updateProfile:{
        type:'Void',
        args:{input:UpdateProfileITC},
        resolve:(__,{input:profileUpdater})=>{
            if(!currentUser)throw new UserInputError('Please, register')
            Object.assign(currentUser.profile,profileUpdater)
            return {}
        }
    }
})
Query.addFields({
  CurrentUser:{
    type:'UserProfile',
    resolve:()=>(
        currentUser?{currentUser:currentUser.profile}:{}
    )
  },
})
