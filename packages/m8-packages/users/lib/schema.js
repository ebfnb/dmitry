import {makeExecutableSchema} from 'graphql-tools'
import graphql from 'graphql'
import gql from 'graphql-tag'
import {schemaComposer,TypeComposer,InputTypeComposer,Query,Mutation} from 'graphql-compose'
import {getOrCreateTC,getOrCreateITC} from 'm8-tools/graphqlComposer'
import _ from 'ramda'

const configTC=([name,dataType=name])=>({
  name:`${name}Output`,
  fields:{
    errors:`[Error]`,
    data:dataType
  }
})
const createTC=config=>TypeComposer.create(config)
const createITC=config=>InputTypeComposer.create(props)
const getTC=name=>schemaComposer.getTC(name)
const getTCFields=name=>getTC(name).getFields()
createTC({
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
createTC({
  name: 'User',
  fields: {
    id:'ID',
    username:'String',
    password:'String',
    roles:'[String]',
    profile:'UserProfile'
  }
})
console.log(getTC('User').getFields())
getTC('UserProfile').addFields({
  added:'String'
})
console.log(getTC('UserProfile').getFields())
createTC({
  name:'CurrentUser',
  fields:_.omit('id')(getTCFields('User'))
})
_.forEach(_.compose(createTC,configTC))([
  ['Users','[User]'],['CurrentUser'],['UserProfile']
])
_.forEach(createITC)([
  `type LoginInput {
    username: String
    password: String
  }`,

])
const crudResolver=(crudOp)=>(_,{input},{dataSources,userToken}) =>{
  dataSources.users(userToken).find(input)
}

Query.addFields({
  Users: {
    type: 'UsersOutput',
    args:{input:`IdsInput`},
    resolve: crudResolver('find'),
  },
  CurrentUser:{
    type:'CurrentUser',
    resolve:(_,__,{userToken:currentUser})=>currentUser,
  },
  UserProfile: {
    type: 'UserProfile',
    args:{input:`IdInput`},
    resolve: _.compose(_.pick('profile'),crudResolver('findOne')),
  },
})
InputTypeComposer
Mutation.addFields({
  login:{
    type:'[Error]',
    args
  }
})
console.log(schemaComposer.Query)
/*
const {printSchema,buildSchema,GraphQLObjectType,GraphQLString,GraphQLSchema}=graphql

const typeDefs=`
type UserProfile {
    name: String
    notes: String
}
type CurrentUser {
    roles:[String]
}
input Login {
    username: String
    password: String
}
type Mutation {
    login(username: String):String
}
`
const userProfile=new GraphQLObjectType({
    name:'UserProfile',
    fields:{
        name:{type:GraphQLString}
    }
})
const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
      currentUser: {
        type: userProfile,
      }
    },
    args: {
        id: { type: GraphQLString }
      },
  })


  var userType = new graphql.GraphQLObjectType({
    name: 'User',
    fields: {
      id: { type: graphql.GraphQLString },
      name: { type: graphql.GraphQLString },
    }
  });
  
  var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      currentUser: {
        type: userProfile
      }
    }
  });
  
  var schema = new graphql.GraphQLSchema({query: queryType});

console.log(printSchema(schema))
*/


