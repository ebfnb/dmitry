import gql from "graphql-tag";
import { Mutation } from "react-apollo"
import React from 'react'
import LoginRegisterForm from './LoginRegisterForm'
import {Redirect} from 'react-router-dom'
import _ from 'ramda'
import ApolloConsumer from 'react-apollo'

const login = gql`
  mutation login($input:LoginInput){
      login(input:$input){
          errors 
      }
  }
`
const register = gql`
  mutation register($input:RegisterInput){
      register(input:$input){
          errors 
      }
  }
`
const LoginRegister= ({client,isLogin}) => {
    return (
        <Mutation mutation={isLogin?login:register}>
            {(mutate,{loading,called})=>{
                const {
                    errors:graphqlErrors,
                    data:{
                        errors:loginRegisterErrors,
                    }
                }=data
                const errors=[...graphqlErrors,...loginRegisterErrors]
                if(called && !errors.length && !loading){
                    client.resetStore()
                    return (<Redirect to='/'/>)
                }
                const onSubmit=(input)=> mutate({
                    variables:{input}
                })
                const Msg=()=>(
                    <div>
                        {_.map((error)=>(
                            <p>{error}</p>
                        ))(errors)}
                    </div>
                )
                return (
                    <div>
                        <LoginForm onSubmit={onSubmit}/>
                        <Msg/>
                    </div>
                )
            }}
        </Mutation>
    )
}
export default (
    <ApolloConsumer>
        <LoginRegister/>
    </ApolloConsumer>
)