import {useState,useEffect} from 'react'
import store from '../store'
import * as _ from 'ramda'
import toArr from '../../utils/toArr'

store.setState({
    errorMessages:[]
})
const EXPIRATION_TIME=2000
export const useErrorMessages=()=>{
    useEffect(
        ()=>store.subscribe(
            ({messages})=>{
                !(messages===messagesInState) && setMessagesInState(messages)
            }
        )
    )
    const [messagesInState,setMessagesInState]=useState(store.getState().errorMessages)
    return messagesInState        
}
const getErrorMessages=()=>store.getState().errorMessages
const setErrorMessages=(messages)=>{
    !_.equals(getErrorMessages().length,messages.length) && store.setState({
        errorMessages:messages
    })
}
export const eraseErrorMessage=(messageToErase)=>setErrorMessages(
    getErrorMessages().filter((message)=>(!_.equals(message,messageToErase)))
)
export const writeErrorMessages=(messages)=>setErrorMessages(
    toArr(messages).reduce((messages,message)=>{
        if(!messages.includes(message)){
            messages.push(message)
            setTimeout(()=>eraseErrorMessage(message),EXPIRATION_TIME)
        }
        return messages
    },[...getErrorMessages()])
)
