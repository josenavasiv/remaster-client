import ArtworkUploader from './artwork-uploader';
import ArtworkCarouselImage from './artwork-carousel-image';
import ArtworkDescription from './artwork-description';
// import { Artwork, User, Comment } from '@/graphql/__generated__/graphql';
import { getRelativeDate } from '@/lib/relativeTime';

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
    isLikedByLoggedInUser?: boolean | null | undefined;
    likesCount: number;
    createdAt: string;
    uploader: {
        id: string;
        username: string;
        avatarUrl: string;
    };
    recentComments: {
        id: string;
        comment: string;
        isLikedByLoggedInUser?: boolean | null | undefined;
        commenter: {
            id: string;
            username: string;
            avatarUrl: string;
        };
    }[];
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
        <div className="w-[350px] mx-auto mb-7">
            <ArtworkUploader {...uploader} />
            <div className="mt-2">
                <div className="flex flex-col gap-1 h-full">
                    <span className="font-extrabold">{title}</span>
                    <ArtworkCarouselImage imageUrls={imageUrls} />
                    <ArtworkDescription description={description} />
                    <p>{recentComments.length > 0 ? 'RECENT COMMENTS' : 'N/A'}</p>
                    <div className="font-extrabold text-xs">
                        <p>{likesCount ?? 'N/A'} Likes</p>
                        <p>{getRelativeDate(createdAt) ?? 'N/A'}</p>
                        <p>{isLikedByLoggedInUser == null ? <span>CANT LIKE OWN</span> : <span>NOT LIKED</span>}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
