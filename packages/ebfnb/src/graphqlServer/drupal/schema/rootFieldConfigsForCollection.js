import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLID
} from 'graphql'
import {map,reduce,curry,compose} from 'ramda'
import collection from '../../../utils/collectionDataSource'
import {Errors,outputType,IdInputType,IdsInputType} from './commonTypes'

const rootTypeConfigsForCollection=({name,pluralName=name+'s',mockStore,recordType})=>{
    const collection=collection({mockStore,name,
        mockCollection:mockStore[pluralName]
    })
    const resolver=(name)=>(_,args,context)=>{
        const {userAuthToken}=context
        return collection(userAuthToken)[name](args)
    }
    const RecordsOutputType=outputType(`${pluralName}`,new GraphQLList(mutateRecordType))
    const RecordOutputType=outputType(`${name}`,mutateRecordType)
    return {
        queries:{
            [`FindOne${name}`]:{
                type:RecordOutputType,
                resolver:resolver('findOne'),
                args:{
                    input:{type:IdInputType}
                }
            },
            [`Find${pluralName}`]:{
                type:RecordsOutputType,
                resolver:resolver('find'),
                args:{
                    input:{type:IdsInputType}
                }
            },
            [`FindAll${pluralName}`]:{
                type:RecordsOutputType,
                resolver:resolver('findAll')
            }
        },
        mutations:{
            [`Add${name}`]:{
                type:Errors,
                resolver:resolver('add'),
                args:{
                    input:{type:mutateRecordType}
                }
            },
            [`Update${name}`]:{
                type:Errors,
                resolver:resolver('update'),
                args:{
                    input:{type:mutateRecordType}
                }
            },
            [`Remove${name}`]:{
                type:RecordOutputType,
                resolver:resolver('remove'),
                args:{
                    input:{type:IdInputType}
                }
            }
        }
    }
}
export default rootTypeConfigsForCollection