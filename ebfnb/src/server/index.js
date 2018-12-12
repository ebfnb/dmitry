const { ApolloServer } = require('apollo-server')
import {reduce} from 'ramda'
import {toFunc} from '../utils'
import schema from './schema'

const mockStore={users:[]}
const server=new ApolloServer({schema,
  rootValue:mockStore,
  graphiql: true,
  pretty:true,
})
server.listen().then(({url})=>console.log(`Running a GraphQL API server at ${url}`))
