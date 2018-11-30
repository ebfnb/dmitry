const addErrors=(data)=>`{
    errors:[String]
    data:{${data}}
}`
const namespace=(n)
const typeDefs=`
input Id_in {
    id: String
}
input Ids_in {
    ids: [String]
}
`