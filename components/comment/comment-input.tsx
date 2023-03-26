import { useState } from 'react';
import { useCommentCreateMutation } from '@/graphql/__generated__/graphql';
import validator from 'validator';

type CommentInputProps = {
    artworkId: string;
    parentCommentID?: string | null | undefined;
};

export default function CommentInput({ artworkId }: CommentInputProps) {
    // const commentInputRef = useRef<HTMLInputElement>(null);
    const [commentCreate, { data, loading, error }] = useCommentCreateMutation();
    const [comment, setComment] = useState('');

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        // //@ts-expect-error
        // commentInputRef.current.value = '';

        const isValidComment = validator.isLength(comment, { min: 1, max: 100 });

        if (!isValidComment) return;

        try {
            const response = await commentCreate({
                variables: {
                    artworkId,
                    comment,
                },
                refetchQueries: ['artwork'],
            });
            console.log(response.data?.commentCreate.comment);
            setComment('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex gap-2 border-b-2 border-violet-200">
            <input
                className="w-full bg-transparent py-2"
                type="text"
                // ref={commentInputRef}
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                placeholder="Add a comment..."
                required
            />
            {comment && (
                <button className="font-medium text-pink-500" type="submit">
                    Comment
                </button>
            )}
        </form>
    );
}
