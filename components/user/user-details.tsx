import React from 'react';
import { User } from '@/graphql/__generated__/graphql';
import Image from 'next/image';

// type UserDetailsProps = Pick<User, 'username' | 'isFollowedByLoggedInUser' | 'avatarUrl'>;

type UserDetailsTypes = {
    username: string;
    isFollowedByLoggedInUser: boolean | null | undefined;
    avatarUrl: string;
};

export default function UserDetails({ username, isFollowedByLoggedInUser, avatarUrl }: UserDetailsTypes) {
    return (
        <div className="flex flex-col mx-auto gap-3 mb-5">
            <Image
                src={avatarUrl}
                width={150}
                height={150}
                alt={`${username}'s Avatar`}
                className="rounded-full m-auto aspect-square"
            />
            <div className="flex gap-2">
                <span className="font-bold">{username}</span>
                {isFollowedByLoggedInUser == null ? <span>CANT FOLLOW OWN</span> : <span>NOT FOLLOWING</span>}
            </div>
        </div>
    );
}
