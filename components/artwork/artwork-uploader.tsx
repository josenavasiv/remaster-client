import { User } from '@/graphql/__generated__/graphql';
import Link from 'next/link';
import Image from 'next/image';

type ArtworkUploaderProps = Pick<User, 'id' | 'username' | 'avatarUrl'>;

export default function ArtworkUploader({ id, username, avatarUrl }: ArtworkUploaderProps) {
    return (
        <Link className="flex gap-3 w-44" href={`/user/${username}`}>
            <Image
                src={avatarUrl}
                width={42}
                height={42}
                alt={`${username}'s Avatar`}
                className="rounded-full my-auto aspect-square"
            />
            <span className="font-bold my-auto">{username}</span>
        </Link>
    );
}
