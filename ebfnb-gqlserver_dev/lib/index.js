const { ApolloServer } = require('apollo-server')
import {reduce} from 'ramda'
import toFunc from 'm8-tools/lib/toFunc'
import schema from './schema'

const mockStore={users:[]}
const server=new ApolloServer({...schema,
  rootValue:mockStore,
  graphiql: true,
  pretty:true,
})
server.listen().then(({url})=>console.log(`Running a GraphQL API server at ${url}`))
