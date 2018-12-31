import gql from 'graphql-tag'

const typeDefs=gql`
    type KindOfTask {
        title:String
        uuid:ID!
    }   
`
const resolvers={
    UserDescriptor:relationshipResolver('users',({firstName,lastName})=>`${firstName} ${lastName}`)
}
export default {typeDefs,resolvers}