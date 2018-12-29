import React from 'react'
import {Form,Scope} from 'informed'
import {Control,Field,Button} from 'react-bulma-components/full'
import InputField from '../../Components/InputField'
import UserProfileFields from './UserProfileFields'

const UserProfile=()=>{return (
    <Scope scope='profile'>
        <UserProfileFields/>
    </Scope>
)}
const LoginRegisterForm=({isLogin,onSubmit})=>{return (
    <Form onSubmit={onSubmit}>
        {/* <InputField field='username' label='Username'/>
        <InputField field='password' label='Password'/> */}
        {/* {isLogin?(<UserProfile/>):null}
        <Field>
            <Control>
                <Button type="submit">{isLogin?'login':'register'}</Button>
            </Control>
        </Field> */}
    </Form>
)}
export default LoginRegisterForm