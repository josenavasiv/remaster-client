import {
    useNotificationsQuery,
    useNewNotificationSubscription,
    NotificationFragment,
} from '@/graphql/__generated__/graphql';
import { useModal } from '@/lib/hooks/useModal';
import Modal from '../modal/modal';
import Notification from './notification';
import NotificationToaster from '@/lib/notifications/NotificationToaster';
import useInfiniteScroll from 'react-infinite-scroll-hook';

type NotificationsProps = {};

export default function Notifications({}: NotificationsProps) {
    const { isOpen, openModal, closeModal } = useModal();
    const { data, loading, error, refetch, fetchMore } = useNotificationsQuery({
        notifyOnNetworkStatusChange: true,
        // fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-first',
    });
    // Only run subscription if user is logged-in
    const {} = useNewNotificationSubscription({
        onData: ({ data, client }) => {
            if (data.data?.newNotification) {
                NotificationToaster(data.data?.newNotification);
            }
            refetch(); // TEMPORARY
            // // Need to update the cache
            // const notis = client.readQuery<NotificationsQuery>({
            //     query: NotificationsDocument,
            // });
            // console.log('NOTIS');
            // console.log(notis);

            // client.writeQuery({
            //     query: NotificationsDocument,
            //     data: {
            //         ...notis,
            //         notifications: {
            //             notifications: [data.data?.newNotification!, ...notis?.notifications.notifications!],
            //         },
            //     },
            // });
        },
    });

    const unreadNotifications = (notifications: NotificationFragment[] | null | undefined): string | null => {
        if (!notifications) return null;
        let unreadNum = 0;
        notifications.forEach((notification) => {
            if (!notification.isRead) unreadNum++;
        });

        return `${unreadNum}`;
        // return unreadNum > 10 ? '10' : `${unreadNum}`;
    };

    const [sentryRef] = useInfiniteScroll({
        loading,
        hasNextPage: data?.notifications.hasMore ?? true,
        onLoadMore: () =>
            fetchMore({
                variables: {
                    take: 10,
                    ...(data?.notifications.notifications && {
                        skip: data.notifications.notifications.length,
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

    return (
        <>
            <button
                className="relative self-center sm:self-auto pointer-events-auto text-[#334970]"
                onClick={openModal}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-[36px] sm:mx-auto self-center"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                </svg>
                {Number(unreadNotifications(data?.notifications?.notifications)) > 0 && (
                    <span className="absolute -top-1 left-[29.5px] sm:-top-1 sm:left-[51.5px] text-[12px] font-bold z-10 bg-pink-500 rounded-full w-5 h-5">
                        {unreadNotifications(data?.notifications?.notifications)}
                    </span>
                )}
            </button>
            <Modal isOpen={isOpen} closeModal={closeModal}>
                <div className="w-[350px] h-[440px] bg-gray-200 p-5 rounded-xl flex flex-col">
                    <span className="text-center font-bold pb-2">Notifications</span>
                    <div className="flex flex-col h-full w-full overflow-y-scroll gap-3 text-xs no-scrollbar">
                        {data?.notifications.notifications.map((notification) => (
                            <Notification key={notification.id} notification={notification} />
                        ))}

                        {/* Eventually will be moved into an infinite scroll component */}
                        {data && data?.notifications.hasMore && (
                            <button
                                ref={sentryRef}
                                className="w-26 mx-auto font-bold text-black bg-pink-300 px-2 py-1 rounded-md invisible"
                                onClick={() => {
                                    fetchMore({
                                        variables: {
                                            take: 10,
                                            skip: data.notifications.notifications.length,
                                        },
                                    });
                                }}
                            >
                                Load More Notifications
                            </button>
                        )}
                    </div>
                    {/* Eventually will be moved into an infinite scroll component */}
                </div>
            </Modal>
        </>
    );
}
