// ts-check
import {schemaComposer,TypeComposer,InputTypeComposer,Query,Mutation} from 'graphql-compose'
import {getOrCreateTC,getOrCreateITC} from 'm8-tools/graphqlComposer'
import _ from 'ramda'

const mockStore={
    User:[],
    Task:[]
}
const createTC=(type)=>TypeComposer.create(type)
createTC({
    name: 'UserProfile',
    fields: {
        firstName: 'String',
        lastName: 'String',
        notes:'String',
        name:{
            type:'String',
            description:'full name',
            resolver:user=>`${user.firstName} ${user.lastName}`
        }
    }
})
const userTC=TypeComposer.create({
    name: 'User',
    fields: {
      id:'ID',
      username:'String',
      password:'String',
      roles:'[String]',
      profile:'UserProfile'
    }
})
const errorsTC=schemaComposer.getTC('Errors')
const createCrudResolvers=(recordTC)=>{
    const name=recordTC.getTypeName()
    const mockCollection=mockStore[name]
    const outputTypeAsSDL=(opName,data)=>`
        type ${name}_${opName}_out {
            errors:[String]
            data:${data}
        }
    `
    _.map(schemaComposer.Query.addResolver)([
        {
            name:`${name}_findOne`,
            type:outputTypeAsSDL('findOne',name),
            args:{id:'ID'},
            resolver:(_,{id})=>{
                const data=_.find(propEq('id',id))(mockCollection)
                return {data,
                    errors:record?[]:'not found',
                }
            }
        },
        {
            name:`${name}_find`,
            type:outputTypeAsSDL('find',`[${name}]`),
            args:{ids:'[ID]'},
            resolver:(_,{ids})=>{
                const data=_.filter(({id})=>ids.includes(id))(mockCollection)
                return {data,
                    errors:records.length===ids.length?[]:['can not find some records']
                }
            }
        },
        {
            name:`${name}_findAll`,
            type:outputTypeAsSDL('findAll',`[${name}]`),
            resolver:()=>{
                return {
                    errors:[],
                    data:mockCollection
                }
            }
        },
    ])
    _.map(schemaComposer.Mutation.addResolver)([
        {
            name:`${name}_add`,
            type:errorsTC,
            resolver:(record)=>{
                const clonedRecord=assoc('id',uuidv1())
                mockCollection.push(clonedRecord)
                return {
                    errors:[],
                    data:clonedRecord
                }
            }
        },
    ])
    
}
_.map(createCrudResolvers)([userTC,taskTC])


async function findOne({id}){
    const data=find(propEq('id',id))(mockCollection)
    return {data,
        errors:record?[]:'not found',
    }
}
async function find({ids}){
    const data=filter(({id})=>ids.includes(id))(mockCollection)
    return {data,
        errors:records.length===ids.length?[]:['can not find some records']
    }
}
async function findAll(){
    return {
        errors:[],
        data:mockCollection
    }
}
async function add(record){
    const clonedRecord=assoc('id',uuidv1())
    mockCollection.push(clonedRecord)
    return {
        errors:[],
        data:clonedRecord
    }
}
async function update(record){
    const {id,...updater}=record
    const errors=[]
    !id && errors.push('missing id')
    const {
        errors:prevErrors,
        data={}
    }=await findOne(id)
    errors.concat(prevErrors)
    Object.assign(data,updater)
    return {errors,data}
}
async function remove(idToRemove){
    const errors=[]
    const index=mockCollection.findIndex(({id})=>(id===idToRemove))
    if(index===-1) errors.push(`record ${idToRemove} does not exist`)
    mockCollection.splice(index,1)
    return {errors}
}