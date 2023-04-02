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
  isLikedByLoggedInUser?: Maybe<Like>;
  likes: Array<Like>;
  likesCount: Scalars['Int'];
  recentComments: Array<Comment>;
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
  errors: Array<Error>;
  hasMore: Scalars['Boolean'];
};

export type Comment = Node & {
  __typename?: 'Comment';
  artwork: Artwork;
  comment: Scalars['String'];
  commenter: User;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  isLikedByLoggedInUser?: Maybe<Like>;
  likesCount: Scalars['Int'];
  parentComment?: Maybe<Comment>;
  parentCommentId?: Maybe<Scalars['ID']>;
  replies: Array<Comment>;
  updatedAt: Scalars['String'];
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
};

export type FollowPayload = {
  __typename?: 'FollowPayload';
  errors: Array<Error>;
  follow?: Maybe<Follow>;
};

export type Like = {
  __typename?: 'Like';
  artwork?: Maybe<Artwork>;
  comment?: Maybe<Comment>;
  id: Scalars['ID'];
  likeableType: LikeableType;
  user: User;
};

export type LikePayload = {
  __typename?: 'LikePayload';
  errors: Array<Error>;
  like?: Maybe<Like>;
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
  followUserCreate: FollowPayload;
  followUserDelete: FollowPayload;
  likeArtworkCreate: LikePayload;
  likeArtworkDelete: LikePayload;
  likeCommentCreate: LikePayload;
  likeCommentDelete: LikePayload;
  notificationMarkAsRead: NotificationPayload;
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
  replyingToCommentID?: InputMaybe<Scalars['ID']>;
  replyingToUserID?: InputMaybe<Scalars['ID']>;
};


export type MutationCommentUpdateArgs = {
  comment: Scalars['String'];
  commentID: Scalars['ID'];
};


export type MutationFollowUserCreateArgs = {
  userID: Scalars['ID'];
};


export type MutationFollowUserDeleteArgs = {
  userID: Scalars['ID'];
};


export type MutationLikeArtworkCreateArgs = {
  artworkID: Scalars['ID'];
};


export type MutationLikeArtworkDeleteArgs = {
  artworkID: Scalars['ID'];
  likeID: Scalars['ID'];
};


export type MutationLikeCommentCreateArgs = {
  commentID: Scalars['ID'];
};


export type MutationLikeCommentDeleteArgs = {
  commentID: Scalars['ID'];
  likeID: Scalars['ID'];
};


export type MutationNotificationMarkAsReadArgs = {
  notificationID: Scalars['ID'];
};


export type MutationUserLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUserRegisterArgs = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Notification = Node & {
  __typename?: 'Notification';
  artwork?: Maybe<Artwork>;
  comment?: Maybe<Comment>;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  isRead: Scalars['Boolean'];
  notificationType: NotificationType;
  notifier: User;
  notifierArtwork?: Maybe<Artwork>;
  notifierComment?: Maybe<Comment>;
};

export type NotificationPayload = {
  __typename?: 'NotificationPayload';
  errors: Array<Error>;
  notification?: Maybe<Notification>;
};

export enum NotificationType {
  Commented = 'COMMENTED',
  Followed = 'FOLLOWED',
  Liked = 'LIKED',
  Replied = 'REPLIED',
  Tagged = 'TAGGED',
  Uploaded = 'UPLOADED'
}

export type NotificationsPaginatedPayload = {
  __typename?: 'NotificationsPaginatedPayload';
  errors: Array<Error>;
  hasMore: Scalars['Boolean'];
  notifications: Array<Notification>;
};

export type Query = {
  __typename?: 'Query';
  artwork: ArtworkPayload;
  hello?: Maybe<Scalars['String']>;
  notifications: NotificationsPaginatedPayload;
  tagArtworks: ArtworksPaginatedPayload;
  user: UserPayload;
  userExplore: ArtworksPaginatedPayload;
  userExploreTags: TagsPayload;
  userFeed: ArtworksPaginatedPayload;
  userFollowers: UsersPaginatedPayload;
  userFollowings: UsersPaginatedPayload;
  userLikes: ArtworksPaginatedPayload;
  userLoggedIn: UserPayload;
};


export type QueryArtworkArgs = {
  artworkID: Scalars['ID'];
};


export type QueryNotificationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryTagArtworksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  tagname: Scalars['String'];
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryUserExploreArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryUserFeedArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryUserFollowersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  username: Scalars['String'];
};


export type QueryUserFollowingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  username: Scalars['String'];
};


export type QueryUserLikesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  username: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newNotification: Notification;
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

export type TagsPayload = {
  __typename?: 'TagsPayload';
  errors: Array<Error>;
  tags: Array<Tag>;
};

export type User = Node & {
  __typename?: 'User';
  artworks: Array<Artwork>;
  avatarUrl: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  isFollowedByLoggedInUser?: Maybe<Follow>;
  notifications: Array<Notification>;
  username: Scalars['String'];
};

export type UserPayload = {
  __typename?: 'UserPayload';
  errors: Array<Error>;
  user?: Maybe<User>;
};

export type UsersPaginatedPayload = {
  __typename?: 'UsersPaginatedPayload';
  errors: Array<Error>;
  hasMore: Scalars['Boolean'];
  users: Array<User>;
};

export type UsersSuggestedPayload = {
  __typename?: 'UsersSuggestedPayload';
  errors: Array<Error>;
  user: Array<User>;
};

export type CommentFragment = { __typename?: 'Comment', id: string, comment: string, likesCount: number, createdAt: string, updatedAt: string, commenter: { __typename?: 'User', id: string, username: string, avatarUrl: string }, replies: Array<{ __typename?: 'Comment', id: string, comment: string, parentCommentId?: string | null, likesCount: number, createdAt: string, updatedAt: string, commenter: { __typename?: 'User', id: string, username: string, avatarUrl: string }, isLikedByLoggedInUser?: { __typename?: 'Like', id: string } | null, parentComment?: { __typename?: 'Comment', id: string, commenter: { __typename?: 'User', id: string, username: string } } | null }>, isLikedByLoggedInUser?: { __typename?: 'Like', id: string } | null };

export type NotificationFragment = { __typename?: 'Notification', id: string, isRead: boolean, createdAt: string, notificationType: NotificationType, notifier: { __typename?: 'User', id: string, username: string, avatarUrl: string }, artwork?: { __typename?: 'Artwork', id: string, title: string, imageUrls: Array<string> } | null, comment?: { __typename?: 'Comment', id: string, comment: string } | null, notifierArtwork?: { __typename?: 'Artwork', id: string, title: string, imageUrls: Array<string> } | null, notifierComment?: { __typename?: 'Comment', id: string, comment: string } | null };

