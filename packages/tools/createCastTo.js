import {curry,compose,find,ifElse,identity,is,prop,isEmpty,toPairs,findIndex,equals,gte,clone} from 'ramda'
import types from './types'
import t from 'tcomb-validation'
import isFalsy from './isFalsy'

export default curry(
    function createCastTo(extraTypes$obj,toType$str,casts,value){
        const types$obj=Object.assign({},types,extraTypes$obj)
        function err(msg){throw new Error(msg)}
        function findType(type$str){return
            compose(
                ifElse(isFalsy,
                    ()=>typeNotFoundErr(fromType$str),identity
                ),
                prop(fromType$str,types$obj)
            )
        }
        function typeNotFoundErr(type$str){return err(`type ${fromType$str} not recognized`)}
        const validate=curry(function validate(value,type){return t.validate(value,type).isValid()})
        function handleDefaultCase(casts$list){
            const defaultCaseIndex=findIndex(
                ([fromType$str])=>(fromType$str==='other')
            )(casts$list)
            if(defaultCaseIndex<0)return casts$list
            const [_,defaultCast$func]=casts$list.splice(defaultCaseIndex,defaultCaseIndex+1)
            return casts$list.concat(['any',defaultCast$func])
        }
        function handleImpliedCase(casts$list){
            return casts$list.push([toType$str,(value)=>value])
        }
        return compose(
            ifElse(isEmpty,
                ()=>err(`bad value ${value} supplied to cast func`),
                compose(
                    ifElse(validate(findType(toType$str)),
                        identity,
                        (castedValue)=>err(`casted value ${castedValue} is not type ${toType$str}`)
                    ),
                    (cast$func)=>cast$func(value),
                    findIndex(1),head
                )
            ),
            filter(compose(
                validate(value),findType,findIndex(0)
            )),
            handleDefaultCase,
            handleImpliedCase,
            ifElse(is(Object),toPairs,clone)
        )(casts)
    }
)
const human=castTo('function')({
    niceHuman:
    object:()=>{}
})(wierdHuman)