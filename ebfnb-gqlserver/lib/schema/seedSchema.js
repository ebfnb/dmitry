import gql from 'graphql-tag'

const seedSchema={
    typeDefs:gql`
        type Void {
            void: Boolean
        }
        type Mutation {
            void:{void:Boolean}
        }
        type Query {
            void:{void:Boolean}
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