import React from 'react'
import {render,hydrate} from 'react-dom'
import { ApolloProvider } from 'react-apollo';
import App from './App#Component.js'
import client from './apolloClient'

const isSSR=window.__STATE__!=='_'
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