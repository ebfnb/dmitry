import store from './store'
import _ from 'ramda'
import toArr from '../../utils/toArr'
import {useState,useEffect} from 'react'

//initialize part of store state we own
!store.getState().messageLists && (store.getState().messageLists={})

const useMessageList=(name)=>{
    const getMessages=()=>store.getState().messageLists[name]
    const setMessagesInStore=(messages)=>store.setState({messageLists:{...getMessages(name),
        [name]:messages
    }})

    //init message list in store
    !getMessages() && (getMessages()[name]=[])
    const [messages,setMessagesInState]=useState(getMessages())
    useEffect(
        ()=>store.subscribe(
            ()=>(!_.equal(messages,getMessages()) && setMessagesInState(getMessages()))
        )
    )
    const writeMessages=(messages)=>{
        const messages=_.dropRepeats([...getMessages(),...toArr(message)])
        if(messages.length!=getMessages().length) {
            setMessagesInStore(messages)
        }
    }
    const eraseMessage=(message)=>{
       const updatedMessages=_.reject(_.equal)
    }
}