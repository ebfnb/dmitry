import createStore from 'unistore'
export {default as actions} from './actions'
import initState from './initState'

const store=createStore(initState)
export default store