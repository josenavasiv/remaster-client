import React from 'react';
import ArtworkUploader from './artwork-uploader';
import ArtworkDetailsComments from './artwork-details-comments';
import { getRelativeDate } from '@/lib/relativeTime';
import { CommentType } from './artwork-comment';
import ArtworkCarousel from './artwork-carousel';
import ArtworkDescription from './artwork-description';
import CommentInput from '../comment/comment-input';
import { LikeType } from './artwork-feed';
import ArtworkLike from './artwork-like';
import ArtworkUnlike from './artwork-unlike';

type ArtworkDetailsProps = {
    id: string;
    title: string;
    description: string;
    imageUrls: string[];
    createdAt: string;
    likesCount: number;
    isLikedByLoggedInUser?: LikeType | null | undefined;
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
            <div className="flex flex-col lg:flex-row gap-3 mb-5">
                <ArtworkCarousel imageUrls={imageUrls} />
                <div className="flex flex-col gap-2 lg:w-96 max-w-[350px] h-[526px]">
                    <div className="flex justify-between">
                        <ArtworkUploader {...uploader} />
                        <div className="self-center">
                            {isLikedByLoggedInUser == null ? (
                                <ArtworkLike artworkId={id} uploaderId={uploader.id} />
                            ) : (
                                <ArtworkUnlike
                                    artworkId={id}
                                    likeId={isLikedByLoggedInUser.id}
                                    uploaderId={uploader.id}
                                />
                            )}
                        </div>
                    </div>

                    <span className="font-extrabold text-lg">{title}</span>
                    <ArtworkDescription description={description} />
                    <span className="text-xs font-bold text-black/60">{getRelativeDate(createdAt)}</span>
                    <ArtworkDetailsComments comments={comments} />
                    <CommentInput artworkId={id} />
                </div>
            </div>
            <div className="">OTHER ARTWORKS BY THE UPLOADER</div>
        </div>
    );
}
