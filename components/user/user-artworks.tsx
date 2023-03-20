import { Artwork } from '@/graphql/__generated__/graphql';
import Image from 'next/image';
import Link from 'next/link';

type UserArtworkProps = {
    artworks: Pick<Artwork, 'id' | 'imageUrls' | 'likesCount' | 'description' | 'title'>[];
};

export default function UserArtworks({ artworks }: UserArtworkProps) {
    return (
        <div className="grid grid-cols-3 w-full gap-1 pb-20">
            {artworks.map((artwork) => (
                <Link key={artwork.id} href={`/artwork/${artwork.id}`}>
                    <div className="relative w-full aspect-square">
                        <Image src={artwork.imageUrls[0]} fill={true} alt={artwork.title} className="object-cover " />
                    </div>
                </Link>
            ))}
        </div>
    );
}
