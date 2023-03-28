import { Artwork } from '@/graphql/__generated__/graphql';
import GridArtworks from '../common/grid-artworks';

type UserArtworkProps = {
    artworks: Pick<Artwork, 'id' | 'imageUrls' | 'likesCount' | 'description' | 'title'>[];
};

export default function UserArtworks({ artworks }: UserArtworkProps) {
    return <GridArtworks artworks={artworks} />;
}
