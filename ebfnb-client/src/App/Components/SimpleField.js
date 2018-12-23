import RichField from './RichField'
import React from 'react'
import {Text,TextArea} from 'informed'
import {Field,Label,Control,Help} from 'react-bulma-components/full'
import classnames from 'classnames'

const SimpleField=({iconLeft,iconRight,renderAs='input',...props})=>{
    const FieldElement=(renderAs==='input')
        ?Text
        :(renderAs==='textarea')
            ?TextArea
            :()=>null
    return (
        <RichField field='username' label='Username'>
            {(controlClass,...props)=>{
                return (
                    <Control iconLeft={!!iconLeft} iconRight={!!iconRight}>
                        <FieldElement {...props} className={controlClass+' '+renderAs}/>
                        {!!iconLeft?(<Icon className={controlClass} left name={iconLeft}/>):null}
                        {!!iconRight?(<Icon className={controlClass} right name={iconRight}/>):null}
                    </Control>
                )
            }}
        </RichField>
    )
}
export default SimpleField