import React from 'react'
import {Form,Text,Scope} from 'informed'
import {Control,Help,Field} from 'react-bulma-components/full'
import SimpleField from '../../Components/SimpleField'
import RichField from '../../Components/RichField'
import UserProfileFields from './UserProfileFields'

const UserProfile=()=>{(
    <Scope scope='profile'>
        <UserProfileFields/>
    </Scope>
)}
export default ({isLogin,onSubmit})=>{(
    <Form onSubmit={onSubmit}>
        <SimpleField renderAs='text' iconLeft='user' field='username' label='Username'/>
        <SimpleField renderAs='text' field='password' label='Password'/>
        {isLogin?(<UserProfile/>):null}
        <Field>
            <Control>
                <Button type="submit">{isLogin?'login':'register'}</Button>
            </Control>
        </Field>
    </Form>
)}