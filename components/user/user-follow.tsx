import { useFollowUserCreateMutation } from '@/graphql/__generated__/graphql';
import useUser from '@/lib/hooks/useUser';
import toast from 'react-hot-toast';
import { gql } from '@apollo/client';

type UserFollowProps = {
    userId: string;
};

export default function UserFollow({ userId }: UserFollowProps) {
    const user = useUser();
    const [followUserCreate, { data, loading, error }] = useFollowUserCreateMutation();

    const handleFollow = async (): Promise<void> => {
        try {
            const response = await followUserCreate({
                variables: { userId },
                // update: (cache, { data }) => {
                //     if (data?.likeArtworkCreate?.like?.id) {
                //         const artworkLikesData = cache.readFragment<{
                //             id: number;
                //             likesCount: number;
                //         }>({
                //             id: 'Artwork:' + artworkId,
                //             fragment: gql`
                //                 fragment ___ on Artwork {
                //                     id
                //                     likesCount
                //                 }
                //             `,
                //         });

                //         cache.writeFragment<{
                //             isLikedByLoggedInUser: {
                //                 id: number;
                //             };
                //             likesCount: number;
                //         }>({
                //             id: 'Artwork:' + artworkId,
                //             fragment: gql`
                //                 fragment _ on Artwork {
                //                     isLikedByLoggedInUser {
                //                         id
                //                     }
                //                     likesCount
                //                 }
                //             `,
                //             data: {
                //                 isLikedByLoggedInUser: { id: Number(data.likeArtworkCreate.like.id) },
                //                 likesCount: artworkLikesData?.likesCount! + 1,
                //             },
                //         });
                //     }
                // },
                refetchQueries: ['user', 'userFollowers', 'userFollowings'],
            });
            toast.success(`Followed!`);
        } catch (error) {
            console.log(error);
        }
    };

    if (!user || userId === user.id) return null;

    return (
        <button
            onClick={handleFollow}
            className="text-xs h-6 font-bold bg-[#DE5D82] py-1 px-2 rounded-md flex self-center"
        >
            Follow
        </button>
    );
}
