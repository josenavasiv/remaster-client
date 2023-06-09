import React from 'react';
import GridArtworks from '../common/grid-artworks';
import { useArtworkUploaderOtherArtworksQuery } from '@/graphql/__generated__/graphql';

type ArtworkDetailsOtherArtworksProps = {
    artworkId: string;
};

const ArtworkDetailsOtherArtworks = ({ artworkId }: ArtworkDetailsOtherArtworksProps) => {
    const { data, loading, error } = useArtworkUploaderOtherArtworksQuery({
        variables: { artworkId: artworkId as string, take: 6 },
        fetchPolicy: 'cache-and-network',
    });

    if (!data && loading) return <div>loading other artworks...</div>;

    if (error) console.log(error);

    if (data && !error) return <GridArtworks artworks={data?.artworkUploaderOtherArtworks.artworks} />;

    return null;
};

export default ArtworkDetailsOtherArtworks;
