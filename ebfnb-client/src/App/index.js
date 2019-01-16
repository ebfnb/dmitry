/** @jsx jsx */
import { jsx } from "@emotion/core"
import { ApolloProvider } from "react-apollo-hooks"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./containers/Home"
import Layout from "./containers/Layout"
import { Provider as StoreProvider } from "unistore/react"
import ApolloClient from "apollo-boost"
import store from "../store"
import About from "./containers/About"
import Tasks from "./containers/Tasks"
import GlobalStyles from "./components/GlobalStyles"
import { UserProvider } from "./containers/User"
import LayoutContainer from "./components/LayoutContainer"
import BadUrl from "./components/BadUrl"

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})

export default () => (
  <StoreProvider store={store}>
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <Router>
          <div>
            <GlobalStyles />
            <Layout />
            <LayoutContainer tag="main">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/tasks" component={Tasks} />
                <Route component={BadUrl} />
              </Switch>
            </LayoutContainer>
          </div>
        </Router>
      </UserProvider>
    </ApolloProvider>
  </StoreProvider>
)
