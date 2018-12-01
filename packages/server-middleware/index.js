const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools')
import {reduce} from 'ramda'
import commonsModule from 'commons'

const composeModules=reduce(
  ({accTypeDefs=[],accResolvers={},accDataSources={}},{typeDefs,resolvers,dataSources})=>({
    typeDefs:[...accTypeDefs,...typeDefs],
    resolvers:{...accResolvers,resolvers},
    accDataSources:{...accDataSources,...dataSources}
  }),
  commonsModule
)
const middleware=({m8Modules,mockStore})=>{
  const {typeDefs,resolvers,dataSources}=composeModules(m8Modules)
  return graphqlHTTP({
    schema:{typeDefs,resolvers},
    context:(req)=>({req,dataSources,mockStore}),
    graphiql: true,
    pretty:true
  })
}
export default middleware


