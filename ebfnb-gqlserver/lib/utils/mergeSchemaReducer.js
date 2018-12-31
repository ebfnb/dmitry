const mergeSchemaReducer=(
    {typeDefs:accTypeDefs,resolvers:{Mutation:accMutation,Query:accQuery,...restAccResolvers}},
    {typeDefs,resolvers:{Mutation,Query,...restResolvers}}
)=>({
    typeDefs:[...accTypeDefs,...typeDefs],
    resolvers:{
        ...restAccResolvers,restResolvers,
        Mutation:{...accMutation,Mutation},
        Query:{...accQuery,Query}
    }
})
export default mergeSchemaReducer