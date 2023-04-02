import React from 'react';
import Image from 'next/image';
import UserModal from './user-modal';
import UserFollow from './user-follow';
import UserUnfollow from './user-unfollow';

type UserDetailsTypes = {
    id: string;
    username: string;
    isFollowedByLoggedInUser: FollowType | null | undefined;
    avatarUrl: string;
};

type FollowType = {
    follower: {
        id: string;
    };
    following: {
        id: string;
    };
};

export default function UserDetails({ id, username, isFollowedByLoggedInUser, avatarUrl }: UserDetailsTypes) {
    return (
        <div className="flex flex-col mx-auto gap-3 mb-5">
            <Image
                src={avatarUrl}
                width={150}
                height={150}
                alt={`${username}'s Avatar`}
                className="rounded-full m-auto aspect-square object-cover"
                priority
            />
            <span className="font-bold self-center">{username}</span>
            <div className="flex gap-2 self-center">
                <UserModal username={username} />
                {isFollowedByLoggedInUser == null ? <UserFollow userId={id} /> : <UserUnfollow userId={id} />}
            </div>
        </div>
    );
}
