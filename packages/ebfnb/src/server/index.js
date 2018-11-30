const graphqlHTTP = require('express-graphql');
//const { buildSchema } = require('graphql');
const {  } = require('graphql')
import typeDefs from './typeDefs'
import resolvers from './resolvers'
//const { ApolloServer } = require('apollo-server-express')
import express from 'express'
const cors = require('cors')
import drupal from './drupal'

const schema=buildASTSchema(typeDefs)
const mockStore={
  users:[]
}
const app = express();
const graphqlHTTPmiddleware=graphqlHTTP({schema,
  rootValue:resolvers(store),
  graphiql: true,
  pretty:true
})
const drupalMiddleware=drupal({mockStore,
  userAuthToken:(req)=>req.authorization
})
app.use(cors())
app.use('/graphql',graphqlHTTPmiddleware,drupalMiddleware)
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')