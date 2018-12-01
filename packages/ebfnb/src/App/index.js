import client from "./apolloClient";
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route} from "react-router-dom"
import Layout from './Layout'
import Home from './Home'
//import About from './About'
import Login from './Login'
//import Register from './Register'
//import Profile from './Profile'
//import Blog from './Blog'

export default ()=>(
    <ApolloProvider client={client}>
        <Router>
            <div>
                <Layout/>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
            </div>
        </Router>
    </ApolloProvider>
)