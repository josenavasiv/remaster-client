import React from 'react';
import ArtworkCarouselImage from './artwork-carousel-image';
import ArtworkUploader from './artwork-uploader';
import ArtworkDetailsComments from './artwork-details-comments';
import { getRelativeDate } from '@/lib/relativeTime';

type ArtworkDetailsProps = {
    id: string;
    title: string;
    description: string;
    imageUrls: string[];
    createdAt: string;
    likesCount: number;
    isLikedByLoggedInUser?: boolean | null | undefined;
    comments: CommentType[];
    uploader: {
        id: string;
        username: string;
        avatarUrl: string;
    };
    errors?: {
        message: string;
    }[];
};

export type CommentType = {
    id: string;
    comment: string;
    likesCount: number;
    isLikedByLoggedInUser?: boolean | null | undefined;
    commenter: {
        id: string;
        username: string;
        avatarUrl: string;
    };
    replies: ReplyType[];
    createdAt: string;
    updatedAt: string;
};

export type ReplyType = {
    id: string;
    comment: string;
    commenter: {
        id: string;
        username: string;
        avatarUrl: string;
    };
    parentCommentId?: string | null | undefined;
    isLikedByLoggedInUser?: boolean | null | undefined;
    likesCount: number;
    createdAt: string;
    updatedAt: string;
};

export default function ArtworkDetails({
    id,
    title,
    description,
    imageUrls,
    createdAt,
    likesCount,
    isLikedByLoggedInUser,
    uploader,
    comments,
    errors,
}: ArtworkDetailsProps) {
    return (
        <div className="flex flex-col mx-auto">
            <div className="flex flex-col lg:flex-row gap-3 mb-5 ">
                <ArtworkCarouselImage imageUrls={imageUrls} />
                <div className="flex flex-col gap-2 lg:w-96">
                    <ArtworkUploader {...uploader} />
                    <span className="font-bold">{title}</span>
                    <span className="">{description}</span>
                    <span className="">{getRelativeDate(createdAt)}</span>
                    <ArtworkDetailsComments comments={comments} />
                    {isLikedByLoggedInUser ? <span>FOLLOWING</span> : <span>NOT FOLLOWING</span>}
                </div>
            </div>
            <div className="">OTHER ARTWORKS BY THE UPLOADER</div>
        </div>
    );
}
