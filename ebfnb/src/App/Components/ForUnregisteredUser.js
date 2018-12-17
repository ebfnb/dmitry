import {useCurrentUser} from '../hooks'
import React from 'react'

const ForUnregisteredUser=({children})=>{
    const currentUser=useCurrentUser()
    return !currentUser
        ?(
            <React.Fragment>
                {children}
            </React.Fragment>
        )
        :null
}
export default ForUnregisteredUser