import typeDefs from './typeDefs'
import resolvers from './resolvers'
import express from 'express'
import usersModuleConfig from 'm8-users'
import tasksModuleConfig from 'm8-tasks'
import serverMiddleware from 'server-middleware'
const cors = require('cors')
import {mergeModuleConfigs} from 'tools'

const mockStore={
  users:[]
}
const app = express()
const localMo
const moduleConfig=mergeModuleConfigs([userModule,taskModule,{typeDefs,resolvers}])
app.use(cors())
app.use('/graphql',serverMiddleware({mockStore,
  moduleConfigs:[usersModuleConfig,tasksModuleConfig],
  graphiql: true,
  pretty:true
}))
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')