import { useLikeCommentDeleteMutation } from '@/graphql/__generated__/graphql';
import useUser from '@/lib/hooks/useUser';
import { gql } from '@apollo/client';
import toast from 'react-hot-toast';

type CommentUnlikeProps = {
    commentId: string;
    likeId: string;
    commenterId: string;
};

export default function CommentUnlike({ commentId, likeId, commenterId }: CommentUnlikeProps) {
    const user = useUser();
    const [likeCommentDelete, { data, loading, error }] = useLikeCommentDeleteMutation();

    const handleUnlike = async (): Promise<void> => {
        try {
            const response = await likeCommentDelete({
                variables: { commentId, likeId },
				update: (cache, { data }) => {
                    const commentLikesData = cache.readFragment<{
                        id: number;
                        likesCount: number;
                    }>({
                        id: 'Comment:' + commentId,
                        fragment: gql`
                            fragment CommentLikeRead on Comment {
                                id
                                likesCount
                            }
                        `,
                    });

                    cache.writeFragment<{
                        isLikedByLoggedInUser: null
                        likesCount: number;
                    }>({
                        id: 'Comment:' + commentId,
                        fragment: gql`
                            fragment CommentLikeWrite on Comment {
                                isLikedByLoggedInUser {
                                    id
                                }
                                likesCount
                            }
                        `,
                        data: {
                            isLikedByLoggedInUser: null,
                            likesCount: commentLikesData?.likesCount! - 1,
                        },
                    });
                },
                // refetchQueries: ['artwork'],
            });
            toast.success(`Unliked!`);
        } catch (error) {
            console.log(error);
        }
    };

    if (!user || user.id === commenterId) return null;

    return (
        <button onClick={handleUnlike} className="">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[0.85rem] text-pink-600"
            >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
        </button>
    );
}
