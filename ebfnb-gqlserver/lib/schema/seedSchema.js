import gql from 'graphql-tag'

const seedSchema={
    typeDefs:gql`
        type Void {
            void: Boolean
        }
        type Mutation {
            void:Void
        }
        type Query {
            void:Void
        }
        type Comment {
            uuid:ID
            comment:String
            byUser:User
            date:String
        }
    `,
    resolvers:{
        Mutation:{
            void:()=>true
        },
        Query:{
            void:()=>true
        },
        Void:()=>({void:false})
    }
}
export default seedSchema