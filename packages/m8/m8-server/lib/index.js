const { ApolloServer } = require('apollo-server-express')
import {reduce} from 'ramda'
import {toFunc} from 'm8-tools'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
import moduleConfigSpec from './moduleConfigSpec'
import {applySpec} from 'ramda'


const server=({moduleConfigs=[],appConfig={},
  ...restProps,
})=>{
  const listOfModuleConfigs=[...moduleConfigs,appConfig,{resolvers,typeDefs,
    context:(req)=>({req})
  }]
  const serverConfig=applySpec(moduleConfigSpec)(listOfModuleConfigs)
  const {applyMiddleware}=new ApolloServer(...restProps,...serverConfig)
  return {applyMiddleware}
}

export default server


