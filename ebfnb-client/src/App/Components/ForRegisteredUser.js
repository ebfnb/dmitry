import {useCurrentUser} from '../hooks/useCurrentUser'
import React from 'react'

const ForRegisteredUser=({children})=>{
    const currentUser=useCurrentUser()
    return currentUser
        ?(
            <React.Fragment>
                {children}
            </React.Fragment>
        )
        :null
}
export default ForRegisteredUser