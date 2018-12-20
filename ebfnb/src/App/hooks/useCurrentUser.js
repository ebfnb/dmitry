import {useState, useEffect} from 'react'
import store from './store'
import apolloClient from './config/apolloClient'
import {useClient} from 'react-apollo-hooks'
import _ from 'ramda'

//initialize part of store state we own
!store.currentUser && (store.currentUser={})

//store and client will be exposed thru M8Provider by using useM8Context hook or/and M8Consumer component
const useCurrentUser=()=>{
    const [currentUser,setCurrentUserInState]=useState(
        store.getState().currentUser
    )
    const client=useClient()
    useEffect(
        ()=>store.subscribe(
            (store)=>{
                !_.equals(store.currentUser,currentUser) && setCurrentUserInState(store.currentUser)
            }
        )
    )
    const setCurrentAction=(currentUser)=>{
        client.resetStore()
        store.setState(currentUser)
    }
    return [currentUser,setCurrentUserAction]
}
export default {useCurrentUser}
