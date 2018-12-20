import store from '../store'
import _ from 'ramda'
import toArr from '../../utils/toArr'
import {useState,useEffect} from 'react'

//initialize part of store state we own
!store.getState().messageLists && (store.getState().messageLists={})

const useMessageList=(name,asWriterOrReader)=>{
    const getMessages=()=>store.getState().messageLists[name]
    const setMessagesInStore=(messages)=>store.setState({
        messageLists:_.assoc(store.getState().messageLists,{[name]:messages})
    })

    //init message list in store
    !getMessages() && (getMessages()[name]=[])
    if(asWriterOrReader==='asReader'){
        const [messagesInState,setMessagesInState]=useState(getMessages())
        useEffect(
            ()=>store.subscribe(
                ()=>(!_.equal(messagesInState,getMessages()) && setMessagesInState(getMessages()))
            )
        )
        return {
            messages:messagesInState
        }
    }
    if(asWriterOrReader==='asWriter'){
        const updateMessagesOnLength=(updatedMessages)=>{
            if(updatedMessages.length!=messagesInState.length) {
                setMessagesInStore(updatedMessages)
            }
        }
        const writeMessages=(messages)=>updateMessagesOnLength(
            _.dropRepeats([...messagesInState,...toArr(messages)])
        )
        const eraseMessage=(message)=>updateMessagesOnLength(
            _.reject(_.equals(message))(messagesInState)
        )
        return {writeMessages,eraseMessage}
    }
}