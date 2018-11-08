import React from 'react'
import {withContext,compose,getContext} from 'recompose'
import CURRENT_USER_QUERY from './CURRENT_USER_QUERY.gql'
import { graphql } from 'react-apollo'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const contextPropTypes={
    currentUser:PropTypes.object,
    forRole:PropTypes.func
}
export const contextProvider=compose(
    withContext(contextPropTypes,
        ({currentUser,forRole})=>({currentUser,forRole})
    ),
    graphql(CURRENT_USER_QUERY,{
        props:({data:{currentUser}})=>{
            return {currentUser,
                forRole:(role)=>(className)=>{
                    const roles=currentUser?currentUser.roles.push('unregistered'):['unregistered']
                    return classNames(className,{'is-invisible':!roles.includes(role)})
                }
            }
        }
    })
)
export const withCurrentUser=getContext(contextPropTypes)