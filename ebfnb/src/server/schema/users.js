import {schemaComposer} from 'graphql-compose'
import _ from 'ramda'
const uuidv1 = require('uuid/v1')

const {TypeComposer,InputTypeComposer,Query,Mutation}=schemaComposer
let currentUser
const configTC=([name,dataType=name])=>({
  name:`${name}Output`,
  fields:{
    errors:`[Error]`,
    data:dataType
  }
})
const UserProfile=TypeComposer.create({
  name: 'UserProfile',
  fields: {
    firstName: 'String',
    lastName: 'String',
    notes:'String',
    name:{
      type:'String',
      description:'full name',
      resolver:user=>`${user.firstName} ${user.lastName}`
    }
  }
})
TypeComposer.create({
  name: 'User',
  fields: {
    id:'ID',
    username:'String',
    password:'String',
    roles:'[String]',
    profile:'UserProfile'
  }
})
const UserCredentialsInput=InputTypeComposer.create(`type UserCredentialsInput {
    username:String
    password:String
}`)
//UserCredentialsInput.clone('RegisterInput')
TypeComposer.create(`type ErrorsPayload {
    errors:[String]
}`)
TypeComposer.create(`type LoginPayload {
    errors:[String]
    data:CurrentUser
}`)
Mutation.addFields({
    login:{
        type:'LoginPayload',
        args:{input:UserCredentialsInput},
        resolve:(mockStore,{input:{username,password}})=>{
            const errors=[]
            const users=mockStore.users
            const user=_.find(_.propEq('username',username))(users)
            if(!user)errors.push(`can not find user ${username}`)
            if(user.password!==password)errors.push(`bad password`)
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
        type:'RegisterInput',
        args:{input:UserCredentialsInput},
        resolve:(mockStore,{input:{username,password,profile}})=>{
            mockStore.users.push({username,password,profile,
                id:uuidv1(),
                roles:['registered']
            })
            return {errors:[]}
        }
    },
    updateCurrentUserProfile:{
        type:'ErrorsPayload',
        args:{input:UserProfile.getInputTypeComposer()},
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
    type:`type CurrentUserPayload {
        errors:[String]
        data:UserProfile
    }`,
    resolve:()=>({
        errors:[],
        data:currentUser.profile
    }),
  },
})
console.log(schemaComposer.Mutation)