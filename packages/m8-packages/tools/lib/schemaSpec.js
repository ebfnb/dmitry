/*
exports spec object (as in applySpec(spec)) to compose list of schema objects
pick props out of spec for specific use cases
*/

import {reduce,applyTo,curry,applySpec,pick,compose,prop,mergeAll} from 'ramda'
import toFunc from 'm8-tools/lib/toFunc'
import toArr from 'm8-tools/lib/toArr'
import toFunc from 'm8-tools/lib/toFunc'
import gql from 'graphql-tag'

const toObjReducer=curry(
  (propName,accObj,curObj)=>({...accObj,...prop(propName,curObj)})
)
const toListReducer=curry(
  (propName,accList,curObj)=>([...accList,...toArr(prop(propName))])
)
const toFuncReducer=curry(
  (propName,accFunc,curFunc)=>(...args)=>merge(accFunc(args),toFunc(curFunc)(...args))
)
const toGQL=(typeDefAsString)=>gql`${typeDefAsString}`
const contextReducer=({context:oldContext},moduleSchema)=>{
  const {
    name:moduleName,
    context:moduleContext,
  }=moduleSchema
  const newContext=(req)=>{
    const oldContextObj=oldContext(req)
    const toContextProp=curry(
      (contextObjPropName,schemaPropName)=>Object.assign(
        oldContextObj[contextObjPropName],
        moduleSchema[schemaPropName]
      )
    )
    return mergeAll([
      oldContextObj,
      toFunc(moduleContext)(req) || {},
      {
        dataSources:toContextProp('dataSources','dataSource'),
        events:toContextProp('events','events'),
        store:toContextProp('store','store')
      }
    ])
  }
  return newContext
}

const schemaSpec={
  typeDefs:compose(
    map(toGQL),
    reduce(toListReducer('typeDefs'),[])
  ),
  resolvers:reduce(toObjReducer('resolvers'),{}),
  context:reduce(contextReducer,()=>({
    dataSources:{},
    events:{},
    store:{}
  }))
}
export default schemaSpec