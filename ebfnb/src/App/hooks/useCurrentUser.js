import {useState, useEffect} from 'react'
import store from './config/store/store'

const useCurrentUser=()=>{
    const [currentUser,setCurrentUserInState]=useState(
        store.getState().currentUser
    )
    useEffect(
        ()=>store.subscribe(
            (store)=>setCurrentUserInState(store.currentUser)
        )
    )
    const setCurrentUserInStore=(currentUser)=>store.setState(currentUser)
    return [currentUser,setCurrentUserInStore]
}
export default {useCurrentUser}
