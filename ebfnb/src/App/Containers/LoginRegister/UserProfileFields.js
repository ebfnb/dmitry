import React from 'react'
import {Form,Text,Scope} from 'informed'
import {Control,Help,Field} from 'react-bulma-components/full'
import SimpleField from '../../Components/SimpleField'

const UserProfileFields=()=>{
    return (
        <React.Fragment>
            <SimpleField renderAs='text' field='firstName' label='First name'/>
            <SimpleField renderAs='text' field='lastName' label='Last name'/>
            <SimpleField renderAs='textarea' field='notes' label='Tell us about self'/>
            <SimpleField renderAs='text' type='email' iconLeft='mail' field='email' label='Email address'/>
        </React.Fragment>
    )
}