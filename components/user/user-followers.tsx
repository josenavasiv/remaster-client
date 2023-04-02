import { useUserFollowersQuery } from '@/graphql/__generated__/graphql';
import Link from 'next/link';
import Image from 'next/image';
import useInfiniteScroll from 'react-infinite-scroll-hook';

type UserFollowersProps = {
    username: string;
};

export default function UserFollowers({ username }: UserFollowersProps) {
    const { data, loading, error, fetchMore } = useUserFollowersQuery({
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-first',
        variables: { username },
    });

    const [sentryRef] = useInfiniteScroll({
        loading,
        hasNextPage: data?.userFollowers.hasMore ?? true,
        onLoadMore: () =>
            fetchMore({
                variables: {
                    take: 10,
                    ...(data?.userFollowers.users && {
                        skip: data?.userFollowers.users.length,
                    }),
                },
            }),
        // When there is an error, we stop infinite loading.
        // It can be reactivated by setting "error" state as undefined.
        disabled: !!error,
        // `rootMargin` is passed to `IntersectionObserver`.
        // We can use it to trigger 'onLoadMore' when the sentry comes near to become
        // visible, instead of becoming fully visible on the screen.
        rootMargin: '0px 0px 400px 0px',
    });

    if (!data || error) return null;

    return (
        <div className="w-full flex flex-col gap-3">
            {data.userFollowers.users.map((user) => (
                <div key={user.username} className="w-full">
                    <Link href={`/user/${user.username}`}>
                        <div className={`flex gap-2 h-16 rounded-lg bg-slate-300`}>
                            <div className="w-16 self-center">
                                <Image
                                    src={user.avatarUrl}
                                    alt={user.avatarUrl}
                                    height={34}
                                    width={34}
                                    className="rounded-full aspect-square object-cover ml-3"
                                />
                            </div>
                            <div className="self-center w-full pr-3">
                                <span className="font-bold">{user.username}</span>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
            {data.userFollowers.hasMore && (
                <button
                    ref={sentryRef}
                    className="w-26 mx-auto font-bold text-black bg-pink-300 px-2 py-1 rounded-md invisible"
                    onClick={() => {
                        fetchMore({
                            variables: {
                                take: 10,
                                skip: data.userFollowers.users.length,
                            },
                        });
                    }}
                >
                    Load More Notifications
                </button>
            )}
        </div>
    );
}
