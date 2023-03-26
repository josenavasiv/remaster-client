import { parentCommentType } from '../artwork/artwork-comment-reply';
import { useState } from 'react';
import { useCommentReplyMutation } from '@/graphql/__generated__/graphql';
import validator from 'validator';

type CommentReplyInputProps = {
    artworkId: string;
    parentCommentId: string;
    parentComment: parentCommentType;
};

export default function CommentReplyInput({ artworkId, parentCommentId, parentComment }: CommentReplyInputProps) {
    const [commentReply, { data, loading, error }] = useCommentReplyMutation();
    const [reply, setReply] = useState('');

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        const isValidReply = validator.isLength(reply, { min: 1, max: 100 });

        if (!isValidReply) return;

        try {
            const response = await commentReply({
                variables: {
                    artworkId,
                    parentCommentId,
                    comment: reply,
                },
                refetchQueries: ['artwork'],
            });
            console.log(response.data?.commentReply.comment);
            setReply('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex gap-1 border-b-2 border-violet-200">
            <span className="font-bold pt-2">@{parentComment.commenter.username}</span>
            <input
                className="w-full bg-transparent py-2"
                type="text"
                // ref={commentInputRef}
                onChange={(e) => setReply(e.target.value)}
                value={reply}
                placeholder="Add a reply..."
                required
                autoFocus
            />
            {reply && (
                <button className="font-medium text-pink-500" type="submit">
                    Reply
                </button>
            )}
        </form>
    );
}
