import React from 'react'
import R from 'react-dom/test-utils'
import {Form,Text,asField} from 'informed'
import {Field,Label,Control,Help} from 'react-bulma-components/full'
import classnames from 'classnames'

const RichField=asField(
    ({fieldState,label,size='small',color='primary',field,children,...props})=>{
        const error=fieldState.error
        const collorClass=`is-${collor}`
        const sizeClass=`is-${size}`
        const controlClass=classnames(sizeClass,{
            [collorClass]:!error,
            'is-danger':!!error
        })
        const child=React.Children.only(children)
        const controlElement=child(fieldState,field,controlClass,...props)
        return (
            <Field>
                {label?(<Label size={size} color={color}>Username</Label>):null}
                {controlElement}
                {error?(<Help collor='danger' size={size}>{error}</Help>):null}
            </Field>
        )
    }
)
