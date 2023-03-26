import { useCommentDeleteMutation } from '@/graphql/__generated__/graphql';
import useUser from '@/lib/hooks/useUser';
import toast from 'react-hot-toast';

type CommentDeleteProps = {
    commenterId: string;
    commentId: string;
};

export default function CommentDelete({ commentId, commenterId }: CommentDeleteProps) {
    const user = useUser();
    const [commentDelete, { data, loading, error }] = useCommentDeleteMutation();

    if (!user || commenterId !== user.id) return null;

    const handleDelete = async (): Promise<void> => {
        try {
            const response = await commentDelete({
                variables: { commentId },
                refetchQueries: ['artwork'],
            });
            toast.success(`Deleted Comment`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button onClick={handleDelete} className="">
            Delete
        </button>
    );
}
