import {useQuery} from 'react-apollo-hooks'
import gql from 'graphql-tag'
import React,{useState,useEffect} from 'react'

const currentUserProfileGql=gql`query {
    currentUserProfile {
        firstName
        lastName
    }
}`
const isRegisteredGql=gql`
    query {
        isRegistered
    }
`
const User=React.createContext()
export default User
const UserQuery=({setUserInfo})=>{
    const {data:{currentUserProfile = {}}}= useQuery(currentUserProfileGql)
    const {data:{isRegistered = false}}= useQuery(isRegisteredGql)
    useEffect(() => setUserInfo({isRegistered,currentUserProfile}), [isRegistered,currentUserProfile])
    return null
}
export const UserProvider=({children})=>{
    const [userInfo,setUserInfo]=useState({})
    return (
        <User.Provider value={userInfo}>
            <React.Suspense fallback={null}>
                <UserQuery setUserInfo={setUserInfo}/>
            </React.Suspense>
            {children}
        </User.Provider>
    )
}

