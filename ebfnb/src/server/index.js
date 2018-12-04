import typeDefs from './typeDefs'
import resolvers from './mockResolvers'
import express from 'express'
import users from 'm8-users-module/server'
import tasks from 'm8-tasks-module/server'
import volunteerTasks from 'm8-volunteer-tasks-module/server'
import m8server from 'm8-server'

const mockStore={
  users:[]
}
const app = express()
app.use('/graphql',serverMiddleware({mockStore,typeDefs,resolvers,
  moduleConfigs:[users,tasks,volunteerTasks,],
  graphiql: true,
  pretty:true,
}))
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')