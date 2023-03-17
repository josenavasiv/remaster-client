import Head from 'next/head';
import { useUserFeedQuery } from '@/graphql/__generated__/graphql';
import { CommonLayout } from '@/components/layout/common-layout';
import { HomeLayout } from '@/components/layout/home-layout';
import { ReactElement, ReactNode } from 'react';
import HomeMainFeedContainer from '@/components/home/home-main-feed-container';
import { toast } from 'react-hot-toast';
import ArtworkFeed from '@/components/artwork/artwork-feed';

export default function Home() {
    const { data, loading, error, fetchMore } = useUserFeedQuery({ notifyOnNetworkStatusChange: true });
    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomeMainFeedContainer>
                {!data && loading && <div>ARTWORKS LOADING</div>}
                {data?.userFeed.artworks &&
                    !error &&
                    data?.userFeed.artworks.map((artwork) => (
                        <ArtworkFeed
                            key={artwork.id}
                            title={artwork.title}
                            id={artwork.id}
                            imageUrls={artwork.imageUrls}
                            description={artwork.description}
                            likesCount={artwork.likesCount}
                            createdAt={artwork.createdAt}
                            uploader={artwork.uploader}
                            topComment={artwork.topComment!}
                        />
                    ))}
                {/* Eventually will be moved into an infinite scroll component */}
                {data && data?.userFeed.hasMore && (
                    <button
                        className="w-26 mx-auto text-pink-500 bg-black px-2 py-1 rounded-md"
                        onClick={() => {
                            fetchMore({
                                variables: {
                                    limit: 10,
                                    cursor: parseInt(data.userFeed.artworks[data.userFeed.artworks.length - 1].id),
                                },
                            });
                        }}
                    >
                        Load More Posts
                    </button>
                )}
            </HomeMainFeedContainer>
        </>
    );
}

Home.getLayout = (page: ReactElement): ReactNode => (
    <CommonLayout>
        <HomeLayout>{page}</HomeLayout>
    </CommonLayout>
);
