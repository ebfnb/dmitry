import { onError } from 'apollo-link-error'

export default onError(({ graphQLErrors, networkError }) => {
    /*
     onError receives a callback in the event a GraphQL or network error occurs.
     This example is a bit contrived, but in the real world, you could connect
     a logging service to the errorLink or perform a specific action in response
     to an error.
     */
    if (graphQLErrors)
        graphQLErrors.map(({ message, location, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`
            )
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
})(({ graphQLErrors, networkError }) => {
    /*
     onError receives a callback in the event a GraphQL or network error occurs.
     This example is a bit contrived, but in the real world, you could connect
     a logging service to the errorLink or perform a specific action in response
     to an error.
     */
    if (graphQLErrors)
        graphQLErrors.map(({ message, location, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`
            )
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
})