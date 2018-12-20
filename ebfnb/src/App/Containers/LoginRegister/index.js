import gql from "graphql-tag";
import React from 'react'
import LoginRegisterForm from './LoginRegisterForm'
import {Redirect} from 'react-router-dom'
import {useMutation} from '../../hooks'
import {useClient} from 'react-apollo-hooks'
import currentUserSchema from '../../schema/currentUser'

const {
    mutations:{login,register}
}=currentUserSchema
const LoginRegister= ({isLogin}) => {
    const [mutation,{called,error,loading}]=useMutation(
        isLogin?login:register
    )
    const client=useClient()
    if(called && !error && !loading){
        client.resetStore()
        return (<Redirect to='/'/>)
    }
    return (
        <LoginRegisterForm 
            isLogin={isLogin} 
            onSubmit={(input)=> mutate({
                variables:{input}
            })} 
            graphqlFieldErrors={!!error && error.extentions.exception.fieldErrors}
        />
    )
}
export default LoginRegister