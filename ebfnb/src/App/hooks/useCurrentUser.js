import {useState, useEffect} from 'react'
import store from './config/store/store'
import apolloClient from './config/apolloClient'
import _ from 'ramda'

//initialize part of store state we own
!store.currentUser && (store.currentUser={})

//store and client will be exposed thru M8Provider by using useM8Context hook or/and M8Consumer component
const useCurrentUser=()=>{
    const [currentUser,setCurrentUserInState]=useState(
        store.getState().currentUser
    )
    useEffect(
        ()=>store.subscribe(
            (store)=>{
                !_.equals(store.currentUser,currentUser) && setCurrentUserInState(store.currentUser)
            }
        )
    )
    const setCurrentAction=(currentUser)=>{
        apolloClient.resetStore()
        store.setState(currentUser)
    }
    return [currentUser,setCurrentUserAction]
}
export default {useCurrentUser}
