/** @jsx jsx */
import { jsx} from '@emotion/core'
import { ApolloProvider } from 'react-apollo-hooks'
import { BrowserRouter as Router, Route} from "react-router-dom"
import Home from './containers/Home'
import Layout from './containers/layout'
import {Provider as StoreProvider} from 'unistore/react'
import ApolloClient from "apollo-boost"
import store from '../store'
import About from './containers/About'
import GlobalStyles from './components/GlobalStyles'
import {UserProvider} from './containers/User'

const apolloClient=new ApolloClient({
    uri:'http://localhost:4000/graphql'
})

export default ()=>(  
    <StoreProvider store={store}>
        <ApolloProvider client={apolloClient}>
            <UserProvider>
                <Router>
                    <div>
                        <GlobalStyles/>
                        <Layout/>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/about" component={About} />
                        {/* <Route exact path="/tasks" component={Tasks}/> */}
                    </div>
                </Router>
            </UserProvider>
        </ApolloProvider>
    </StoreProvider>
)