export type ArtworkCreateMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  imageUrls: Array<Scalars['String']> | Scalars['String'];
}>;


export type ArtworkCreateMutation = { __typename?: 'Mutation', artworkCreate: { __typename?: 'ArtworkPayload', artwork?: { __typename?: 'Artwork', id: string, title: string, description: string, imageUrls: Array<string>, likesCount: number, createdAt: string, uploader: { __typename?: 'User', id: string, username: string, avatarUrl: string }, recentComments: Array<{ __typename?: 'Comment', id: string, comment: string, commenter: { __typename?: 'User', id: string, username: string, avatarUrl: string }, isLikedByLoggedInUser?: { __typename?: 'Like', id: string } | null }>, isLikedByLoggedInUser?: { __typename?: 'Like', id: string } | null } | null, errors: Array<{ __typename?: 'Error', message: string }> } };

export type ArtworkDeleteMutationVariables = Exact<{
  artworkId: Scalars['ID'];
}>;


export type ArtworkDeleteMutation = { __typename?: 'Mutation', artworkDelete: { __typename?: 'ArtworkPayload', artwork?: { __typename?: 'Artwork', id: string, title: string } | null, errors: Array<{ __typename?: 'Error', message: string }> } };

export type ArtworkUpdateMutationVariables = Exact<{
  artworkId: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  imageUrls?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type ArtworkUpdateMutation = { __typename?: 'Mutation', artworkUpdate: { __typename?: 'ArtworkPayload', artwork?: { __typename?: 'Artwork', id: string, title: string, description: string, imageUrls: Array<string> } | null, errors: Array<{ __typename?: 'Error', message: string }> } };

export type CommentCreateMutationVariables = Exact<{
  artworkId: Scalars['ID'];
  comment: Scalars['String'];
}>;


export type CommentCreateMutation = { __typename?: 'Mutation', commentCreate: { __typename?: 'CommentPayload', comment?: { __typename?: 'Comment', id: string, comment: string, likesCount: number, createdAt: string, updatedAt: string, commenter: { __typename?: 'User', id: string, username: string, avatarUrl: string }, replies: Array<{ __typename?: 'Comment', id: string, comment: string, parentCommentId?: string | null, likesCount: number, createdAt: string, updatedAt: string, commenter: { __typename?: 'User', id: string, username: string, avatarUrl: string }, isLikedByLoggedInUser?: { __typename?: 'Like', id: string } | null, parentComment?: { __typename?: 'Comment', id: string, commenter: { __typename?: 'User', id: string, username: string } } | null }>, isLikedByLoggedInUser?: { __typename?: 'Like', id: string } | null } | null, errors: Array<{ __typename?: 'Error', message: string }> } };

export type CommentDeleteMutationVariables = Exact<{
  commentId: Scalars['ID'];
}>;


export type CommentDeleteMutation = { __typename?: 'Mutation', commentDelete: { __typename?: 'CommentPayload', comment?: { __typename?: 'Comment', id: string, comment: string } | null, errors: Array<{ __typename?: 'Error', message: string }> } };

export type CommentReplyMutationVariables = Exact<{
  artworkId: Scalars['ID'];
  comment: Scalars['String'];
  parentCommentId: Scalars['ID'];
  replyingToUserId?: InputMaybe<Scalars['ID']>;
  replyingToCommentId?: InputMaybe<Scalars['ID']>;
}>;


export type CommentReplyMutation = { __typename?: 'Mutation', commentReply: { __typename?: 'CommentPayload', comment?: { __typename?: 'Comment', id: string, comment: string, likesCount: number, parentCommentId?: string | null, createdAt: string, updatedAt: string, commenter: { __typename?: 'User', id: string, username: string, avatarUrl: string }, parentComment?: { __typename?: 'Comment', id: string, commenter: { __typename?: 'User', username: string } } | null, isLikedByLoggedInUser?: { __typename?: 'Like', id: string } | null } | null, errors: Array<{ __typename?: 'Error', message: string }> } };

export type CommentUpdateMutationVariables = Exact<{
  commentId: Scalars['ID'];
  comment: Scalars['String'];
}>;


export type CommentUpdateMutation = { __typename?: 'Mutation', commentUpdate: { __typename?: 'CommentPayload', comment?: { __typename?: 'Comment', id: string, comment: string } | null, errors: Array<{ __typename?: 'Error', message: string }> } };

export type FollowUserCreateMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type FollowUserCreateMutation = { __typename?: 'Mutation', followUserCreate: { __typename?: 'FollowPayload', follow?: { __typename?: 'Follow', following: { __typename?: 'User', id: string, username: string, avatarUrl: string }, follower: { __typename?: 'User', id: string, username: string, avatarUrl: string } } | null, errors: Array<{ __typename?: 'Error', message: string }> } };

export type FollowUserDeleteMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type FollowUserDeleteMutation = { __typename?: 'Mutation', followUserDelete: { __typename?: 'FollowPayload', follow?: { __typename?: 'Follow', following: { __typename?: 'User', id: string, username: string, avatarUrl: string }, follower: { __typename?: 'User', id: string, username: string, avatarUrl: string } } | null, errors: Array<{ __typename?: 'Error', message: string }> } };

export type LikeArtworkCreateMutationVariables = Exact<{
  artworkId: Scalars['ID'];
}>;


export type LikeArtworkCreateMutation = { __typename?: 'Mutation', likeArtworkCreate: { __typename?: 'LikePayload', like?: { __typename?: 'Like', id: string } | null, errors: Array<{ __typename?: 'Error', message: string }> } };

export type LikeArtworkDeleteMutationVariables = Exact<{
  likeId: Scalars['ID'];
  artworkId: Scalars['ID'];
}>;


export type LikeArtworkDeleteMutation = { __typename?: 'Mutation', likeArtworkDelete: { __typename?: 'LikePayload', like?: { __typename?: 'Like', id: string } | null, errors: Array<{ __typename?: 'Error', message: string }> } };

export type LikeCommentCreateMutationVariables = Exact<{
  commentId: Scalars['ID'];
}>;


export type LikeCommentCreateMutation = { __typename?: 'Mutation', likeCommentCreate: { __typename?: 'LikePayload', like?: { __typename?: 'Like', id: string } | null, errors: Array<{ __typename?: 'Error', message: string }> } };

export type LikeCommentDeleteMutationVariables = Exact<{
  likeId: Scalars['ID'];
  commentId: Scalars['ID'];
}>;


export type LikeCommentDeleteMutation = { __typename?: 'Mutation', likeCommentDelete: { __typename?: 'LikePayload', like?: { __typename?: 'Like', id: string } | null, errors: Array<{ __typename?: 'Error', message: string }> } };

export type NotificationMarkAsReadMutationVariables = Exact<{
  notificationId: Scalars['ID'];
}>;


export type NotificationMarkAsReadMutation = { __typename?: 'Mutation', notificationMarkAsRead: { __typename?: 'NotificationPayload', notification?: { __typename?: 'Notification', id: string, isRead: boolean, createdAt: string, notificationType: NotificationType, notifier: { __typename?: 'User', id: string, username: string, avatarUrl: string }, artwork?: { __typename?: 'Artwork', id: string, title: string, imageUrls: Array<string> } | null, comment?: { __typename?: 'Comment', id: string, comment: string } | null, notifierArtwork?: { __typename?: 'Artwork', id: string, title: string, imageUrls: Array<string> } | null, notifierComment?: { __typename?: 'Comment', id: string, comment: string } | null } | null } };

export type UserLoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type UserLoginMutation = { __typename?: 'Mutation', userLogin: { __typename?: 'UserPayload', user?: { __typename?: 'User', id: string, username: string, email: string, avatarUrl: string } | null, errors: Array<{ __typename?: 'Error', message: string }> } };

export type UserLogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type UserLogoutMutation = { __typename?: 'Mutation', userLogout: boolean };

export type UserRegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  avatarUrl?: InputMaybe<Scalars['String']>;
}>;


