import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route} from "react-router-dom"
import {Layout,ErrorHandler} from './Components'
import {LoginRegister,Home} from './Containers'
import {Provider as StoreProvider} from 'unistore/react'
import config from './config'

const {store:{store},apolloClient}=config
export default ()=>(
    <ErrorHandler>
       <StoreProvider store={store}>
            <ApolloProvider client={apolloClient}>
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