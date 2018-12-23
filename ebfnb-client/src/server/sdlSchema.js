import {gql} from 'apollo-server'


const typeDefs= gql`
enum Role {
    registered
    volunteer
    administrator
    task_creator
}
type UserProfile{
    name: String
    roles: [Role]
    skills: [String]
}
type User {
    id: ID
    username: String
    password:String
    userProfile:UserProfile
}
type Event {
    date: Int
    description: String
}

type Task {
    id: ID
    name: String
    description: String
    #List of subtasks
    creator:User
    history:[Event]
    requiredSkills: [String]
    assignedTo:[User]
    isCompleted: Boolean
    createdDate: Int
    completedDate: Int
}
type LoginPayload{
    errors:[String]
    currentUser:UserProfile
}
type ErrorsPayload {
    errors:[String]
}
type Mutation {
    #current user
    login(username:String,password:String): LoginPayload
    logout: ErrorsPayload
    updateCurrentUserProfile(updater:UserProfile):ErrorsPayload
    updateCurrentUserCredentials(username:String,password:String):ErrorsPayload
    registerUser(username:String,password:String):LoginPayload

    #tasks
    updateTask(id:ID,updater:): ErrorsPayload
}


type Query {
    findUser(id:ID):User
    currentUser:User
}

`

console.log(typeDefs)