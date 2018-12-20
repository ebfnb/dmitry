import gql from "graphql-tag";
import { Mutation } from "react-apollo"
import React from 'react'
import LoginRegisterForm from './LoginRegisterForm'
import {Redirect} from 'react-router-dom'
import _ from 'ramda'
import {throwServerErrors} from '../../utils'
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
    const login=useMutation(login)
    const register=useMutation(register)
    return (
        <Mutation 
            mutation={isLogin?login:register}
        >
            {(mutate,{loading,called,error,data:currentUser})=>{
                //this will throw ServerError and write other errors to errors message list to be displayed by global status bar
                handleServerErrors(error)
                if(called && !error && !loading){
                    setCurrentUser(currentUser)
                    return (<Redirect to='/'/>)
                }
                const onSubmit=(input)=> mutate({
                    variables:{input}
                })
                const graphqlFieldErrors=
                    !!error && error.extentions.exception.fieldErrors
                return (
                    <div>
                        <LoginRegisterForm isLogin={isLogin} onSubmit={onSubmit} graphqlFieldErrors={graphqlFieldErrors}/>
                        <p>{!!error && error.message}</p>
                    </div>
                )
            }}
        </Mutation>
    )
}
export default LoginRegister