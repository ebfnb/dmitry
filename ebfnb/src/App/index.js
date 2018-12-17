import client from "./apolloClient";
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route} from "react-router-dom"
import {Layout,ErrorHandler} from './Components'
import {LoginRegister,Home} from './Routes'

export default ()=>(
    <ErrorHandler>
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
    </ErrorHandler>
)