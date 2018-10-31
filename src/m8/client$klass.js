import onError$link from './apolloLinks/onError$link'
import persistedQuery$getLink from './apolloLinks/persistedQuery$getLink'
import ApolloLink from 'apollo-link'

export default class extends ApolloClient{
    constructor({
        link=ApolloLink.from([
            onError$link,
            persistedQuery$getLink()
        ]),
        ...restProps
    }){
        super({link,...restProps})
    }
}
