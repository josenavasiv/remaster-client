import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { ArtworksPaginatedPayload, NotificationsPaginatedPayload } from '@/graphql/__generated__/graphql';

const wsLink =
    typeof window !== 'undefined'
        ? new GraphQLWsLink(
              createClient({
                  url: 'ws://localhost:4000/graphql',
              })
          )
        : null;

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
});

const splitLink =
    typeof window !== 'undefined' && wsLink != null
        ? split(
              ({ query }) => {
                  const definition = getMainDefinition(query);
                  return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
              },
              wsLink,
              httpLink
          )
        : httpLink;

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                // Name of our Query
                notifications: {
                    keyArgs: [],
                    merge(
                        existing: NotificationsPaginatedPayload | undefined,
                        incoming: NotificationsPaginatedPayload
                    ): NotificationsPaginatedPayload | undefined {
                        return {
                            ...incoming,
                            notifications: [...(existing?.notifications || []), ...incoming.notifications],
                        };
                    },
                },
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
                userLikes: {
                    keyArgs: ['username'],
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
    link: splitLink,
});

export default apolloClient;
