import React from 'react'
import {Form,Text,Scope} from 'informed'
import {Control,Help,Field} from 'react-bulma-components/full'
import classnames from 'classnames'
import RichField from '../../Components/RichField'
import UserProfileFields from './UserProfileFields'

export default ({isLogin,onSubmit})=>{
    const UserProfile=()=>{
        const UserProfile=()=>{(
            <Scope na
        )}
    }
    return (
        <Form onSubmit={onSubmit}>
            <RichField field='username' label='Username'>
                {(controlClass,...props)=>{(
                    <Control iconLeft>
                        <Text {...props} className={controlClass}/>
                        <Icon className={controlClass} left name='user'/>
                    </Control>
                )}}
            </RichField>
            <RichField field='password' label='Password'>
                {(controlClass,...props)=>{(
                    <Control>
                        <Text {...props} type='password' className={controlClass}/>
                    </Control>
                )}}
            </RichField>
            {!isLogin?(<UserProfileScope)}
            <Field>
                <Control>
                    <Button type="submit">{isLogin?'login':'register'}</Button>
                </Control>
            </Field>
        </Form>
    )
}