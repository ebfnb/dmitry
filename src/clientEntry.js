import React from 'react'
import {render,hydrate} from 'react-dom'
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory'

import App from './App#Component.js'
import intiState from './initState'
import m8Client$klass from './m8/client$klass'

const isSSR=window.__STATE__!=='_'
const client=new m8Client$klass({
    cache:new InMemoryCache().restore(
        isSSR?window.__STATE__:initState
    ),
    ssrForceFetchDelay: 100,
    connectToDevTools: true
})
const App=()=>(
    <div>
        <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
        <Helmet>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="./client.css" />
            <title> SSR Preact App </title>
        </Helmet><
        ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>
    </div>
)
const root = document.getElementById('app')
const doIt=isSSR?hydrate:render
doIt(<App />,root)