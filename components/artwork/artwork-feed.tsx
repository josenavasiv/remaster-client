import ArtworkUploader from './artwork-uploader';
import ArtworkDescription from './artwork-description';
import ArtworkCarousel from './artwork-carousel';
// import { Artwork, User, Comment } from '@/graphql/__generated__/graphql';
import { getRelativeDate } from '@/lib/relativeTime';
import ArtworkFeedRecentComments from './artwork-feed-recent-comments';
import Link from 'next/link';
// export type ArtworkFeedProps = Pick<
//     Artwork,
//     'id' | 'imageUrls' | 'title' | 'description' | 'isLikedByLoggedInUser' | 'likesCount' | 'createdAt'
// > & {
//     uploader: Pick<User, 'id' | 'username' | 'avatarUrl'>;
// } & {
//     topComment: Pick<Comment, 'id' | 'comment'>;
// };

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
                    <span className="font-extrabold text-lg">{title}</span>
                    <ArtworkCarousel imageUrls={imageUrls} />
                    <div className="font-extrabold text-xs">
                        <p>{likesCount ?? 'N/A'} Likes</p>
                        <p>{getRelativeDate(createdAt) ?? 'N/A'}</p>
                        <p>{isLikedByLoggedInUser == null ? <span>CANT LIKE OWN</span> : <span>NOT LIKED</span>}</p>
                    </div>
                    <ArtworkDescription description={description} />
                    <ArtworkFeedRecentComments recentComments={recentComments} />
                    <div>
                        <Link className="text-pink-400" href={`/artwork/${id}`}>
                            Add a comment!
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
