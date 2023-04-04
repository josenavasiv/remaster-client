import { useUserLikesQuery } from '@/graphql/__generated__/graphql';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import GridArtworks from '../common/grid-artworks';

type UserLikesProps = {
    username: string;
};

export default function UserLikes({ username }: UserLikesProps) {
    const { data, loading, error, fetchMore } = useUserLikesQuery({
        variables: { username },
        // fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-first',
    });

    const [sentryRef] = useInfiniteScroll({
        loading,
        hasNextPage: data?.userLikes.hasMore ?? true,
        onLoadMore: () =>
            fetchMore({
                variables: {
                    take: 10,
                    skip: data?.userLikes.artworks.length,
                },
            }),
        disabled: !!error,
        rootMargin: '0px 0px 400px 0px',
    });

    if (data?.userLikes && !error) {
        return (
            <>
                <GridArtworks artworks={data?.userLikes.artworks} />
                {data?.userLikes.hasMore && (
                    <button
                        ref={sentryRef}
                        className="w-26 mx-auto font-bold text-black bg-pink-300 px-2 py-1 rounded-md "
                        onClick={() => {
                            fetchMore({
                                variables: {
                                    take: 10,
                                    skip: data.userLikes.artworks.length,
                                },
                            });
                        }}
                    >
                        Load More Likes
                    </button>
                )}
            </>
        );
    }

    return null;
}
