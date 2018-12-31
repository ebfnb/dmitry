import React from 'react'
import InputField from '../../Components/InputField'
import TextareaField from '../../Components/TextareaField'

const UserProfileFields=()=>{
    return (
        <React.Fragment>
            <InputField field='firstName' label='First name'/>
            <InputField field='lastName' label='Last name'/>
            <InputField type='email' field='email' label='Email address'/>
            <TextareaField field='notes' label='Tell us about self'/>
        </React.Fragment>
    )
}
export default UserProfileFields