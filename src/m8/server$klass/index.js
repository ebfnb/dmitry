import constructor from './constructor'
import applyMiddleware from './applyMiddleware#method'
import ssr$getMiddleware from './ssr$getMiddleware#method'

const klass=class {
    constructor(...args){
        constructor(...args)
    }
}
Object.assign(klass.prototype,{
    ssr$getMiddleware,applyMiddleware
})
export default Klass
