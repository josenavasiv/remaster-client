import React from 'react';
import { LikeType } from './artwork-feed';
import ArtworkFeedComment from './artwork-feed-comment';
import ArtworkLike from './artwork-like';
import ArtworkUnlike from './artwork-unlike';
import ArtworkDelete from './artwork-delete';
import ArtworkEdit from './artwork-edit';

type ArtworkFeedOptionsProps = {
    artworkId: string;
    uploaderId: string;
    title: string;
    description: string;
    imageUrls: string[];
    isLikedByLoggedInUser?: LikeType | null | undefined;
};

export default function ArtworkFeedOptions({
    artworkId,
    uploaderId,
    isLikedByLoggedInUser,
    title,
    description,
    imageUrls,
}: ArtworkFeedOptionsProps) {
    return (
        <div className="flex gap-2">
            {isLikedByLoggedInUser == null ? (
                <ArtworkLike artworkId={artworkId} uploaderId={uploaderId} />
            ) : (
                <ArtworkUnlike artworkId={artworkId} likeId={isLikedByLoggedInUser.id} uploaderId={uploaderId} />
            )}
            <ArtworkFeedComment artworkId={artworkId} />
            <ArtworkEdit
                artworkId={artworkId}
                uploaderId={uploaderId}
                title={title}
                description={description}
                imageUrls={imageUrls}
            />
            <ArtworkDelete artworkId={artworkId} uploaderId={uploaderId} />
        </div>
    );
}