export type UserRegisterMutation = { __typename?: 'Mutation', userRegister: { __typename?: 'UserPayload', user?: { __typename?: 'User', id: string, username: string, avatarUrl: string, email: string } | null, errors: Array<{ __typename?: 'Error', message: string }> } };

export type ArtworkQueryVariables = Exact<{
  artworkId: Scalars['ID'];
}>;


export type ArtworkQuery = { __typename?: 'Query', artwork: { __typename?: 'ArtworkPayload', artwork?: { __typename?: 'Artwork', id: string, title: string, description: string, imageUrls: Array<string>, createdAt: string, likesCount: number, uploader: { __typename?: 'User', id: string, username: string, avatarUrl: string }, comments: Array<{ __typename?: 'Comment', id: string, comment: string, likesCount: number, createdAt: string, updatedAt: string, commenter: { __typename?: 'User', id: string, username: string, avatarUrl: string }, replies: Array<{ __typename?: 'Comment', id: string, comment: string, parentCommentId?: string | null, likesCount: number, createdAt: string, updatedAt: string, commenter: { __typename?: 'User', id: string, username: string, avatarUrl: string }, isLikedByLoggedInUser?: { __typename?: 'Like', id: string } | null, parentComment?: { __typename?: 'Comment', id: string, commenter: { __typename?: 'User', id: string, username: string } } | null }>, isLikedByLoggedInUser?: { __typename?: 'Like', id: string } | null }>, isLikedByLoggedInUser?: { __typename?: 'Like', id: string } | null } | null, errors: Array<{ __typename?: 'Error', message: string }> } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello?: string | null };

export type NotificationsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type NotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'NotificationsPaginatedPayload', hasMore: boolean, notifications: Array<{ __typename?: 'Notification', id: string, isRead: boolean, createdAt: string, notificationType: NotificationType, notifier: { __typename?: 'User', id: string, username: string, avatarUrl: string }, artwork?: { __typename?: 'Artwork', id: string, title: string, imageUrls: Array<string> } | null, comment?: { __typename?: 'Comment', id: string, comment: string } | null, notifierArtwork?: { __typename?: 'Artwork', id: string, title: string, imageUrls: Array<string> } | null, notifierComment?: { __typename?: 'Comment', id: string, comment: string } | null }>, errors: Array<{ __typename?: 'Error', message: string }> } };

export type TagArtworksQueryVariables = Exact<{
  tagname: Scalars['String'];
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type TagArtworksQuery = { __typename?: 'Query', tagArtworks: { __typename?: 'ArtworksPaginatedPayload', hasMore: boolean, artworks: Array<{ __typename?: 'Artwork', id: string, title: string, description: string, imageUrls: Array<string>, likesCount: number, createdAt: string, isLikedByLoggedInUser?: { __typename?: 'Like', id: string } | null, uploader: { __typename?: 'User', id: string, username: string, avatarUrl: string } }>, errors: Array<{ __typename?: 'Error', message: string }> } };

export type UserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'UserPayload', user?: { __typename?: 'User', id: string, username: string, avatarUrl: string, artworks: Array<{ __typename?: 'Artwork', id: string, imageUrls: Array<string>, likesCount: number, title: string, description: string }>, isFollowedByLoggedInUser?: { __typename?: 'Follow', follower: { __typename?: 'User', id: string }, following: { __typename?: 'User', id: string } } | null } | null } };

export type UserExploreQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type UserExploreQuery = { __typename?: 'Query', userExplore: { __typename?: 'ArtworksPaginatedPayload', hasMore: boolean, artworks: Array<{ __typename?: 'Artwork', id: string, title: string, description: string, imageUrls: Array<string>, likesCount: number, createdAt: string, isLikedByLoggedInUser?: { __typename?: 'Like', id: string } | null, uploader: { __typename?: 'User', id: string, username: string, avatarUrl: string } }>, errors: Array<{ __typename?: 'Error', message: string }> } };

export type UserExploreTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserExploreTagsQuery = { __typename?: 'Query', userExploreTags: { __typename?: 'TagsPayload', tags: Array<{ __typename?: 'Tag', id: string, tagname: string }>, errors: Array<{ __typename?: 'Error', message: string }> } };

export type UserFeedQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type UserFeedQuery = { __typename?: 'Query', userFeed: { __typename?: 'ArtworksPaginatedPayload', hasMore: boolean, artworks: Array<{ __typename?: 'Artwork', id: string, title: string, description: string, imageUrls: Array<string>, likesCount: number, createdAt: string, uploader: { __typename?: 'User', id: string, username: string, avatarUrl: string }, recentComments: Array<{ __typename?: 'Comment', id: string, comment: string, commenter: { __typename?: 'User', id: string, username: string, avatarUrl: string }, isLikedByLoggedInUser?: { __typename?: 'Like', id: string } | null }>, isLikedByLoggedInUser?: { __typename?: 'Like', id: string } | null }>, errors: Array<{ __typename?: 'Error', message: string }> } };

