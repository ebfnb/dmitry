import {useState, useEffect} from 'react'
import client from './apolloClient'
import gql from 'graphql-tag'
import includesAll from '../utils/includesAll'
import toArr from '../utils/toArr'
import readQuery from '../utils/readQuery'
const R=require('ramda')

const CURRENT_USER=gql`
query{
   currentUser{
       name
       roles
   }
}
`
export const useCurrentUser=()=>{
    const [currentUser,setCurrentUser]=useState(
        readQuery({
            query:CURRENT_USER
        })
    )
    useEffect(
        ()=>{
            const observable=client.watchQuery({
                query:CURRENT_USER
            })
            observable.subscribe(
                ({data:{currentUser}})=>{
                    !!currentUser && setCurrentUser(currentUser)
                }
            )
            return observable.unsubscribe
        }
    )
    return {currentUser,
        forRole:(rolesToTest)=>(className)=>{
            const userRoles=currentUser
                ?R.concat(currentUser.roles || [],['unregistered'])
                :['unregistered']
            const isInvisible=!includesAll(
                toArr(rolesToTest),
                userRoles
            )
            return isInvisible?className+' is-invisible':className
        }
    }
}

