import Link from 'next/link';

type CommentUsernameProps = {
    username: string;
    isReply?: boolean;
};

export default function CommentUsername({ username, isReply }: CommentUsernameProps) {
    return (
        <Link className="font-bold" href={`/user/${username}`}>
            {isReply ? `@${username}` : username}
        </Link>
    );
}
