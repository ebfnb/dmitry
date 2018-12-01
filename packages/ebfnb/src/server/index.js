import typeDefs from './typeDefs'
import resolvers from './resolvers'
import express from 'express'
import usersModule from 'users'
import tasksModule from 'tasks'
import serverMiddleware from 'server-middleware'
const cors = require('cors')


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