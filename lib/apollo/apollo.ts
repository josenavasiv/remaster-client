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
                tagArtworks: {
                    keyArgs: ['tagname'],
                    merge(
                        existing: ArtworksPaginatedPayload | undefined,
                        incoming: ArtworksPaginatedPayload
                    ): ArtworksPaginatedPayload | undefined {
                        return {
                            ...incoming,
                            artworks: [...(existing?.artworks || []), ...incoming.artworks],
                        };
                    },
                },
                userFeed: {
                    keyArgs: [],
                    merge(
                        existing: ArtworksPaginatedPayload | undefined,
                        incoming: ArtworksPaginatedPayload
                    ): ArtworksPaginatedPayload | undefined {
                        return {
                            ...incoming,
                            artworks: [...(existing?.artworks || []), ...incoming.artworks],
                        };
                    },
                },
                userExplore: {
                    keyArgs: [],
                    merge(
                        existing: ArtworksPaginatedPayload | undefined,
                        incoming: ArtworksPaginatedPayload
                    ): ArtworksPaginatedPayload | undefined {
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
