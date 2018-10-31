import React from 'react'
import {Route, Link } from "react-router-dom"
import Home from './Home$route/index.js'
import About from './About$route'
//import './local.scss'

export default ()=>(
    <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
    </div>
)
