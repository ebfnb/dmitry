import gql from 'graphql-tag'
import resolveByUuid from '../utils/resolveByUuid'
import resolveByFilter from '../utils/resolveByFilter'

const typeDefs=gql`
    #Description of task kind
    type KindOfTask {
        uuid:ID!
        #same name as collection name in store
        kind:String!
        #to be displayed as label
        title:String!
        description:String
    }
    type RelatedUser {
        user:User
        #e.g. parent,child,owner,assignedTo
        relatedAs:[String]
    }
    type RelatedOrganization {
        organization:Organization
        #e.g. parent,child,owner,assignedTo
        relatedAs:[String]
    }
    interface Task {
        uuid:ID!
        kindOfTask:KindOfTask!
        dateCreated:String!
        #All tasks have expiration date. It might or might not be the same as dateCompleted
        #Expired tasks dont generate notifications.
        dateToExpire:String
        #Task can be completed before expiration
        dateCompleted:String
        #Value of state is type-of-task dependant
        status:String
        #users associated with task. Creator, owner might or might not be in array of refs
        relatedUsers:[RelatedUser]
        relatedOrganizations:[Organization]
        comments:[Comment]
    } 
    extend type Query {
        kindOfTask(uuid):
        Task
    }
`
const resolvers={
    task:rootQueryFieldResolver('tasks')
}
export default {typeDefs,resolvers}