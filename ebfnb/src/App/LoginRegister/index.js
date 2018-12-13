import gql from "graphql-tag";
import { Mutation } from "react-apollo"
import React from 'react'
import LoginForm from './LoginForm'
import {Redirect} from 'react-router-dom'

const login = gql`
  mutation login($username:String,$password:String){
      login(username:$username,password:$password){name}
  }
`
const register = gql`
  mutation login($username:String,$password:String){
      login(username:$username,password:$password){name}
  }
`
export default ({loginRegister}) => {
    const mutation=(loginRegister==='login')?login:register
    return (
        <Mutation mutation={login}>
            {(login,{error,loading,called})=>{
                if(called && !error && !loading)return (
                    <Redirect to='/'/>
                )
                const onLogin=({username,password})=>login({
                    variables:{username,password}}
                )
                return (
                    <LoginForm 
                        onLogin={onLogin} 
                        errorMsg={error && "Invalid credentials"}
                        loading={loading}
                    />
                )
            }}
        </Mutation>
    )
};