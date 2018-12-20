import gql from "graphql-tag";
import React from 'react'
import LoginRegisterForm from './LoginRegisterForm'
import {Redirect} from 'react-router-dom'
import {useCurrentUser,useMutation} from '../../hooks/useCurrentUser'

const login = gql`
  mutation login($input:LoginInput){
      login(input:$input){CurrentUser}
  }
`
const register = gql`
  mutation register($input:RegisterInput){
      register(input:$input){CurrentUser}
  }
`
const LoginRegister= ({isLogin}) => {
    const [currentUser,setCurrentUser]=useCurrentUser()
    const [mutation,{called,error,loading,data:currentUser}]=useMutation(
        isLogin?login:register
    )
    if(called && !error && !loading){
        setCurrentUser(currentUser)
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