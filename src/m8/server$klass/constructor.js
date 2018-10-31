const { ApolloServer} = require('apollo-server-express')

export default ({typeDefs,resolvers})=>{
    Object.assign(this,{typeDefs,resolvers,
        apolloServer:new ApolloServer({typeDefs,resolvers})
    })
}