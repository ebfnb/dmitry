import _ from 'ramda'
import toArr from '../../../packages/m8-tools/lib/toArr'
import {writeErrorMessages} from '../App/models/errorMessages'

class ServerError extends Error{
    constructor(graphqlError){
        super(...args)
        Object.assign(this,graphqlError)
    }
}
export default (errors)=>{
    const errorsList=toArr(errors)
    _.map((graphqlError)=>{
        if(graphqlError.extentions.code==='INTERNAL_SERVER_ERROR')throw new ServerError(graphqlError)
        writeErrorMessages(graphqlError.message)
    })(errorsList)
}