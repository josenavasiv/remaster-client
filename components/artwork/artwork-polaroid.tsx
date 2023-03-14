import ArtworkUploader from './artwork-uploader';
import ArtworkImageCarousel from './artwork-image-carousel';
import { Artwork, User } from '@/graphql/__generated__/graphql';

export type ArtworkPolaroidProps = Pick<
    Artwork,
    'id' | 'imageUrls' | 'title' | 'description' | 'isLikedByLoggedInUser' | 'likesCount' | 'createdAt'
> & {
    uploader: Pick<User, 'id' | 'username' | 'avatarUrl'>;
};

export default function ArtworkPolaroid({
    id,
    imageUrls,
    title,
    description,
    uploader,
    // topComment,
    isLikedByLoggedInUser,
    likesCount,
    createdAt,
}: ArtworkPolaroidProps) {
    return (
        <div className="bg-slate-100">
            <ArtworkUploader {...uploader} />
            {/* Polaroid */}
            <div className="flex flex-col">
                <ArtworkImageCarousel imageUrls={imageUrls} />
                <p>{id}</p>
                <p>{title}</p>
                <p>{description}</p>
                {/* <p>{topComment?.comment}</p> */}
                <p>"Top Comment"</p>
                <div className="">
                    <p>{likesCount ?? 'N/A'}</p>
                    <p>{createdAt ?? 'N/A'}</p>
                </div>
            </div>
        </div>
    );
}
