/** @jsx jsx */
import { jsx } from "@emotion/core"
import { ApolloProvider } from "react-apollo-hooks"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./containers/Home"
import Layout from "./containers/Layout.useNav"
import ApolloClient from "apollo-boost"
import About from "./containers/About"
import Tasks from "./containers/Tasks"
import GlobalStyles from "./components/GlobalStyles"
import { UserProvider } from "./containers/User"
import LayoutContainer from "./components/LayoutContainer"
import BadUrl from "./components/BadUrl"
import Theme from "./components/Theme"

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})

export default () => (
  <Theme.Provider>
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
  </Theme.Provider>
)
