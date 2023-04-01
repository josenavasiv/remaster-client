import {
    NotificationFragmentDoc,
    useNotificationMarkAsReadMutation,
    NotificationFragment,
} from '@/graphql/__generated__/graphql';

type NotificationMarkAsReadProps = {
    notificationId: string;
};

export default function NotificationMarkAsRead({ notificationId }: NotificationMarkAsReadProps) {
    const [notificationMarkAsRead, {}] = useNotificationMarkAsReadMutation();

    const handleMarkAsRead = async (): Promise<void> => {
        try {
            const response = await notificationMarkAsRead({
                variables: { notificationId },
                update: (cache, { data }) => {
                    if (data?.notificationMarkAsRead?.notification?.id) {
                        const notificationsData = cache.readFragment<NotificationFragment>({
                            id: 'Notification:' + notificationId,
                            fragment: NotificationFragmentDoc,
                        });

                        cache.writeFragment<NotificationFragment>({
                            id: 'Notification:' + notificationId,
                            fragment: NotificationFragmentDoc,
                            data: {
                                ...notificationsData!,
                                isRead: true,
                            },
                        });
                    }
                },
                // refetchQueries: ['artwork'],
            });
        } catch (error) {
            console.log(error);
        }
    };

    return <button onClick={handleMarkAsRead}>Mark As Read</button>;
}
