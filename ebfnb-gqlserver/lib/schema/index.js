import tasksSchema from './tasksSchema'
import gql from 'graphql-tag'
import mergeSchemaReducer from '../utils/mergeSchemaReducer'
import seedSchema from './seedSchema'

const schema=[seedSchema,tasksSchema].reduce(mergeSchemaReducer)
export default schema