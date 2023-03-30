import useUser from '@/lib/hooks/useUser';
import Image from 'next/image';
import Link from 'next/link';

type SidebarUserProps = {};

export default function SidebarUser({}: SidebarUserProps) {
    const user = useUser();
    if (!user) return null;
    return (
        <Link href={`/user/${user.username}`} className="flex sm:flex-col gap-1 sm:mx-auto text-center">
            <Image
                src={user.avatarUrl}
                alt={user.username}
                height={34}
                width={34}
                className="rounded-full my-auto aspect-square object-cover self-center"
            />
            <span className="font-bold self-center hidden sm:block">{user.username}</span>
        </Link>
    );
}
