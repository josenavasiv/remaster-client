import Image from 'next/image';

type NotificationNotifierProps = {
    id: string;
    avatarUrl: string;
};

export default function NotificationNotifier({ id, avatarUrl }: NotificationNotifierProps) {
    return (
        <div className="w-16 self-center">
            <Image
                src={avatarUrl}
                alt={avatarUrl}
                height={34}
                width={34}
                className="rounded-full aspect-square object-cover ml-3"
            />
        </div>
    );
}