export type UserFollowersQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserFollowersQuery = { __typename?: 'Query', userFollowers: { __typename?: 'UsersPaginatedPayload', hasMore: boolean, users: Array<{ __typename?: 'User', id: string, username: string, avatarUrl: string }>, errors: Array<{ __typename?: 'Error', message: string }> } };

export type UserFollowingsQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserFollowingsQuery = { __typename?: 'Query', userFollowings: { __typename?: 'UsersPaginatedPayload', hasMore: boolean, users: Array<{ __typename?: 'User', id: string, username: string, avatarUrl: string }>, errors: Array<{ __typename?: 'Error', message: string }> } };

export type UserLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type UserLoggedInQuery = { __typename?: 'Query', userLoggedIn: { __typename?: 'UserPayload', user?: { __typename?: 'User', id: string, username: string, avatarUrl: string } | null, errors: Array<{ __typename?: 'Error', message: string }> } };

export type NewNotificationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewNotificationSubscription = { __typename?: 'Subscription', newNotification: { __typename?: 'Notification', id: string, isRead: boolean, createdAt: string, notificationType: NotificationType, notifier: { __typename?: 'User', id: string, username: string, avatarUrl: string }, artwork?: { __typename?: 'Artwork', id: string, title: string, imageUrls: Array<string> } | null, comment?: { __typename?: 'Comment', id: string, comment: string } | null, notifierArtwork?: { __typename?: 'Artwork', id: string, title: string, imageUrls: Array<string> } | null, notifierComment?: { __typename?: 'Comment', id: string, comment: string } | null } };

export const CommentFragmentDoc = gql`
    fragment Comment on Comment {
  id
  comment
  likesCount
  commenter {
    id
    username
    avatarUrl
  }
  replies {
    id
    comment
    commenter {
      id
      username
      avatarUrl
    }
    parentCommentId
    likesCount
    createdAt
    updatedAt
    isLikedByLoggedInUser {
      id
    }
    parentComment {
      id
      commenter {
        id
        username
      }
    }
  }
  createdAt
  updatedAt
  isLikedByLoggedInUser {
    id
  }
}
    `;
export const NotificationFragmentDoc = gql`
    fragment Notification on Notification {
  id
  isRead
  createdAt
  notificationType
  notifier {
    id
    username
    avatarUrl
  }
  artwork {
    id
    title
    imageUrls
  }
  comment {
    id
    comment
  }
  notifierArtwork {
    id
    title
    imageUrls
  }
  notifierComment {
    id
    comment
  }
}
    `;
export const ArtworkCreateDocument = gql`
    mutation artworkCreate($title: String!, $description: String!, $imageUrls: [String!]!) {
  artworkCreate(title: $title, description: $description, imageUrls: $imageUrls) {
    artwork {
      id
      title
      description
      imageUrls
      likesCount
      createdAt
      uploader {
        id
        username
        avatarUrl
      }
      recentComments {
        id
        comment
        commenter {
          id
          username
          avatarUrl
        }
        isLikedByLoggedInUser {
          id
        }
      }
      isLikedByLoggedInUser {
        id
      }
    }
    errors {
      message
    }
  }
}
    `;
export type ArtworkCreateMutationFn = Apollo.MutationFunction<ArtworkCreateMutation, ArtworkCreateMutationVariables>;

/**
 * __useArtworkCreateMutation__
 *
 * To run a mutation, you first call `useArtworkCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArtworkCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [artworkCreateMutation, { data, loading, error }] = useArtworkCreateMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      imageUrls: // value for 'imageUrls'
 *   },
 * });
 */
export function useArtworkCreateMutation(baseOptions?: Apollo.MutationHookOptions<ArtworkCreateMutation, ArtworkCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArtworkCreateMutation, ArtworkCreateMutationVariables>(ArtworkCreateDocument, options);
      }
export type ArtworkCreateMutationHookResult = ReturnType<typeof useArtworkCreateMutation>;
export type ArtworkCreateMutationResult = Apollo.MutationResult<ArtworkCreateMutation>;
export type ArtworkCreateMutationOptions = Apollo.BaseMutationOptions<ArtworkCreateMutation, ArtworkCreateMutationVariables>;
export const ArtworkDeleteDocument = gql`
    mutation artworkDelete($artworkId: ID!) {
  artworkDelete(artworkID: $artworkId) {
    artwork {
      id
      title
    }
    errors {
      message
    }
  }
}
    `;
export type ArtworkDeleteMutationFn = Apollo.MutationFunction<ArtworkDeleteMutation, ArtworkDeleteMutationVariables>;

/**
 * __useArtworkDeleteMutation__
 *
 * To run a mutation, you first call `useArtworkDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArtworkDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [artworkDeleteMutation, { data, loading, error }] = useArtworkDeleteMutation({
 *   variables: {
 *      artworkId: // value for 'artworkId'
 *   },
 * });
 */
export function useArtworkDeleteMutation(baseOptions?: Apollo.MutationHookOptions<ArtworkDeleteMutation, ArtworkDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArtworkDeleteMutation, ArtworkDeleteMutationVariables>(ArtworkDeleteDocument, options);
      }
export type ArtworkDeleteMutationHookResult = ReturnType<typeof useArtworkDeleteMutation>;
export type ArtworkDeleteMutationResult = Apollo.MutationResult<ArtworkDeleteMutation>;
export type ArtworkDeleteMutationOptions = Apollo.BaseMutationOptions<ArtworkDeleteMutation, ArtworkDeleteMutationVariables>;
export const ArtworkUpdateDocument = gql`
    mutation artworkUpdate($artworkId: ID!, $title: String, $description: String, $imageUrls: [String!]) {
  artworkUpdate(
    artworkID: $artworkId
    title: $title
    description: $description
    imageUrls: $imageUrls
  ) {
    artwork {
      id
      title
      description
      imageUrls
    }
    errors {
      message
    }
  }
}
    `;
export type ArtworkUpdateMutationFn = Apollo.MutationFunction<ArtworkUpdateMutation, ArtworkUpdateMutationVariables>;

/**
 * __useArtworkUpdateMutation__
 *
 * To run a mutation, you first call `useArtworkUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArtworkUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [artworkUpdateMutation, { data, loading, error }] = useArtworkUpdateMutation({
 *   variables: {
 *      artworkId: // value for 'artworkId'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      imageUrls: // value for 'imageUrls'
 *   },
 * });
 */
export function useArtworkUpdateMutation(baseOptions?: Apollo.MutationHookOptions<ArtworkUpdateMutation, ArtworkUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArtworkUpdateMutation, ArtworkUpdateMutationVariables>(ArtworkUpdateDocument, options);
      }
