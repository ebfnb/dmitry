import {useState, useEffect} from 'react'
const _=require('ramda')
import config from './config'

const {store:{store}}=config
const useCurrentUser=()=>{
    useEffect(
        ()=>store.subscribe(
            (store)=>{
                _.equals(currentUser,store.currentUser) && setCurrentUser(store.currentUser)
            }
        )
    )
    const [currentUser,setCurrentUser]=useState(store.getState.currentUser)
    return currentUser
}
export default {useCurrentUser}
