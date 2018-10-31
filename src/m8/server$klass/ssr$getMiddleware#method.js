import React from 'react'
import onError$link from './apolloLinks/onError$link'
import { SchemaLink } from 'apollo-link-schema'
import {StaticRouter as Router} from 'react-router-dom'
import { withClientState } from 'apollo-link-state'

export default ({htmlTemplate,clientSchema,
    app$component:App
})=>(req, res) => {
    const schemaLink=new SchemaLink({ schema:this.schema })
    const cache=new InMemoryCache()
    const links=clientSchema?
        [
            onError$link,
            withClientState({cache,...clientSchema}),
            schemaLink
        ]:
        [onError$link,schemaLink]
    const client = new ApolloClient({cache,
        link:ApolloLink.from(links),
        ssrMode: true
    })
    const context = {}
    const component = (
        <ApolloProvider client={client}>
            <Router location={req.url} context={context}>
                <App />
            </Router>
        </ApolloProvider>
    )
    renderToStringWithData(component)
        .then(content => {
            res.status(200)
            const state=client.extract()
            res.send(htmlTemplate(content,state))
            res.end()
        })
        .catch(e => {
            console.error('RENDERING ERROR:', e) // eslint-disable-line no-console
            res.status(500)
            res.end(
                `An error occurred. Please submit an issue to 
                [https://github.com/apollographql/GitHunt-React] with the following stack trace:\n\n${e.stack}`
            )
        })
}