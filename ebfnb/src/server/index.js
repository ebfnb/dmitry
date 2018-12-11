const { ApolloServer } = require('apollo-server-express')
import {reduce} from 'ramda'
import {toFunc} from 'm8-tools'
import schema from './sdlSchema'

new ApolloServer({...schema,
  graphiql: true,
  pretty:true,
}).listen(4000).then(url=>console.log(`Running a GraphQL API server at ${url}`))
