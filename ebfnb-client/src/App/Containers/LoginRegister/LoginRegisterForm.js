import React from 'react'
import {Form,Text,Scope} from 'informed'
import {Control,Help,Field} from 'react-bulma-components/full'
import SimpleField from '../../Components/SimpleField'
import RichField from '../../Components/RichField'
import UserProfileFields from './UserProfileFields'

export default ({isLogin,onSubmit})=>{
    const UserProfile=()=>{
        return !isLogin
            ?(
                <Scope scope='profile'>
                    <UserProfileFields/>
                </Scope>
            )
            :null
    }
    return (
        <Form onSubmit={onSubmit}>
            <SimpleField renderAs='text' iconLeft='user' field='username' label='Username'/>
            <SimpleField renderAs='text' field='password' label='Password'/>
            <UserProfile/>

            <RichField field='needsVolunteeringHelp'>
                {(controlClass,...props)=>{(
                    <Control>
                       
                    </Control>
                )}}
            </RichField>

            <Field>
                <Control>
                    <Button type="submit">{isLogin?'login':'register'}</Button>
                </Control>
            </Field>
        </Form>
    )
}