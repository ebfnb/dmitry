import client from "./apolloClient";
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route} from "react-router-dom"
import {Layout,ErrorHandler} from './Components'
import {LoginRegister,Home} from './Containers'
import {Provider as StoreProvider} from 'unistore/react'
import store from './store'

export default ()=>(
    <ErrorHandler>
       <StoreProvider store={store}>
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
       </StoreProvider>
    </ErrorHandler>
)