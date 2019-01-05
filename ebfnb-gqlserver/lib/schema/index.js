//import tasksSchema from './tasksSchema'
import gql from 'graphql-tag'
import mergeSchemaReducer from '../utils/mergeSchemaReducer'
import seedSchema from './seedSchema'
import userSchema from './userSchema'

const schema=[seedSchema,userSchema].reduce(mergeSchemaReducer,{
    resolvers:{
        Mutation:{},
        Query:{},
    },
    typeDefs:[]
})
export default schema