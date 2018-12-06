import {
    GraphQLList,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLID
} from 'graphql'

const Errors = new GraphQLList(GraphQLString)
const outputType=curry(
    (name,dataType)=>{
        const errors={type:Errors}
        return new GraphQLObjectType({
            name:name+'_out',
            fields: !!dataType
                ?{errors, data:{type:dataType}}
                :{errors}
        })
    }
)
const IdsInputType=new GraphQLInputObjectType({
    name:'Ids_in',
    fields:{
        ids:{type:new GraphQLList(GraphQLID)}
    }
})
const IdInputType=new GraphQLInputObjectType({
    name:'Id_in',
    fields:{
        ids:{type:GraphQLID}
    }
})
export {Errors,outputType,IdsInputType,IdInputType}