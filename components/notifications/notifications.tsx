import {
    useNotificationsQuery,
    useNewNotificationSubscription,
    Notification,
    NotificationType,
} from '@/graphql/__generated__/graphql';
import toast from 'react-hot-toast';

type NotificationsProps = {};

// Need to break apart into a render functions and fragment the type
const notificationToaster = (noti: any): void => {
    switch (noti.notificationType) {
        case NotificationType.Liked:
            toast.custom((t) => (
                <div
                    className={`${
                        t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={noti.notifier.avatarUrl}
                                    alt=""
                                />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">{noti.notifier.username}</p>
                                <p className="mt-1 text-sm text-gray-500">LIKED YOUR ARTWORK</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ));
            break;
        case NotificationType.Commented:
            toast.success('COMMENTED');
            break;
        case NotificationType.Replied:
            toast.success('REPLIED');
            break;
        case NotificationType.Uploaded:
            toast.success('UPLOADED');
            break;
        case NotificationType.Tagged:
            toast.success('TAGGED');
            break;
        default:
            break;
    }
    return;
};

export default function Notifications({}: NotificationsProps) {
    const { data, loading, error, refetch } = useNotificationsQuery();
    // Only run subscription if user is logged-in
    const {} = useNewNotificationSubscription({
        onData: ({ data, client }) => {
            if (data.data?.newNotification) {
                notificationToaster(data.data?.newNotification);
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

    return (
        <span className="relative self-center sm:self-auto">
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

            <span className="absolute top-1.5 left-3.5 sm:top-0 sm:left-14 font-black">
                {data?.notifications?.notifications?.length ?? 0}
            </span>
        </span>
    );
}
