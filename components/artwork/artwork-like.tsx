import { useLikeArtworkCreateMutation } from '@/graphql/__generated__/graphql';
import useUser from '@/lib/hooks/useUser';
import toast from 'react-hot-toast';
import { gql } from '@apollo/client';

type ArtworkLikeProps = {
    artworkId: string;
    uploaderId: string;
};

export default function ArtworkLike({ artworkId, uploaderId }: ArtworkLikeProps) {
    const user = useUser();
    const [likeArtworkCreate, { data, loading, error }] = useLikeArtworkCreateMutation();

    const handleLike = async (): Promise<void> => {
        try {
            const response = await likeArtworkCreate({
                variables: { artworkId },
                update: (cache, { data }) => {
                    if (data?.likeArtworkCreate?.like?.id) {
                        const artworkLikesData = cache.readFragment<{
                            id: number;
                            likesCount: number;
                        }>({
                            id: 'Artwork:' + artworkId,
                            fragment: gql`
                                fragment ___ on Artwork {
                                    id
                                    likesCount
                                }
                            `,
                        });

                        cache.writeFragment<{
                            isLikedByLoggedInUser: {
                                id: number;
                            };
                            likesCount: number;
                        }>({
                            id: 'Artwork:' + artworkId,
                            fragment: gql`
                                fragment _ on Artwork {
                                    isLikedByLoggedInUser {
                                        id
                                    }
                                    likesCount
                                }
                            `,
                            data: {
                                isLikedByLoggedInUser: { id: Number(data.likeArtworkCreate.like.id) },
                                likesCount: artworkLikesData?.likesCount! + 1,
                            },
                        });
                    }
                },
                // refetchQueries: ['artwork'],
            });
            toast.success(`Liked!`);
        } catch (error) {
            console.log(error);
        }
    };

    if (!user || uploaderId === user.id) return null;

    return (
        <button onClick={handleLike} className="">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 text-[#E94E77]"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
            </svg>
        </button>
    );
}
