import {useCurrentUserProfile} from '../models/currentUser'
import React from 'react'
// import Suspense from './Suspense'

const Suspended=({children})=>{
    const {data:currentUser}=useCurrentUserProfile()
    return currentUser
        ?(<React.Fragment>{children}</React.Fragment>)
        :null
}
const ForRegisteredUser=({children})=>(
    <React.Suspense fallback={<div>...loading</div>}>
        <Suspended>{children}</Suspended>
    </React.Suspense>
)

export default ForRegisteredUser