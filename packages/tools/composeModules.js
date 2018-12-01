import {reduce,applyTo} from 'ramda'
import commonsModule from 'commons'
import toFunc from './toFunc'

export default reduce(
  (
    {
      accTypeDefs=[],
      accResolvers={},
      accContext=()=>({})  
    },
    {typeDefs,resolvers,context}
  )=>({
    typeDefs:[...accTypeDefs,...typeDefs],
    resolvers:{...accResolvers,...resolvers},
    context:(req)=>({...toFunc(accContext)(req),...toFunc(context)(req)})
  }),
  commonsModule
)