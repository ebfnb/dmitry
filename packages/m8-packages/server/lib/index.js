const { ApolloServer } = require('apollo-server-express')
import {reduce} from 'ramda'
import {toFunc} from 'm8-tools'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
import schemaSpec from 'm8-tools/lib/schemaSpec'
import {applySpec,assoc,pick} from 'ramda'

const serverSpec=pick(['typeDefs','resolvers','context'])(schemaSpec)
const server=({schemas=[],appSchema={},
  ...restProps,
})=>{
  const listOfModuleSchemas=[
    ...schemas,
    assoc('name','app',appSchema),
    {resolvers,typeDefs,
      name:'server',
      context:(req)=>({req})
    }
  ]
  const serverConfig=applySpec(serverSpec)(listOfModuleSchemas)
  const {applyMiddleware}=new ApolloServer(...restProps,...serverConfig)
  return {applyMiddleware}
}

export default server


