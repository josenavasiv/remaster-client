import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Artwork = Node & {
  __typename?: 'Artwork';
  comments: Array<Comment>;
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  imageUrls: Array<Scalars['String']>;
  isLikedByLoggedInUser?: Maybe<Scalars['Boolean']>;
  likes: Array<Like>;
  likesCount: Scalars['Int'];
  tags: Array<Tag>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  uploader: User;
};

export type ArtworkPayload = {
  __typename?: 'ArtworkPayload';
  artwork?: Maybe<Artwork>;
  errors: Array<Error>;
};

export type ArtworksPaginatedPayload = {
  __typename?: 'ArtworksPaginatedPayload';
  artworks: Array<Artwork>;
  hasMore: Scalars['Boolean'];
};

export type Comment = Node & {
  __typename?: 'Comment';
  artwork: Artwork;
  comment: Scalars['String'];
  commenter: User;
  id: Scalars['ID'];
  isLikedByLoggedInUser?: Maybe<Scalars['Boolean']>;
  likesCount: Scalars['Int'];
  parentComment?: Maybe<Comment>;
  replies: Array<Comment>;
};

export type CommentPayload = {
  __typename?: 'CommentPayload';
  comment?: Maybe<Comment>;
  errors: Array<Error>;
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
};

export type Follow = {
  __typename?: 'Follow';
  follower: User;
  following: User;
  id: Scalars['ID'];
};

export type Like = {
  __typename?: 'Like';
  artwork: Artwork;
  comment?: Maybe<Comment>;
  id: Scalars['ID'];
  likeableType: LikeableType;
  user: User;
};

export enum LikeableType {
  Artwork = 'ARTWORK',
  Comment = 'COMMENT'
}

export type Mutation = {
  __typename?: 'Mutation';
  artworkCreate: ArtworkPayload;
  artworkDelete: ArtworkPayload;
  artworkUpdate: ArtworkPayload;
  commentCreate: CommentPayload;
  commentDelete: CommentPayload;
  commentReply: CommentPayload;
  commentUpdate: CommentPayload;
  userLogin: UserPayload;
  userLogout: Scalars['Boolean'];
  userRegister: UserPayload;
};


