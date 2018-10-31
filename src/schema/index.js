import typeDefs$gql from './typeDefs'
import rootTypeDefs$gql from './rootTypeDefs'
import resolvers from './resolvers'
import mockResolvers from './mockResolvers'
import {makeExecutableSchema,printSchema} from 'graphql-tools'
import clientSchema from './clientSchema'

const typeDefs=[typeDef$gql,rootTypeDefs$gql].map((gql)=>printSchema(gql))
export default makeExecutableSchema({resolvers,typeDefs})
export const mockSchema=makeExecutableSchema({typeDefs,mockResolvers})
export {clientSchema}