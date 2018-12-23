const { ApolloServer } = require('apollo-server')
import {reduce} from 'ramda'
import {toFunc} from '../utils'
import schema from './schema'
import {formatError} from 'apollo-errors'

const mockStore={users:[]}
const server=new ApolloServer({schema,formatError,
  rootValue:mockStore,
  graphiql: true,
  pretty:true,
})
server.listen().then(({url})=>console.log(`Running a GraphQL API server at ${url}`))
