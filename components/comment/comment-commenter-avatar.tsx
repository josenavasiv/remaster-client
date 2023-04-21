import Link from 'next/link';
import Image from 'next/image';

type CommenterCommenterAvatarProps = {
    username: string;
    avatarUrl: string;
};

export default function CommenterCommenterAvatar({ username, avatarUrl }: CommenterCommenterAvatarProps) {
    return (
        <Link className="flex" href={`/user/${username}`}>
            <Image
                src={avatarUrl}
                width={28}
                height={28}
                alt={`${username}'s Avatar`}
                className="rounded-full my-auto aspect-square object-cover"
            />
        </Link>
    );
}
