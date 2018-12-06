const {compose,find,filter,propEq,map,assoc,reject,equals,curry}=require('ramda')
import toArr from './toArr'
const uuidv1 = require('uuid/v1')
import mockStore from '../m8Packages/tools/mockStore'

const collectionDataSource = (options,authToken) => {
        const {
            mockCollection,
            name
        }=options
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
        return Object.freeze({find,findOne,findAll,add,update,remove})
    }

export default curry(collectionDataSource)