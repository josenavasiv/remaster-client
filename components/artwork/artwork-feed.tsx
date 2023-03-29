import ArtworkUploader from './artwork-uploader';
import ArtworkDescription from './artwork-description';
import ArtworkCarousel from './artwork-carousel';
import { getRelativeDate } from '@/lib/relativeTime';
import ArtworkFeedRecentComments from './artwork-feed-recent-comments';
import ArtworkLike from './artwork-like';
import ArtworkUnlike from './artwork-unlike';
import ArtworkFeedTitle from './artwork-feed-title';
import ArtworkFeedComment from './artwork-feed-comment';

type ArtworkFeedProps = {
    id: string;
    title: string;
    description: string;
    imageUrls: string[];
    isLikedByLoggedInUser?: LikeType | null | undefined;
    likesCount: number;
    createdAt: string;
    uploader: {
        id: string;
        username: string;
        avatarUrl: string;
    };
    recentComments: RecentCommentType[];
};

export type RecentCommentType = {
    id: string;
    comment: string;
    isLikedByLoggedInUser?: LikeType | null | undefined;
    commenter: {
        id: string;
        username: string;
        avatarUrl: string;
    };
};

export type LikeType = {
    id: string;
};

export default function ArtworkFeed({
    id,
    imageUrls,
    title,
    description,
    uploader,
    recentComments,
    isLikedByLoggedInUser,
    likesCount,
    createdAt,
}: ArtworkFeedProps) {
    return (
        <div className="w-[350px] mx-auto mb-7 ">
            <ArtworkUploader {...uploader} />
            <div className="mt-2">
                <div className="flex flex-col gap-1 h-full">
                    <ArtworkFeedTitle id={id} title={title} />
                    <ArtworkCarousel imageUrls={imageUrls} />
                    <div className="flex gap-2">
                        {isLikedByLoggedInUser == null ? (
                            <ArtworkLike artworkId={id} uploaderId={uploader.id} />
                        ) : (
                            <ArtworkUnlike artworkId={id} likeId={isLikedByLoggedInUser.id} uploaderId={uploader.id} />
                        )}
                        <ArtworkFeedComment id={id} />
                    </div>
                    <ArtworkDescription username={uploader.username} description={description} />
                    <ArtworkFeedRecentComments recentComments={recentComments} />

                    <div className="flex justify-between font-extrabold text-xs ">
                        <p>{likesCount ?? 'N/A'} Likes</p>
                        <p>{getRelativeDate(createdAt) ?? 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
