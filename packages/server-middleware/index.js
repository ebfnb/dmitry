const graphqlHTTP = require('express-graphql');
import {reduce} from 'ramda'
import {toFunc} from 'tools'

const middleware=({mockStore,
  m8module:{typeDefs,resolvers,context},
  ...restProps
})=>{
  return graphqlHTTP({
    schema:{typeDefs,resolvers},
    context:(req)=>({mockStore,...toFunc(context)(req)}),
    ...restProps
  })
}
export default middleware


