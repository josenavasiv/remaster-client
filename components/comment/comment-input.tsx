import { useState } from 'react';
import { CommentFragment, CommentFragmentDoc, useCommentCreateMutation } from '@/graphql/__generated__/graphql';
import validator from 'validator';
import { gql } from '@apollo/client';

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
                // update: (cache, { data }) => {
                //     if (data?.commentCreate?.comment) {
                //         const artworkCommentsData = cache.readFragment<{
                //             id: number;
                //             comments: CommentFragment[];
                //         }>({
                //             id: 'Artwork:' + artworkId,
                //             fragment: gql`
                //                 fragment ArtworkComments on Artwork {
                //                     id
                //                     comments {
                //                         ...Comment
                //                     }
                //                 }
                //                 ${CommentFragmentDoc}
                //             `,
                //             fragmentName: 'ArtworkComments',
                //         });

                //         console.log(artworkCommentsData?.comments);

                //         cache.writeFragment<{ comments: CommentFragment[] }>({
                //             id: 'Artwork:' + artworkId,
                //             fragment: gql`
                //                 fragment ArtworkComments on Artwork {
                //                     id
                //                     comments {
                //                         ...Comment
                //                     }
                //                 }
                //                 ${CommentFragmentDoc}
                //             `,
                //             fragmentName: 'ArtworkComments',
                //             data: { comments: [data.commentCreate.comment, ...(artworkCommentsData?.comments || [])] },
                //         });
                //     }
                // },
                refetchQueries: ['artwork'],
            });
            setComment('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex gap-2 border-b-2 border-pink-300 focus-within:border-pink-500"
        >
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
