
import {reduce,applyTo,curry,applySpec,pick,compose,prop,merge} from 'ramda'
import commonComposable from 'commons'
import toFunc from 'm8-tools/lib/toFunc'
import toArr from 'm8-tools/lib/toArr'
import toFunc from 'm8-tools/lib/toFunc'
import {makeExecutableSchema} from 'graphql-tools'

const toObjReducer=curry(
  (propName,accObj,curObj)=>({...accObj,...prop(propName,curObj)})
)
const toListReducer=curry(
  (propName,accList,curObj)=>([...accList,...toArr(prop(propName))])
)
const toFuncReducer=curry(
  (propName,accFunc,curFunc)=>(...args)=>merge(accFunc(args),toFunc(curFunc)(args))
)
const generate=curry(
  (generateWhat,moduleConfigs)=>{
    const generators={
      typeDefs:reduce(toListReducer('typeDefs'),[]),
      resolvers:reduce(toObjReducer('resolvers'),{}),
      schemaConfig:applySpec(pick(
        ['typeDefs','resolvers'],generators
      )),
      executableSchema:compose(makeExecutableSchema,generators.schemaConfig),
      context:reduce(
        toFuncReducer('context'),
        toFunc({
          dataSources:generators.dataSources(moduleConfigs)
        })
      )
    }
    return generators[generateWhat]
  }
)
