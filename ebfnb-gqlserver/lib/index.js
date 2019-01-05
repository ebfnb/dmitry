const { ApolloServer } = require('apollo-server')
import {reduce} from 'ramda'
//import schema from './schema'
import mockStore from './mockStore'
import gql from 'graphql-tag'
import { TIMEOUT } from 'dns';

const typeDefs=gql`
    type UserProfile {
        fullName:String
        firstName:String
        lastName:String
        username:String
        email:String
    }
    type Query {
        currentUserProfile:UserProfile
        isRegistered:Boolean
    }
`
const resolvers={
    Query:{
        currentUserProfile:()=>{return {
            firstName:'Who',
            lastName:'youWho'
        }},
        isRegistered:()=>{
          return new Promise(
            (resolve,reject)=>setTimeout(
              ()=>resolve(true),2000
            )
          )
        }
    }
}
const server=new ApolloServer({typeDefs,resolvers,
  rootValue:mockStore,
  graphiql: true,
  pretty:true,
})
server.listen().then(({url})=>console.log(`Running a GraphQL API server at ${url}`))
