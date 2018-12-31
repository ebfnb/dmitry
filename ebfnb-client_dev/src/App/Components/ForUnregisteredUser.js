import {useCurrentUserProfile} from '../models/currentUser'
import React from 'react'
import Suspense from './Suspense'

const ForUnregisteredUser=({children})=>{
    const {data:currentUser}=useCurrentUserProfile()
    return (
        <Suspense>
            {!currentUser?(<React.Fragment>{children}</React.Fragment>):null}
        </Suspense>
    )
}
export default ForUnregisteredUser