export type MutationArtworkCreateArgs = {
  description: Scalars['String'];
  imageUrls: Array<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationArtworkDeleteArgs = {
  artworkID: Scalars['ID'];
};


export type MutationArtworkUpdateArgs = {
  artworkID: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  imageUrls?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationCommentCreateArgs = {
  artworkID: Scalars['ID'];
  comment: Scalars['String'];
};


export type MutationCommentDeleteArgs = {
  commentID: Scalars['ID'];
};


export type MutationCommentReplyArgs = {
  artworkID: Scalars['ID'];
  comment: Scalars['String'];
  parentCommentID: Scalars['ID'];
};


export type MutationCommentUpdateArgs = {
  comment: Scalars['String'];
  commentID: Scalars['ID'];
};


export type MutationUserLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUserRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Notifiable = Artwork | Comment | User;

export type Notification = Node & {
  __typename?: 'Notification';
  id: Scalars['ID'];
  isRead: Scalars['Boolean'];
  notifiedOf: Notifiable;
  notifier: User;
  type: NotificationType;
};

export enum NotificationType {
  Commented = 'COMMENTED',
  Followed = 'FOLLOWED',
  Liked = 'LIKED',
  Replied = 'REPLIED',
  Tagged = 'TAGGED',
  Uploaded = 'UPLOADED'
}

export type Query = {
  __typename?: 'Query';
  artwork: ArtworkPayload;
  hello?: Maybe<Scalars['String']>;
  userLoggedIn: UserPayload;
};


export type QueryArtworkArgs = {
  artworkID: Scalars['ID'];
};

export type Tag = Node & {
  __typename?: 'Tag';
  artworks: Array<Artwork>;
  id: Scalars['ID'];
  isFollowedByLoggedInUser?: Maybe<Scalars['Boolean']>;
  tagname: Scalars['String'];
};

export type TagPayload = {
  __typename?: 'TagPayload';
  errors: Array<Error>;
  tag?: Maybe<Tag>;
};

export type User = Node & {
  __typename?: 'User';
  artworks: Array<Artwork>;
  avatarUrl: Scalars['String'];
  email: Scalars['String'];
  followedTags: Array<Tag>;
  followers: Array<Follow>;
  following: Array<Follow>;
  id: Scalars['ID'];
  isFollowedByLoggedInUser?: Maybe<Scalars['Boolean']>;
  likes: Array<Like>;
  notifications: Array<Notification>;
  username: Scalars['String'];
};

export type UserPayload = {
  __typename?: 'UserPayload';
  errors: Array<Error>;
  user?: Maybe<User>;
};

export type UsersSuggestedPayload = {
  __typename?: 'UsersSuggestedPayload';
  errors: Array<Error>;
  user: Array<User>;
};

export type UserLoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type UserLoginMutation = { __typename?: 'Mutation', userLogin: { __typename?: 'UserPayload', user?: { __typename?: 'User', id: string, username: string, email: string, avatarUrl: string } | null, errors: Array<{ __typename?: 'Error', message: string }> } };

export type ArtworkQueryVariables = Exact<{
  artworkId: Scalars['ID'];
}>;


export type ArtworkQuery = { __typename?: 'Query', artwork: { __typename?: 'ArtworkPayload', artwork?: { __typename?: 'Artwork', id: string, title: string, imageUrls: Array<string>, description: string, isLikedByLoggedInUser?: boolean | null, uploader: { __typename?: 'User', id: string, username: string, avatarUrl: string } } | null } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello?: string | null };

export type UserLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type UserLoggedInQuery = { __typename?: 'Query', userLoggedIn: { __typename?: 'UserPayload', user?: { __typename?: 'User', id: string, username: string, avatarUrl: string } | null, errors: Array<{ __typename?: 'Error', message: string }> } };


export const UserLoginDocument = gql`
    mutation userLogin($username: String!, $password: String!) {
  userLogin(username: $username, password: $password) {
    user {
      id
      username
      email
      avatarUrl
    }
    errors {
      message
    }
  }
}
    `;
export type UserLoginMutationFn = Apollo.MutationFunction<UserLoginMutation, UserLoginMutationVariables>;

/**
 * __useUserLoginMutation__
 *
 * To run a mutation, you first call `useUserLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLoginMutation, { data, loading, error }] = useUserLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUserLoginMutation(baseOptions?: Apollo.MutationHookOptions<UserLoginMutation, UserLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserLoginMutation, UserLoginMutationVariables>(UserLoginDocument, options);
      }
export type UserLoginMutationHookResult = ReturnType<typeof useUserLoginMutation>;
export type UserLoginMutationResult = Apollo.MutationResult<UserLoginMutation>;
export type UserLoginMutationOptions = Apollo.BaseMutationOptions<UserLoginMutation, UserLoginMutationVariables>;
export const ArtworkDocument = gql`
    query artwork($artworkId: ID!) {
  artwork(artworkID: $artworkId) {
    artwork {
      id
      uploader {
        id
        username
        avatarUrl
      }
      title
      imageUrls
      description
      isLikedByLoggedInUser
    }
  }
}
    `;

/**
 * __useArtworkQuery__
 *
 * To run a query within a React component, call `useArtworkQuery` and pass it any options that fit your needs.
 * When your component renders, `useArtworkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtworkQuery({
 *   variables: {
 *      artworkId: // value for 'artworkId'
 *   },
 * });
 */
export function useArtworkQuery(baseOptions: Apollo.QueryHookOptions<ArtworkQuery, ArtworkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArtworkQuery, ArtworkQueryVariables>(ArtworkDocument, options);
      }
export function useArtworkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArtworkQuery, ArtworkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArtworkQuery, ArtworkQueryVariables>(ArtworkDocument, options);
        }
export type ArtworkQueryHookResult = ReturnType<typeof useArtworkQuery>;
export type ArtworkLazyQueryHookResult = ReturnType<typeof useArtworkLazyQuery>;
export type ArtworkQueryResult = Apollo.QueryResult<ArtworkQuery, ArtworkQueryVariables>;
export const HelloDocument = gql`
    query hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const UserLoggedInDocument = gql`
    query UserLoggedIn {
  userLoggedIn {
    user {
      id
      username
      avatarUrl
    }
    errors {
      message
    }
  }
}
    `;

/**
 * __useUserLoggedInQuery__
 *
 * To run a query within a React component, call `useUserLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserLoggedInQuery(baseOptions?: Apollo.QueryHookOptions<UserLoggedInQuery, UserLoggedInQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserLoggedInQuery, UserLoggedInQueryVariables>(UserLoggedInDocument, options);
      }
export function useUserLoggedInLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserLoggedInQuery, UserLoggedInQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserLoggedInQuery, UserLoggedInQueryVariables>(UserLoggedInDocument, options);
        }
export type UserLoggedInQueryHookResult = ReturnType<typeof useUserLoggedInQuery>;
export type UserLoggedInLazyQueryHookResult = ReturnType<typeof useUserLoggedInLazyQuery>;
export type UserLoggedInQueryResult = Apollo.QueryResult<UserLoggedInQuery, UserLoggedInQueryVariables>;