export type ArtworkUpdateMutationHookResult = ReturnType<typeof useArtworkUpdateMutation>;
export type ArtworkUpdateMutationResult = Apollo.MutationResult<ArtworkUpdateMutation>;
export type ArtworkUpdateMutationOptions = Apollo.BaseMutationOptions<ArtworkUpdateMutation, ArtworkUpdateMutationVariables>;
export const CommentCreateDocument = gql`
    mutation commentCreate($artworkId: ID!, $comment: String!) {
  commentCreate(artworkID: $artworkId, comment: $comment) {
    comment {
      ...Comment
    }
    errors {
      message
    }
  }
}
    ${CommentFragmentDoc}`;
export type CommentCreateMutationFn = Apollo.MutationFunction<CommentCreateMutation, CommentCreateMutationVariables>;

/**
 * __useCommentCreateMutation__
 *
 * To run a mutation, you first call `useCommentCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentCreateMutation, { data, loading, error }] = useCommentCreateMutation({
 *   variables: {
 *      artworkId: // value for 'artworkId'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useCommentCreateMutation(baseOptions?: Apollo.MutationHookOptions<CommentCreateMutation, CommentCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentCreateMutation, CommentCreateMutationVariables>(CommentCreateDocument, options);
      }
export type CommentCreateMutationHookResult = ReturnType<typeof useCommentCreateMutation>;
export type CommentCreateMutationResult = Apollo.MutationResult<CommentCreateMutation>;
export type CommentCreateMutationOptions = Apollo.BaseMutationOptions<CommentCreateMutation, CommentCreateMutationVariables>;
export const CommentDeleteDocument = gql`
    mutation commentDelete($commentId: ID!) {
  commentDelete(commentID: $commentId) {
    comment {
      id
      comment
    }
    errors {
      message
    }
  }
}
    `;
export type CommentDeleteMutationFn = Apollo.MutationFunction<CommentDeleteMutation, CommentDeleteMutationVariables>;

/**
 * __useCommentDeleteMutation__
 *
 * To run a mutation, you first call `useCommentDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentDeleteMutation, { data, loading, error }] = useCommentDeleteMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useCommentDeleteMutation(baseOptions?: Apollo.MutationHookOptions<CommentDeleteMutation, CommentDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentDeleteMutation, CommentDeleteMutationVariables>(CommentDeleteDocument, options);
      }
export type CommentDeleteMutationHookResult = ReturnType<typeof useCommentDeleteMutation>;
export type CommentDeleteMutationResult = Apollo.MutationResult<CommentDeleteMutation>;
export type CommentDeleteMutationOptions = Apollo.BaseMutationOptions<CommentDeleteMutation, CommentDeleteMutationVariables>;
export const CommentReplyDocument = gql`
    mutation commentReply($artworkId: ID!, $comment: String!, $parentCommentId: ID!, $replyingToUserId: ID, $replyingToCommentId: ID) {
  commentReply(
    artworkID: $artworkId
    comment: $comment
    parentCommentID: $parentCommentId
    replyingToUserID: $replyingToUserId
    replyingToCommentID: $replyingToCommentId
  ) {
    comment {
      id
      comment
      commenter {
        id
        username
        avatarUrl
      }
      likesCount
      parentCommentId
      parentComment {
        id
        commenter {
          username
        }
      }
      createdAt
      updatedAt
      isLikedByLoggedInUser {
        id
      }
    }
    errors {
      message
    }
  }
}
    `;
export type CommentReplyMutationFn = Apollo.MutationFunction<CommentReplyMutation, CommentReplyMutationVariables>;

/**
 * __useCommentReplyMutation__
 *
 * To run a mutation, you first call `useCommentReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentReplyMutation, { data, loading, error }] = useCommentReplyMutation({
 *   variables: {
 *      artworkId: // value for 'artworkId'
 *      comment: // value for 'comment'
 *      parentCommentId: // value for 'parentCommentId'
 *      replyingToUserId: // value for 'replyingToUserId'
 *      replyingToCommentId: // value for 'replyingToCommentId'
 *   },
 * });
 */
export function useCommentReplyMutation(baseOptions?: Apollo.MutationHookOptions<CommentReplyMutation, CommentReplyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentReplyMutation, CommentReplyMutationVariables>(CommentReplyDocument, options);
      }
export type CommentReplyMutationHookResult = ReturnType<typeof useCommentReplyMutation>;
export type CommentReplyMutationResult = Apollo.MutationResult<CommentReplyMutation>;
export type CommentReplyMutationOptions = Apollo.BaseMutationOptions<CommentReplyMutation, CommentReplyMutationVariables>;
export const CommentUpdateDocument = gql`
    mutation commentUpdate($commentId: ID!, $comment: String!) {
  commentUpdate(commentID: $commentId, comment: $comment) {
    comment {
      id
      comment
    }
    errors {
      message
    }
  }
}
    `;
export type CommentUpdateMutationFn = Apollo.MutationFunction<CommentUpdateMutation, CommentUpdateMutationVariables>;

