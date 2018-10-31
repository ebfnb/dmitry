import defaults from './defaults'
import resolvers from './resolvers'
import clientTypeDefs$gql from './typeDefs.gql'
import serverTypeDefs$gql from '../typeDefs.gql'

export default {defaults,resolvers,
    typeDefs:[clientTypeDefs$gql,serverTypeDefs$gql].map((gql)=>printSchema(gql))
}