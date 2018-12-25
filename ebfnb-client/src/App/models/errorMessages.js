import {useState,useEffect} from 'react'
import store from '../store'
import _ from 'ramda'
import toArr from 'm8-tools/lib/toArr'

store.setState({
    errorMessages:[]
})
const EXPIRATION_TIME=2000
const useErrorMessages=()=>{
    useEffect(
        ()=>store.subscribe(
            ({messages})=>{
                !(messages===messagesInState) && setMessagesInState(messages)
            }
        )
    )
    const [messagesInState,setMessagesInState]=useState(messages)
    return messagesInState        
}
const eraseMessage=(messageToErase)=>{
    const index=_.index
    store.setState({
        errorMessages:store.getState().errorMessages.filter((message)=>(message===messageToErase))
    })
}
const writeErrorMessages=(messages)=>{
    const updatedErrorMessages=toArr(messages).reduce((messages,message)=>{
        if(!messages.includes(message)){
            messages.push(message)
            setTimeout(()=>store.setState({

            }))
        }
    },[...store.getState().errorMessages])
    const errorMessages=_.compose(
        _.map((message)=>{

        }),
        _.dropRepeats
    )(toArr(messages))
    messagesToWrite.length && store.setState({
        errorMessages:[...store.getState]
    })
}