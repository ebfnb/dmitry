import React from 'react'
import {Form,Text} from 'informed'
import {Redirect} from 'react-router-dom'
import {useState} from 'react'

export default ({onLogin,errorMsg,loading,redirectOnCancel = "/"})=>{
    const [isCancelled,setCancelled]=useState(false)
    if (isCancelled) return (
        <Redirect to={redirectOnCancel} />
    )
    const onCancel=(evt)=>{
        evt.preventDefault()
        setCancelled(true)
    }
    const Msg=()=>{
        if(errorMsg)return (
            <p className='is-danger'>{errorMsg}</p>
        )
        if(loading)return (
            <p className='is-success'>Logging in. Please, wait ...</p>
        )
        return null
    }
    return (
        <Form onSubmit={onLogin}>
            <div className="field">
                <label className="label">Username</label>
                <div className="control has-icons-left has-icons-right">
                    <Text className="input is-success" field="username" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>
            </div>
            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <Text className="input is-success" field="password" />
                </div>
            </div>
            <div className="field is-grouped">
                <div className="control">
                    <button type="submit" className="button is-link">Submit</button>
                </div>
                <div className="control">
                    <button className="button is-text" onClick={onCancel}>Cancel</button>
                </div>
            </div>
            <Msg/>
        </Form>
    )
}