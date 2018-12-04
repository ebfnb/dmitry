
import {reduce,applyTo,curry,applySpec,pick,compose,prop,mergeAll} from 'ramda'
import toFunc from 'm8-tools/lib/toFunc'
import toArr from 'm8-tools/lib/toArr'
import toFunc from 'm8-tools/lib/toFunc'
import {makeExecutableSchema} from 'graphql-tools'
import gql from 'graphql-tag'

const toObjReducer=curry(
  (propName,accObj,curObj)=>({...accObj,...prop(propName,curObj)})
)
const toListReducer=curry(
  (propName,accList,curObj)=>([...accList,...toArr(prop(propName))])
)
const toFuncReducer=curry(
  (propName,accFunc,curFunc)=>(...args)=>merge(accFunc(args),toFunc(curFunc)(args))
)
const toGQL=(typeDefAsString)=>gql`${typeDefAsString}`
const contextReducer=({context:accContext},{dataSource:moduleDataSource,name:moduleName,context:moduleContext})=>{
  const newContext=(...args)=>{
    const accContextObj=accContext(args)
    const moduleContextObj=toFunc(context)(args)
    return mergeAll([
      accContextObj,
      toFunc(moduleContext)(args) || {},
      {
        dataSources:mergeAll([
          prop('dataSorces')(accContextObj),
          {[moduleName]:moduleDataSource}])
      }
    ])
  }
  return newContext
}
const serverConfigSpec={
  typeDefs:compose(
    map(toGQL),
    reduce(toListReducer('typeDefs'),[])
  ),
  resolvers:reduce(toObjReducer('resolvers'),{}),
  context:reduce(contextReducer,()=>({dataSources:{}})))
}
export default serverConfigSpec