/**
 * __useCommentUpdateMutation__
 *
 * To run a mutation, you first call `useCommentUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentUpdateMutation, { data, loading, error }] = useCommentUpdateMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useCommentUpdateMutation(baseOptions?: Apollo.MutationHookOptions<CommentUpdateMutation, CommentUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentUpdateMutation, CommentUpdateMutationVariables>(CommentUpdateDocument, options);
      }
export type CommentUpdateMutationHookResult = ReturnType<typeof useCommentUpdateMutation>;
export type CommentUpdateMutationResult = Apollo.MutationResult<CommentUpdateMutation>;
export type CommentUpdateMutationOptions = Apollo.BaseMutationOptions<CommentUpdateMutation, CommentUpdateMutationVariables>;
export const FollowUserCreateDocument = gql`
    mutation followUserCreate($userId: ID!) {
  followUserCreate(userID: $userId) {
    follow {
      following {
        id
        username
        avatarUrl
      }
      follower {
        id
        username
        avatarUrl
      }
    }
    errors {
      message
    }
  }
}
    `;
export type FollowUserCreateMutationFn = Apollo.MutationFunction<FollowUserCreateMutation, FollowUserCreateMutationVariables>;

/**
 * __useFollowUserCreateMutation__
 *
 * To run a mutation, you first call `useFollowUserCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserCreateMutation, { data, loading, error }] = useFollowUserCreateMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowUserCreateMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserCreateMutation, FollowUserCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserCreateMutation, FollowUserCreateMutationVariables>(FollowUserCreateDocument, options);
      }
export type FollowUserCreateMutationHookResult = ReturnType<typeof useFollowUserCreateMutation>;
export type FollowUserCreateMutationResult = Apollo.MutationResult<FollowUserCreateMutation>;
export type FollowUserCreateMutationOptions = Apollo.BaseMutationOptions<FollowUserCreateMutation, FollowUserCreateMutationVariables>;
export const FollowUserDeleteDocument = gql`
    mutation followUserDelete($userId: ID!) {
  followUserDelete(userID: $userId) {
    follow {
      following {
        id
        username
        avatarUrl
      }
      follower {
        id
        username
        avatarUrl
      }
    }
    errors {
      message
    }
  }
}
    `;
export type FollowUserDeleteMutationFn = Apollo.MutationFunction<FollowUserDeleteMutation, FollowUserDeleteMutationVariables>;

/**
 * __useFollowUserDeleteMutation__
 *
 * To run a mutation, you first call `useFollowUserDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserDeleteMutation, { data, loading, error }] = useFollowUserDeleteMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowUserDeleteMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserDeleteMutation, FollowUserDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserDeleteMutation, FollowUserDeleteMutationVariables>(FollowUserDeleteDocument, options);
      }
export type FollowUserDeleteMutationHookResult = ReturnType<typeof useFollowUserDeleteMutation>;
export type FollowUserDeleteMutationResult = Apollo.MutationResult<FollowUserDeleteMutation>;
export type FollowUserDeleteMutationOptions = Apollo.BaseMutationOptions<FollowUserDeleteMutation, FollowUserDeleteMutationVariables>;
export const LikeArtworkCreateDocument = gql`
    mutation likeArtworkCreate($artworkId: ID!) {
  likeArtworkCreate(artworkID: $artworkId) {
    like {
      id
    }
    errors {
      message
    }
  }
}
    `;
export type LikeArtworkCreateMutationFn = Apollo.MutationFunction<LikeArtworkCreateMutation, LikeArtworkCreateMutationVariables>;

/**
 * __useLikeArtworkCreateMutation__
 *
 * To run a mutation, you first call `useLikeArtworkCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeArtworkCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeArtworkCreateMutation, { data, loading, error }] = useLikeArtworkCreateMutation({
 *   variables: {
 *      artworkId: // value for 'artworkId'
 *   },
 * });
 */
export function useLikeArtworkCreateMutation(baseOptions?: Apollo.MutationHookOptions<LikeArtworkCreateMutation, LikeArtworkCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeArtworkCreateMutation, LikeArtworkCreateMutationVariables>(LikeArtworkCreateDocument, options);
      }
export type LikeArtworkCreateMutationHookResult = ReturnType<typeof useLikeArtworkCreateMutation>;
export type LikeArtworkCreateMutationResult = Apollo.MutationResult<LikeArtworkCreateMutation>;
export type LikeArtworkCreateMutationOptions = Apollo.BaseMutationOptions<LikeArtworkCreateMutation, LikeArtworkCreateMutationVariables>;
export const LikeArtworkDeleteDocument = gql`
    mutation LikeArtworkDelete($likeId: ID!, $artworkId: ID!) {
  likeArtworkDelete(likeID: $likeId, artworkID: $artworkId) {
    like {
      id
    }
    errors {
      message
    }
  }
}
    `;
export type LikeArtworkDeleteMutationFn = Apollo.MutationFunction<LikeArtworkDeleteMutation, LikeArtworkDeleteMutationVariables>;

/**
 * __useLikeArtworkDeleteMutation__
 *
 * To run a mutation, you first call `useLikeArtworkDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeArtworkDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeArtworkDeleteMutation, { data, loading, error }] = useLikeArtworkDeleteMutation({
 *   variables: {
 *      likeId: // value for 'likeId'
 *      artworkId: // value for 'artworkId'
 *   },
 * });
 */
export function useLikeArtworkDeleteMutation(baseOptions?: Apollo.MutationHookOptions<LikeArtworkDeleteMutation, LikeArtworkDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeArtworkDeleteMutation, LikeArtworkDeleteMutationVariables>(LikeArtworkDeleteDocument, options);
      }
export type LikeArtworkDeleteMutationHookResult = ReturnType<typeof useLikeArtworkDeleteMutation>;
export type LikeArtworkDeleteMutationResult = Apollo.MutationResult<LikeArtworkDeleteMutation>;
export type LikeArtworkDeleteMutationOptions = Apollo.BaseMutationOptions<LikeArtworkDeleteMutation, LikeArtworkDeleteMutationVariables>;
export const LikeCommentCreateDocument = gql`
    mutation likeCommentCreate($commentId: ID!) {
  likeCommentCreate(commentID: $commentId) {
    like {
      id
    }
    errors {
      message
    }
  }
}
    `;
export type LikeCommentCreateMutationFn = Apollo.MutationFunction<LikeCommentCreateMutation, LikeCommentCreateMutationVariables>;

