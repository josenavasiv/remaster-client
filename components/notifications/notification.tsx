import { NotificationFragment, NotificationType } from '@/graphql/__generated__/graphql';
import NotificationNotifier from './notification-notifier';
import Link from 'next/link';
import { getRelativeDate } from '@/lib/relativeTime';
import NotificationMarkAsRead from './notification-mark-as-read';

type NotificationProps = {
    notification: NotificationFragment;
};

export const notificationFormat = (notification: NotificationFragment): JSX.Element => {
    switch (notification.notificationType) {
        case NotificationType.Liked:
            if (notification.comment)
                return (
                    <span>
                        liked your comment <span className="font-bold">{notification.comment?.comment} </span>
                    </span>
                );
            return (
                <span>
                    liked your artwork <span className="font-bold">{notification.artwork?.title}</span>
                </span>
            );
        case NotificationType.Commented:
            return (
                <span>
                    commented on your artwork <span className="font-bold">{notification.artwork?.title}</span>
                </span>
            );
        case NotificationType.Replied:
            return (
                <span>
                    replied to your comment on <span className="font-bold">{notification.artwork?.title}</span>
                </span>
            );
        case NotificationType.Uploaded:
            return <span>uploaded their artwork {notification.notifierArtwork?.title}</span>;
        case NotificationType.Tagged:
            return <span>tagged you on artwork {notification.artwork?.title}</span>;
        default:
            return <></>;
    }
};

const notificationLink = (notification: NotificationFragment): string => {
    switch (notification.notificationType) {
        case NotificationType.Liked:
        case NotificationType.Commented:
        case NotificationType.Replied:
            return `/artwork/${notification.artwork?.id}`;
        case NotificationType.Uploaded:
            return '/';
        case NotificationType.Tagged:
            return '/';
        default:
            return '/';
    }
};

export default function Notification({ notification }: NotificationProps) {
    return (
        <div className="w-full h-full">
            <Link href={notificationLink(notification)}>
                <div className={`flex gap-2 h-16 rounded-lg ${notification.isRead ? 'bg-slate-300' : 'bg-pink-500'} `}>
                    <NotificationNotifier id={notification.notifier.id} avatarUrl={notification.notifier.avatarUrl} />
                    <div className="self-center w-full pr-3">
                        <span className="font-bold">{notification.notifier.username} </span>
                        {notificationFormat(notification)}
                    </div>
                </div>
                <div className="flex justify-between px-0.5 pt-0.5 text-[10px] font-bold text-black/60">
                    <span className="">{getRelativeDate(notification.createdAt)}</span>
                    {!notification.isRead && <NotificationMarkAsRead notificationId={notification.id} />}
                </div>
            </Link>
        </div>
    );
}
