const { ApolloServer } = require("apollo-server")
import { reduce } from "ramda"
//import schema from './schema'
import mockStore from "./mockStore"
import gql from "graphql-tag"
import { TIMEOUT } from "dns"

const typeDefs = gql`
  type UserProfile {
    fullName: String
    firstName: String
    lastName: String
    username: String
    email: String
  }
  type Task {
    id: String
    summary: String
    status: TaskStatus
  }
  type TaskStatus {
    label: String
    reason: String
  }
  type TaskId {
    id: String
  }
  type Query {
    currentUserProfile: UserProfile
    isRegistered: Boolean
    tasks: [Task]
    TaskStatus(id: String): TaskStatus
    TaskIds: [TaskId]
    Task(id: String): Task
  }
`
const resolvers = {
  Query: {
    currentUserProfile: () => {
      return {
        firstName: "Who",
        lastName: "youWho"
      }
    },
    isRegistered: () => {
      return new Promise((resolve, reject) =>
        setTimeout(() => resolve(true), 2000)
      )
    },
    tasks: () => {
      return [
        {
          id: "1",
          summary: "erf",
          status: 1
        }
      ]
    },
    TaskIds: () => {
      const ids = [{ id: "1" }, { id: "2" }, { id: "3" }]
      return new Promise(resolve => setTimeout(() => resolve(ids), 2000))
    },
    Task: (_, vars) => {
      const task = {
        id: vars.id,
        status: {
          label: "onHold",
          reason: "waiting for email"
        },
        summary: "its all about money"
      }
      console.log(task)
      return new Promise(resolve => setTimeout(() => resolve(task), 1000))
    }
  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  rootValue: mockStore,
  graphiql: true,
  pretty: true
})
server
  .listen()
  .then(({ url }) => console.log(`Running a GraphQL API server at ${url}`))
