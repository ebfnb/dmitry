import typeDefs from './typeDefs'
import resolvers from './resolvers'
import express from 'express'
import usersModule from 'users'
import tasksModule from 'tasks'
import serverMiddleware from 'server-middleware'
const cors = require('cors')
import {m8compose} from 'tools'

const mockStore={
  users:[]
}
const app = express()
const m8composable=m8compose([userModule,taskModule,{typeDefs,resolvers}])
app.use(cors())
app.use('/graphql',serverMiddleware({mockStore,m8composable,
  graphiql: true,
  pretty:true
}))
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')