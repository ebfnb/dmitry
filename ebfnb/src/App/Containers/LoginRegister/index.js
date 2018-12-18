import gql from "graphql-tag";
import { Mutation } from "react-apollo"
import React from 'react'
import LoginRegisterForm from './LoginRegisterForm'
import {Redirect} from 'react-router-dom'
import _ from 'ramda'
import ApolloConsumer from 'react-apollo'
import {throwServerErrors} from '../../utils'
import {connect} from 'unistore'
import {actions} from '../../config/store/actions'

const login = gql`
  mutation login($input:LoginInput){
      login(input:$input){void}
  }
`
const register = gql`
  mutation register($input:RegisterInput){
      register(input:$input){void}
  }
`
const Component= ({setCurrentUser,client,isLogin}) => {
    return (
        <Mutation 
            mutation={isLogin?login:register}
        >
            {(mutate,{loading,called,error,data:currentUser})=>{
                throwServerErrors(error)
                if(called && !error && !loading){
                    setCurrentUser(currentUser)
                    return (<Redirect to='/'/>)
                }
                const onSubmit=(input)=> mutate({
                    variables:{input}
                })
                const graphqlFieldErrors=
                    !!error && error.extentions.code==='BAD_USER_INPUT' && error.extentions.exception.fieldErrors
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
const LoginRegister=connect([],_.pick('setCurrentUser',actions))(Component)
export default (
    <ApolloConsumer>
        <LoginRegister/>
    </ApolloConsumer>
)