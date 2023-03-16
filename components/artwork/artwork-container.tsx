import ArtworkUploader from './artwork-uploader';
import ArtworkImageCarousel from './artwork-image-carousel';
import ArtworkDescription from './artwork-description';
import { Artwork, User, Comment } from '@/graphql/__generated__/graphql';
import { getRelativeDate } from '@/lib/relativeTime';

export type ArtworkContainerProps = Pick<
    Artwork,
    'id' | 'imageUrls' | 'title' | 'description' | 'isLikedByLoggedInUser' | 'likesCount' | 'createdAt'
> & {
    uploader: Pick<User, 'id' | 'username' | 'avatarUrl'>;
} & {
    topComment: Pick<Comment, 'id' | 'comment'>;
};

export default function ArtworkContainer({
    id,
    imageUrls,
    title,
    description,
    uploader,
    topComment,
    isLikedByLoggedInUser,
    likesCount,
    createdAt,
}: ArtworkContainerProps) {
    return (
        <div className="w-[350px] mx-auto mb-7">
            <ArtworkUploader {...uploader} />
            <div className="mt-2">
                <div className="flex flex-col gap-1 h-full">
                    <span className="font-extrabold">{title}</span>
                    <ArtworkImageCarousel imageUrls={imageUrls} />
                    <ArtworkDescription description={description} />
                    <p>{topComment?.comment ?? 'Top Comment N/A'}</p>
                    <div className="font-extrabold text-xs">
                        <p>{likesCount ?? 'N/A'} Likes</p>
                        <p>{getRelativeDate(createdAt) ?? 'N/A'}</p>
                        <p>{isLikedByLoggedInUser ? 'TRUE' : 'FALSE'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
