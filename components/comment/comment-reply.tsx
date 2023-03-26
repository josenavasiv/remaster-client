import useUser from '@/lib/hooks/useUser';
import { Dispatch, SetStateAction } from 'react';

type CommentReplyProps = {
    isReplying: boolean;
    setIsReplying: Dispatch<SetStateAction<boolean>>;
    commenterId: string;
};

export default function CommentReply({ isReplying, setIsReplying, commenterId }: CommentReplyProps) {
    const user = useUser();

    if (!user) return null;

    return (
        <button className="text-[0.7rem]" onClick={() => setIsReplying(!isReplying)}>
            {isReplying ? 'Cancel Reply' : 'Reply'}
        </button>
    );
}
