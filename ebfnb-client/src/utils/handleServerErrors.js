import * as _ from 'ramda'
import toArr from '../utils/toArr'
import {writeErrorMessages} from '../App/models/errorMessages'

class ServerError extends Error{
    constructor(graphqlError){
        super(graphqlError)
        Object.assign(this,graphqlError)
    }
}
export default (errors)=>{
    const errorsList=toArr(errors)
    _.forEach((graphqlError)=>{
        if(graphqlError.extentions.code==='INTERNAL_SERVER_ERROR')throw new ServerError(graphqlError)
        writeErrorMessages(graphqlError.message)
    })(errorsList)
}