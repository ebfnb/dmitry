const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools')
import {reduce,compose,prop} from 'ramda'

import commons from 'commons'

const middleware=({m8Modules})=>{
  const schemaConfig=reduce(
    compose
  )
  const schema=makeExecutableSchema({
    typeDefs:[...commonTypeDefs,typeDefs],
    resolvers:{...commonResolvers,resolvers}
  })
  return graphqlHTTPmiddleware=graphqlHTTP({schema,
    graphiql: true,
    pretty:true
  })
}
export default middleware


