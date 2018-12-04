
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
const contextReducer=({context:accContext},moduleConfig)=>{
  const {
    name:moduleName,
    context:moduleContext,
  }=moduleConfig
  const newContext=(req)=>{
    const accContextObj=accContext(req)
    const toContextProp=curry(
      (propName,moduleConfigPropName)=>mergeAll([
        accContextObj[accContextObj],
        {[moduleName]:moduleConfig[moduleConfigPropName]}
      ])
    )
    return mergeAll([
      accContextObj,
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

const serverConfigSpec={
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
export default serverConfigSpec