import React from 'react'
import LoginRegisterForm from './LoginRegisterForm'
import {Redirect} from 'react-router-dom'
import {useLogin,useRegister} from '../../models/currentUser'

const LoginRegister= ({isLogin}) => {
    const [login,loginState]=useLogin()
    const [register,registerState]=useRegister()
    const mutation=isLogin?login:register
    const {called,error,loading}=isLogin?loginState:registerState
    return (called && !error && !loading)
        ?(<Redirect to='/'/>)
        :(
            <LoginRegisterForm 
                isLogin={isLogin} 
                onSubmit={(input)=> mutation({
                    variables:{input}
                })} 
            />
        )
}
export default LoginRegister