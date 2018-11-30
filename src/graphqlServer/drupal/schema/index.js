import rootFieldConfigsForCollection from './rootFieldConfigsForCollection'
import {map,reduce,curry,compose,assoc} from 'ramda'
import {GraphQLSchema,GraphQLObjectType,GraphQLID,GraphQLInputObjectType,GraphQLString} from 'graphql'

const rootFieldConfigsReducer=({queries,mutations},collectionConfig)=>{
    const colRoots=rootFieldConfigsForCollection(collectionConfig)
    return {
        queries:{...queries,...colRoots.queries},
        mutations:{...mutations,...colcolRoots.mutations}
    }
}
const collectionConfigs=[
    {
        name:'user',
        recordTypes:()=>{
            const profileFields={}
            const mutateProfileType=new GraphQLObjectType({
                name:'UserProfile_in',
                fields:profileFields
            })
            const queryProfileType=new GraphQLInputObjectType({
                name:'UserProfile_out',
                fields:profileFields
            })
            return {
                query:new GraphQLObjectType({
                    name:'User_out',
                    fields:{
                        id:{type:GraphQLID},
                        profile:{type:queryProfileType}
                    }
                }),
                mutate:new GraphQLInputObjectType({mutateFields,
                    name:'User_in',
                    fields:{
                        id:{type:GraphQLID},
                        password:{type:GraphQLString},
                        profile:{type:mutateProfileType}
                    }
                })
            }
        }
    }
]
const schema=(mockStore)=>compose(
    (rootTypes)=>(new GraphQLSchema(rootTypes)),
    ({mutations,queries})=>({
        mutation:new GraphQLObjectType({
            name:'Mutation',
            fields:mutations
        }),
        query:new GraphQLObjectType({
            name:'Query',
            fields:queries
        })
    })
    reduce(rootFieldConfigsReducer),
    map(assoc('mockStore',mockStore))
)(collectionConfigs)
export default schema