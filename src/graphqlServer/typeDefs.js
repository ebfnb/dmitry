import {gql} from 'apollo-server'

export default gql`
type Error {
    message:String
}
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

type Mutation {}

input LoginInput{
    username:String
    password:String
}
type LoginPayload{
    errors:[errors]
    currentUser:UserProfile
}
extend type Mutation {
    login(LoginInput)): LoginPayload
}

type LogoutPayload {
    errors:[Errors]
}


type Query {
    user(id:ID):{errors}
    currentUser:User
}

type Mutation {
    ,
    logout: {errors:}
    createTask: Task
}

`

