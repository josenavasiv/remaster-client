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
import ArtworkDelete from './artwork-delete';
import ArtworkEdit from './artwork-edit';

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
                        <div className="flex gap-2">
                            {isLikedByLoggedInUser == null ? (
                                <ArtworkLike artworkId={id} uploaderId={uploader.id} />
                            ) : (
                                <ArtworkUnlike
                                    artworkId={id}
                                    likeId={isLikedByLoggedInUser.id}
                                    uploaderId={uploader.id}
                                />
                            )}
                            <ArtworkEdit
                                artworkId={id}
                                uploaderId={uploader.id}
                                title={title}
                                description={description}
                                imageUrls={imageUrls}
                            />
                            <ArtworkDelete artworkId={id} uploaderId={uploader.id} />
                        </div>
                    </div>

                    <span className="font-extrabold text-xl">{title}</span>
                    <ArtworkDescription username={uploader.username} description={description} />
                    <div className="flex gap-3">
                        <span className="text-xs font-bold text-black/60">{getRelativeDate(createdAt)}</span>
                        <span className="text-xs font-bold text-black/60">{likesCount} likes</span>
                    </div>

                    <ArtworkDetailsComments comments={comments} artworkId={id} />
                    <CommentInput artworkId={id} />
                </div>
            </div>
            <div className="">OTHER ARTWORKS BY THE UPLOADER</div>
        </div>
    );
}
