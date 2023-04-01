import { NotificationFragment, NotificationType } from '@/graphql/__generated__/graphql';
import toast from 'react-hot-toast';
import { notificationFormat } from '@/components/notifications/notification';
import NotificationNotifier from '@/components/notifications/notification-notifier';

// Need to break apart into a render functions and fragment the type
export default function NotificationToaster(notification: NotificationFragment): void {
    toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'}`}>
            <div
                className={`flex gap-2 h-16 rounded-lg ${
                    notification.isRead ? 'bg-slate-300' : 'bg-pink-500'
                } w-[350px]`}
            >
                <NotificationNotifier id={notification.notifier.id} avatarUrl={notification.notifier.avatarUrl} />
                <div className="self-center w-full pr-3">
                    <span className="font-bold">{notification.notifier.username} </span>
                    {notificationFormat(notification)}
                </div>
            </div>
        </div>
    ));
    return;
}
