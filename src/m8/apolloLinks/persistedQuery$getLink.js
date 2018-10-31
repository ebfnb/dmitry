import { HttpLink } from 'apollo-link-http'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'

export default (config = {}) =>
    // turn on CDN support via GET
    createPersistedQueryLink({ useGETForHashedQueries: true }).concat(
        new HttpLink({
            ...config,
            credentials: 'same-origin',
        })
    )