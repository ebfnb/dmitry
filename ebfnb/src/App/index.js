import client from "./apolloClient";
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route} from "react-router-dom"
import Layout from './Layout'
import Home from './Home'
//import About from './About'
import LoginRegister from './LoginRegister'
//import Profile from './Profile'
//import Blog from './Blog'

export default ()=>(
    <ApolloProvider client={client}>
        <Router>
            <div>
                <Layout/>
                <Route exact path="/" component={Home} />
                <Route exact path="/login">
                    {()=>(<LoginRegister isLogin/>)}
                </Route>
                <Route exact path="/register">
                    {()=>(<LoginRegister/>)}
                </Route>
            </div>
        </Router>
    </ApolloProvider>
)