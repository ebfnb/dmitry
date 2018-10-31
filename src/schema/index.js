import typeDefs$gql from './typeDefs'
import resolvers from './resolvers'
import mockResolvers from './mockResolvers'
import {makeExecutableSchema,printSchema} from 'graphql-tools'

const typeDefs=[printSchema(typeDef$gql)]
export default makeExecutableSchema({resolvers,typeDefs})
export const mockSchema=makeExecutableSchema({typeDefs,mockResolvers})