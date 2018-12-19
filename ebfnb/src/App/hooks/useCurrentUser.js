import {useState, useEffect} from 'react'
import store from './config/store/store'
import apolloClient from './config/apolloClient'

const useCurrentUser=()=>{
    const [currentUser,setCurrentUserInState]=useState(
        store.getState().currentUser
    )
    useEffect(
        ()=>store.subscribe(
            (store)=>setCurrentUserInState(store.currentUser)
        )
    )
    const setCurrentAction=(currentUser)=>{
        apolloClient.resetStore()
        store.setState(currentUser)
    }
    return [currentUser,setCurrentUserAction]
}
export default {useCurrentUser}
