import { useState } from 'react';
import { useCommentUpdateMutation } from '@/graphql/__generated__/graphql';
import validator from 'validator';

type CommentEditInputProps = {
    commentId: string;
    comment: string;
};

export default function CommentEditInput({ commentId, comment }: CommentEditInputProps) {
    const [commentUpdate, { data, loading, error }] = useCommentUpdateMutation();
    const [editedComment, setEditedComment] = useState(comment);

    const handleEdit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        const isValidReply = validator.isLength(editedComment, { min: 1, max: 100 });

        if (!isValidReply) return;

        try {
            const response = await commentUpdate({
                variables: {
                    commentId,
                    comment: editedComment,
                },
                refetchQueries: ['artwork'],
            });

            setEditedComment('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleEdit} className="w-full flex gap-1 border-b-2 border-violet-200">
            <input
                className="w-full bg-transparent py-2"
                type="text"
                onChange={(e) => setEditedComment(e.target.value)}
                value={editedComment}
                placeholder="Editing comment..."
                required
                autoFocus
            />
            {editedComment && (
                <button className="font-medium text-[#E94E77]" type="submit">
                    Edit
                </button>
            )}
        </form>
    );
}
