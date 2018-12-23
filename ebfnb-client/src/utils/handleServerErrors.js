import _ from 'ramda'
import toArr from './toArr'

//this hook needs to live outside App
import {useMessageList} from '../App/hooks/useMessageList'

class ServerError extends Error{
    constructor(graphqlError){
        super(...args)
        Object.assign(this,graphqlError)
    }
}
export default (errors)=>{
    const errorsList=toArr(errors)
    const {writeMessages}=useMessageList('errors','asWriter')
    _.map((graphqlError)=>{
        if(graphqlError.extentions.code==='INTERNAL_SERVER_ERROR')throw new ServerError(graphqlError)
        writeMessages(graphqlError.message)
    })(errorsList)
}