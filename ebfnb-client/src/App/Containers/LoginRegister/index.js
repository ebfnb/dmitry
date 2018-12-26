import gql from "graphql-tag";
import React from 'react'
import LoginRegisterForm from './LoginRegisterForm'
import {Redirect} from 'react-router-dom'
import {useLogin,useRegister} from '../../models/errorMessages'

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
                onSubmit={(input)=> mutate({
                    variables:{input}
                })} 
            />
        )
}
export default LoginRegister