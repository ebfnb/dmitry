import {schemaComposer} from 'graphql-compose'
import _ from 'ramda'
const uuidv1 = require('uuid/v1')

const {TypeComposer,InputTypeComposer,Query,Mutation}=schemaComposer
let currentUser

TypeComposer.create(`type ErrorsPayload {
    errors:[String]
}`)
const UserProfile=TypeComposer.create(`type UserProfile {
    firstName:String
    lastName:String
    notes:String
    roles:[String]
}`)
const CurrentUserPayload=TypeComposer.create(`type CurrentUserPayload {
    errors:[String]
    data:UserProfile
}`)
const UserProfileInput=InputTypeComposer.create(`input UserProfileInput {
    firstName:String
    lastName:String
    notes:String
    roles:[String]
}`)
Mutation.addFields({
    login:{
        type:CurrentUserPayload,
        args:{
            input:InputTypeComposer.create(`input LoginInput {
                username:String
                password:String
            }`)
        },
        resolve:(mockStore,{input})=>{
            console.log(mockStore)
            const {username,password}=input
            const errors=[]
            const users=mockStore.users
            const user=_.find(_.propEq('username',username))(users)
            if(!user)return {
                errors:[`can not find user ${username}`]
            }
            if(user.password!==password)return {
                errors:['bad pssword']
            }
            currentUser=user
            return {errors,
                data:user.profile
            }
        }
    },
    logout:{
        type:'ErrorsPayload',
        resolve:()=>{
            currentUser=undefined
            return {errors:[]}
        },
    },
    register:{
        type:'CurrentUserPayload',
        args:{
            input:InputTypeComposer.create(`input RegisterInput {
                username:String
                password:String
                profile:UserProfileInput
            }`)
        },
        resolve:(mockStore,{input:{username,password,profile={}}})=>{
            mockStore.users.push({username,password,profile,
                id:uuidv1(),
                roles:['registered']
            })
            return {errors:[]}
        }
    },
    updateCurrentUserProfile:{
        type:'ErrorsPayload',
        args:{input:UserProfileInput},
        resolve:(__,{input:profileUpdater})=>{
            if(!currentUser)return {
                errors:['no current user']
            }
            Object.assign(currentUser.profile,profileUpdater)
        }
    }
})

Query.addFields({
  CurrentUser:{
    type:CurrentUserPayload,
    resolve:()=>({
        errors:[],
        data:currentUser.profile
    }),
  },
})
