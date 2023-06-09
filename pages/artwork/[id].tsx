import Head from 'next/head';
import { CommonLayout } from '@/components/layout/common-layout';
import { ReactElement, ReactNode } from 'react';
import ArtworkDetails from '@/components/artwork/artwork-details';
import { useRouter } from 'next/router';
import { useArtworkQuery } from '@/graphql/__generated__/graphql';
import { MainLayout } from '@/components/layout/main-layout';
import MainContainer from '@/components/common/main-container';

export default function Artwork() {
    const router = useRouter();
    const { id } = router.query;
    const { data, loading, error } = useArtworkQuery({
        variables: { artworkId: id as string },
        fetchPolicy: 'cache-and-network',
    });

    return (
        <>
            <Head>
                <title>{id}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainContainer>
                {!data && loading && <div>ARTWORK LOADING</div>}
                {data?.artwork.artwork && !error && (
                    <ArtworkDetails
                        id={data.artwork.artwork.id}
                        title={data.artwork.artwork.title}
                        description={data.artwork.artwork.description}
                        imageUrls={data.artwork.artwork.imageUrls}
                        createdAt={data.artwork.artwork.createdAt}
                        likesCount={data.artwork.artwork.likesCount}
                        isLikedByLoggedInUser={data.artwork.artwork.isLikedByLoggedInUser}
                        uploader={data.artwork.artwork.uploader}
                        comments={data.artwork.artwork.comments}
                        errors={data.artwork.errors}
                    />
                )}
            </MainContainer>
        </>
    );
}

Artwork.getLayout = (page: ReactElement): ReactNode => (
    <CommonLayout>
        <MainLayout>{page}</MainLayout>
    </CommonLayout>
);
