const graphqlHTTP = require('express-graphql');
import {reduce} from 'ramda'
import {toFunc,mergeModuleConfigs} from 'tools'

const middleware=({mockStore,typeDefs,resolvers,moduleConfigs,
  context=()=>({}),
  ...restProps,
})=>{
  return graphqlHTTP({
    schema:{typeDefs,resolvers},
    context:(req)=>({mockStore,...toFunc(context)(req)}),
    ...restProps
  })
}
export default middleware


