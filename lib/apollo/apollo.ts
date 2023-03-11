import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
	uri: 'http://localhost:4000/graphql',
	credentials: 'same-origin',
});

const cache = new InMemoryCache({});

const apolloClient = new ApolloClient({
	cache,
	link: httpLink,
});

export default apolloClient;
