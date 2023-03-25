import React from 'react';
import ArtworkUploader from './artwork-uploader';
import ArtworkDetailsComments from './artwork-details-comments';
import { getRelativeDate } from '@/lib/relativeTime';
import { CommentType } from './artwork-comment';
import ArtworkCarousel from './artwork-carousel';
import ArtworkDescription from './artwork-description';

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
        <div className="flex flex-col mx-auto pb-20">
            <div className="flex flex-col lg:flex-row gap-3 mb-5 ">
                <ArtworkCarousel imageUrls={imageUrls} />
                <div className="flex flex-col gap-2 lg:w-96 max-w-[350px]">
                    <ArtworkUploader {...uploader} />
                    <span className="font-extrabold">{title}</span>
                    <ArtworkDescription description={description} />
                    <span className="">{getRelativeDate(createdAt)}</span>
                    <ArtworkDetailsComments comments={comments} />
                    <p>{isLikedByLoggedInUser == null ? <span>CANT LIKE OWN</span> : <span>NOT LIKED</span>}</p>
                </div>
            </div>
            <div className="">OTHER ARTWORKS BY THE UPLOADER</div>
        </div>
    );
}
