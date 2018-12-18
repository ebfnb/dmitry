import createStore from 'unistore'
import actions from './actions'
import initState from './initState'

const store=createStore(initState)
export default {store,actions}