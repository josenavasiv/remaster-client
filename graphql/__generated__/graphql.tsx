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

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello?: string | null };


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