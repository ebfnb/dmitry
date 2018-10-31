import { InMemoryCache } from 'apollo-cache-inmemory'
import onError$link from './m8/apolloLinks/onError$link'
import persistedQuery$getLink from './m8/apolloLinks/persistedQuery$getLink'
import ApolloLink from 'apollo-link'
import clientSchema from './schema/clientSchema/index'
import { ApolloClient } from 'apollo-client'
import { withClientState } from 'apollo-link-state'

const isSSR=window.__STATE__!=='_'
let stateLink
const clientProps={
    ssrForceFetchDelay: 100,
    connectToDevTools: true
}
const cache=new InMemoryCache()
if(isSSR){
    cache.restore(window.__STATE__)
    const {resolvers,typeDefs}=clientSchema
    stateLink=withClientState({cache,resolvers,typeDefs})
}else {
    const {resolvers,typeDefs,defaults}=clientSchema
    stateLink=withClientState({cache,resolvers,typeDefs,defaults})
}
export default new ApolloClient({...clientProps,cache,
    link:ApolloLink.from([
        onError$link,
        stateLink,
        withClientState({cache,resolvers,typeDefs,defaults}),
        persistedQuery$getLink()
    ])
})