/**
 * __useLikeCommentCreateMutation__
 *
 * To run a mutation, you first call `useLikeCommentCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeCommentCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeCommentCreateMutation, { data, loading, error }] = useLikeCommentCreateMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useLikeCommentCreateMutation(baseOptions?: Apollo.MutationHookOptions<LikeCommentCreateMutation, LikeCommentCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeCommentCreateMutation, LikeCommentCreateMutationVariables>(LikeCommentCreateDocument, options);
      }
export type LikeCommentCreateMutationHookResult = ReturnType<typeof useLikeCommentCreateMutation>;
export type LikeCommentCreateMutationResult = Apollo.MutationResult<LikeCommentCreateMutation>;
export type LikeCommentCreateMutationOptions = Apollo.BaseMutationOptions<LikeCommentCreateMutation, LikeCommentCreateMutationVariables>;
export const LikeCommentDeleteDocument = gql`
    mutation likeCommentDelete($likeId: ID!, $commentId: ID!) {
  likeCommentDelete(likeID: $likeId, commentID: $commentId) {
    like {
      id
    }
    errors {
      message
    }
  }
}
    `;
export type LikeCommentDeleteMutationFn = Apollo.MutationFunction<LikeCommentDeleteMutation, LikeCommentDeleteMutationVariables>;

/**
 * __useLikeCommentDeleteMutation__
 *
 * To run a mutation, you first call `useLikeCommentDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeCommentDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeCommentDeleteMutation, { data, loading, error }] = useLikeCommentDeleteMutation({
 *   variables: {
 *      likeId: // value for 'likeId'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useLikeCommentDeleteMutation(baseOptions?: Apollo.MutationHookOptions<LikeCommentDeleteMutation, LikeCommentDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeCommentDeleteMutation, LikeCommentDeleteMutationVariables>(LikeCommentDeleteDocument, options);
      }
export type LikeCommentDeleteMutationHookResult = ReturnType<typeof useLikeCommentDeleteMutation>;
export type LikeCommentDeleteMutationResult = Apollo.MutationResult<LikeCommentDeleteMutation>;
export type LikeCommentDeleteMutationOptions = Apollo.BaseMutationOptions<LikeCommentDeleteMutation, LikeCommentDeleteMutationVariables>;
export const NotificationMarkAsReadDocument = gql`
    mutation notificationMarkAsRead($notificationId: ID!) {
  notificationMarkAsRead(notificationID: $notificationId) {
    notification {
      ...Notification
    }
  }
}
    ${NotificationFragmentDoc}`;
export type NotificationMarkAsReadMutationFn = Apollo.MutationFunction<NotificationMarkAsReadMutation, NotificationMarkAsReadMutationVariables>;

/**
 * __useNotificationMarkAsReadMutation__
 *
 * To run a mutation, you first call `useNotificationMarkAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotificationMarkAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notificationMarkAsReadMutation, { data, loading, error }] = useNotificationMarkAsReadMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useNotificationMarkAsReadMutation(baseOptions?: Apollo.MutationHookOptions<NotificationMarkAsReadMutation, NotificationMarkAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NotificationMarkAsReadMutation, NotificationMarkAsReadMutationVariables>(NotificationMarkAsReadDocument, options);
      }
export type NotificationMarkAsReadMutationHookResult = ReturnType<typeof useNotificationMarkAsReadMutation>;
export type NotificationMarkAsReadMutationResult = Apollo.MutationResult<NotificationMarkAsReadMutation>;
export type NotificationMarkAsReadMutationOptions = Apollo.BaseMutationOptions<NotificationMarkAsReadMutation, NotificationMarkAsReadMutationVariables>;
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
export const UserLogoutDocument = gql`
    mutation userLogout {
  userLogout
}
    `;
export type UserLogoutMutationFn = Apollo.MutationFunction<UserLogoutMutation, UserLogoutMutationVariables>;

/**
 * __useUserLogoutMutation__
 *
 * To run a mutation, you first call `useUserLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLogoutMutation, { data, loading, error }] = useUserLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useUserLogoutMutation(baseOptions?: Apollo.MutationHookOptions<UserLogoutMutation, UserLogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserLogoutMutation, UserLogoutMutationVariables>(UserLogoutDocument, options);
      }
export type UserLogoutMutationHookResult = ReturnType<typeof useUserLogoutMutation>;
export type UserLogoutMutationResult = Apollo.MutationResult<UserLogoutMutation>;
export type UserLogoutMutationOptions = Apollo.BaseMutationOptions<UserLogoutMutation, UserLogoutMutationVariables>;
export const UserRegisterDocument = gql`
    mutation userRegister($username: String!, $email: String!, $password: String!, $avatarUrl: String) {
  userRegister(
    username: $username
    email: $email
    password: $password
    avatarUrl: $avatarUrl
  ) {
    user {
      id
      username
      avatarUrl
      email
    }
    errors {
      message
    }
  }
}
    `;
export type UserRegisterMutationFn = Apollo.MutationFunction<UserRegisterMutation, UserRegisterMutationVariables>;

/**
 * __useUserRegisterMutation__
 *
 * To run a mutation, you first call `useUserRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userRegisterMutation, { data, loading, error }] = useUserRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      avatarUrl: // value for 'avatarUrl'
 *   },
 * });
 */
export function useUserRegisterMutation(baseOptions?: Apollo.MutationHookOptions<UserRegisterMutation, UserRegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserRegisterMutation, UserRegisterMutationVariables>(UserRegisterDocument, options);
      }
export type UserRegisterMutationHookResult = ReturnType<typeof useUserRegisterMutation>;
export type UserRegisterMutationResult = Apollo.MutationResult<UserRegisterMutation>;
export type UserRegisterMutationOptions = Apollo.BaseMutationOptions<UserRegisterMutation, UserRegisterMutationVariables>;
export const ArtworkDocument = gql`
    query artwork($artworkId: ID!) {
  artwork(artworkID: $artworkId) {
    artwork {
      id
      title
      description
      imageUrls
      createdAt
      likesCount
      uploader {
        id
        username
        avatarUrl
      }
      comments {
        ...Comment
      }
      isLikedByLoggedInUser {
        id
      }
    }
    errors {
      message
    }
  }
}
    ${CommentFragmentDoc}`;

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
export const NotificationsDocument = gql`
    query notifications($skip: Int, $take: Int) {
  notifications(skip: $skip, take: $take) {
    notifications {
      ...Notification
    }
    hasMore
    errors {
      message
    }
  }
}
    ${NotificationFragmentDoc}`;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const TagArtworksDocument = gql`
    query TagArtworks($tagname: String!, $skip: Int, $take: Int) {
  tagArtworks(tagname: $tagname, skip: $skip, take: $take) {
    artworks {
      id
      title
      description
      imageUrls
      likesCount
      createdAt
      isLikedByLoggedInUser {
        id
      }
      uploader {
        id
        username
        avatarUrl
      }
    }
    hasMore
    errors {
      message
    }
  }
}
    `;

