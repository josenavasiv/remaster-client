import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ArtworksPaginatedPayload } from '@/graphql/__generated__/graphql';

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
});

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                // Name of our Query
                userFeed: {
                    keyArgs: [],
                    merge(
                        existing: ArtworksPaginatedPayload | undefined,
                        incoming: ArtworksPaginatedPayload
                    ): ArtworksPaginatedPayload {
                        return {
                            ...incoming,
                            artworks: [...(existing?.artworks || []), ...incoming.artworks],
                        };
                    },
                },
            },
        },
    },
});

const apolloClient = new ApolloClient({
    cache,
    link: httpLink,
});

export default apolloClient;
