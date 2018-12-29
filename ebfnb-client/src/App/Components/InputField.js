import React from 'react'
import {asField,Text,Textarea} from 'informed'
import {Field,Label,Help,Control} from 'react-bulma-components/full'
import classnames from 'classnames'

const InputField=asField(
    ({fieldState,type='text',label,size='small',color='primary',children,...props})=>{
        const labelStyle={
            invisible:!!label?'visible':'hidden'
        }        
        const error=fieldState.error
        const errorStyle={
            invisible:!!error?'visible':'hidden'
        }
        const Component=(type==='mutiline')?Textarea:Text
        const componentProps=(type==='mutiline')
            ?props
            :{...props,type}
        const colorClass=`is-${color}`
        const sizeClass=`is-${size}`
        const componentClass=classnames(sizeClass,{
            [colorClass]:!error,
            'is-danger':!!error
        })
        return (
            <Field>
                {/* <Label style={labelStyle} size={size} color={color}>{label}</Label> */}
                {/* <Control>
                    <Component className={componentClass} fieldState={fieldState} {...componentProps}/>
                </Control>
                <Help style={errorStyle} color='danger' size={size}>{error}</Help> */}
            </Field>
        )
    }
)
export default InputField
