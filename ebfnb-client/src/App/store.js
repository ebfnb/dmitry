import createStore from 'unistore'
import _ from 'ramda'

const store=createStore({
    errorMessages:[]
})
export default store
export const actions={
    errorMessages:{
        write:({errorMessages},message)=>{
            const dedupedMessages
        }
    }
}