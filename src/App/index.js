import React from 'react'
import {Route, Link } from "react-router-dom"
import Home from './Home/index.js'
import About from './About'
import Layout from './Layout'
import Login from './Login'
import Profile from './Profile'

export default ()=>(
    <Layout>
        <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
        </div>
    </Layout>
)