/**
 * __useTagArtworksQuery__
 *
 * To run a query within a React component, call `useTagArtworksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagArtworksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagArtworksQuery({
 *   variables: {
 *      tagname: // value for 'tagname'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useTagArtworksQuery(baseOptions: Apollo.QueryHookOptions<TagArtworksQuery, TagArtworksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagArtworksQuery, TagArtworksQueryVariables>(TagArtworksDocument, options);
      }
export function useTagArtworksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagArtworksQuery, TagArtworksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagArtworksQuery, TagArtworksQueryVariables>(TagArtworksDocument, options);
        }
export type TagArtworksQueryHookResult = ReturnType<typeof useTagArtworksQuery>;
export type TagArtworksLazyQueryHookResult = ReturnType<typeof useTagArtworksLazyQuery>;
export type TagArtworksQueryResult = Apollo.QueryResult<TagArtworksQuery, TagArtworksQueryVariables>;
export const UserDocument = gql`
    query user($username: String!) {
  user(username: $username) {
    user {
      id
      username
      avatarUrl
      artworks {
        id
        imageUrls
        likesCount
        title
        description
      }
      isFollowedByLoggedInUser {
        follower {
          id
        }
        following {
          id
        }
      }
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserExploreDocument = gql`
    query userExplore($limit: Int, $cursor: Int) {
  userExplore(limit: $limit, cursor: $cursor) {
    artworks {
      id
      title
      description
      imageUrls
      likesCount
      createdAt
      isLikedByLoggedInUser {
        id
      }
      uploader {
        id
        username
        avatarUrl
      }
    }
    hasMore
    errors {
      message
    }
  }
}
    `;

/**
 * __useUserExploreQuery__
 *
 * To run a query within a React component, call `useUserExploreQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserExploreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserExploreQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useUserExploreQuery(baseOptions?: Apollo.QueryHookOptions<UserExploreQuery, UserExploreQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserExploreQuery, UserExploreQueryVariables>(UserExploreDocument, options);
      }
export function useUserExploreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserExploreQuery, UserExploreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserExploreQuery, UserExploreQueryVariables>(UserExploreDocument, options);
        }
export type UserExploreQueryHookResult = ReturnType<typeof useUserExploreQuery>;
export type UserExploreLazyQueryHookResult = ReturnType<typeof useUserExploreLazyQuery>;
export type UserExploreQueryResult = Apollo.QueryResult<UserExploreQuery, UserExploreQueryVariables>;
export const UserExploreTagsDocument = gql`
    query UserExploreTags {
  userExploreTags {
    tags {
      id
      tagname
    }
    errors {
      message
    }
  }
}
    `;

/**
 * __useUserExploreTagsQuery__
 *
 * To run a query within a React component, call `useUserExploreTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserExploreTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserExploreTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserExploreTagsQuery(baseOptions?: Apollo.QueryHookOptions<UserExploreTagsQuery, UserExploreTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserExploreTagsQuery, UserExploreTagsQueryVariables>(UserExploreTagsDocument, options);
      }
export function useUserExploreTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserExploreTagsQuery, UserExploreTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserExploreTagsQuery, UserExploreTagsQueryVariables>(UserExploreTagsDocument, options);
        }
export type UserExploreTagsQueryHookResult = ReturnType<typeof useUserExploreTagsQuery>;
export type UserExploreTagsLazyQueryHookResult = ReturnType<typeof useUserExploreTagsLazyQuery>;
export type UserExploreTagsQueryResult = Apollo.QueryResult<UserExploreTagsQuery, UserExploreTagsQueryVariables>;
export const UserFeedDocument = gql`
    query userFeed($limit: Int, $cursor: Int) {
  userFeed(limit: $limit, cursor: $cursor) {
    artworks {
      id
      title
      description
      imageUrls
      likesCount
      createdAt
      uploader {
        id
        username
        avatarUrl
      }
      recentComments {
        id
        comment
        commenter {
          id
          username
          avatarUrl
        }
        isLikedByLoggedInUser {
          id
        }
      }
      isLikedByLoggedInUser {
        id
      }
    }
    hasMore
    errors {
      message
    }
  }
}
    `;

/**
 * __useUserFeedQuery__
 *
 * To run a query within a React component, call `useUserFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFeedQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useUserFeedQuery(baseOptions?: Apollo.QueryHookOptions<UserFeedQuery, UserFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFeedQuery, UserFeedQueryVariables>(UserFeedDocument, options);
      }
export function useUserFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFeedQuery, UserFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFeedQuery, UserFeedQueryVariables>(UserFeedDocument, options);
        }
export type UserFeedQueryHookResult = ReturnType<typeof useUserFeedQuery>;
export type UserFeedLazyQueryHookResult = ReturnType<typeof useUserFeedLazyQuery>;
export type UserFeedQueryResult = Apollo.QueryResult<UserFeedQuery, UserFeedQueryVariables>;
export const UserFollowersDocument = gql`
    query userFollowers($username: String!) {
  userFollowers(username: $username) {
    users {
      id
      username
      avatarUrl
    }
    hasMore
    errors {
      message
    }
  }
}
    `;

/**
 * __useUserFollowersQuery__
 *
 * To run a query within a React component, call `useUserFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFollowersQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserFollowersQuery(baseOptions: Apollo.QueryHookOptions<UserFollowersQuery, UserFollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFollowersQuery, UserFollowersQueryVariables>(UserFollowersDocument, options);
      }
export function useUserFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFollowersQuery, UserFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFollowersQuery, UserFollowersQueryVariables>(UserFollowersDocument, options);
        }
export type UserFollowersQueryHookResult = ReturnType<typeof useUserFollowersQuery>;
export type UserFollowersLazyQueryHookResult = ReturnType<typeof useUserFollowersLazyQuery>;
export type UserFollowersQueryResult = Apollo.QueryResult<UserFollowersQuery, UserFollowersQueryVariables>;
export const UserFollowingsDocument = gql`
    query userFollowings($username: String!) {
  userFollowings(username: $username) {
    users {
      id
      username
      avatarUrl
    }
    hasMore
    errors {
      message
    }
  }
}
    `;

/**
 * __useUserFollowingsQuery__
 *
 * To run a query within a React component, call `useUserFollowingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFollowingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFollowingsQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserFollowingsQuery(baseOptions: Apollo.QueryHookOptions<UserFollowingsQuery, UserFollowingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFollowingsQuery, UserFollowingsQueryVariables>(UserFollowingsDocument, options);
      }
export function useUserFollowingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFollowingsQuery, UserFollowingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFollowingsQuery, UserFollowingsQueryVariables>(UserFollowingsDocument, options);
        }
export type UserFollowingsQueryHookResult = ReturnType<typeof useUserFollowingsQuery>;
export type UserFollowingsLazyQueryHookResult = ReturnType<typeof useUserFollowingsLazyQuery>;
export type UserFollowingsQueryResult = Apollo.QueryResult<UserFollowingsQuery, UserFollowingsQueryVariables>;
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
export const NewNotificationDocument = gql`
    subscription newNotification {
  newNotification {
    ...Notification
  }
}
    ${NotificationFragmentDoc}`;

/**
 * __useNewNotificationSubscription__
 *
 * To run a query within a React component, call `useNewNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewNotificationSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewNotificationSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewNotificationSubscription, NewNotificationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewNotificationSubscription, NewNotificationSubscriptionVariables>(NewNotificationDocument, options);
      }
export type NewNotificationSubscriptionHookResult = ReturnType<typeof useNewNotificationSubscription>;
export type NewNotificationSubscriptionResult = Apollo.SubscriptionResult<NewNotificationSubscription>;