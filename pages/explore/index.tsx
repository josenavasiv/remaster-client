import Head from 'next/head';
import { CommonLayout } from '@/components/layout/common-layout';
import { ReactElement, ReactNode } from 'react';
import { useUserExploreTagsQuery, useUserExploreQuery } from '@/graphql/__generated__/graphql';
import GridArtworks from '@/components/common/grid-artworks';
import Tag from '@/components/common/tag';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { MainLayout } from '@/components/layout/main-layout';
import MainContainer from '@/components/common/main-container';

export default function Explore() {
    const {
        data: tags_data,
        loading: tags_loading,
        error: tags_error,
    } = useUserExploreTagsQuery({
        // fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-first',
    });

    const {
        data: artworks_data,
        loading: artworks_loading,
        error: artworks_error,
        fetchMore,
    } = useUserExploreQuery({
        notifyOnNetworkStatusChange: true,
        // fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-first',
    });

    const [sentryRef] = useInfiniteScroll({
        loading: artworks_loading,
        hasNextPage: artworks_data?.userExplore.hasMore ?? true,
        onLoadMore: () =>
            fetchMore({
                variables: {
                    limit: 10,
                    ...(artworks_data?.userExplore.artworks && {
                        cursor: parseInt(
                            artworks_data.userExplore.artworks[artworks_data.userExplore.artworks.length - 1].id
                        ),
                    }),
                },
            }),
        // When there is an error, we stop infinite loading.
        // It can be reactivated by setting "error" state as undefined.
        disabled: !!artworks_error,
        // `rootMargin` is passed to `IntersectionObserver`.
        // We can use it to trigger 'onLoadMore' when the sentry comes near to become
        // visible, instead of becoming fully visible on the screen.
        rootMargin: '0px 0px 400px 0px',
    });

    return (
        <>
            <Head>
                <title>Explore</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainContainer>
                {!artworks_data && artworks_loading && <div>EXPLORE ARTWORKS LOADING</div>}
                {!tags_data && tags_loading && <div>EXPLORE TAGS LOADING</div>}
                {tags_data?.userExploreTags.tags && !tags_error && (
                    <div className="flex flex-wrap gap-1 w-full mb-5 text-[#334970]">
                        {tags_data?.userExploreTags.tags.map((tag) => (
                            <Tag key={tag.tagname} id={tag.id} tagname={tag.tagname} />
                        ))}
                    </div>
                )}
                {artworks_data?.userExplore.artworks && !artworks_error && (
                    <>
                        <GridArtworks artworks={artworks_data.userExplore.artworks} />
                    </>
                )}
                {/* Eventually will be moved into an infinite scroll component */}
                {artworks_data && artworks_data?.userExplore.hasMore && (
                    <button
                        ref={sentryRef}
                        className="w-26 mx-auto font-bold text-black bg-pink-300 px-2 py-1 mb-2 rounded-md invisible"
                        onClick={() => {
                            fetchMore({
                                variables: {
                                    limit: 10,
                                    cursor: parseInt(
                                        artworks_data.userExplore.artworks[
                                            artworks_data.userExplore.artworks.length - 1
                                        ].id
                                    ),
                                },
                            });
                        }}
                    >
                        Explore More Artworks
                    </button>
                )}
            </MainContainer>
        </>
    );
}

Explore.getLayout = (page: ReactElement): ReactNode => (
    <CommonLayout>
        <MainLayout>{page}</MainLayout>
    </CommonLayout>
);
