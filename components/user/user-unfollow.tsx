import { useFollowUserDeleteMutation } from '@/graphql/__generated__/graphql';
import useUser from '@/lib/hooks/useUser';
import toast from 'react-hot-toast';
import { gql } from '@apollo/client';

type UserUnfollowProps = {
    userId: string;
};

export default function UserUnfollow({ userId }: UserUnfollowProps) {
    const user = useUser();
    const [likeArtworkDelete, { data, loading, error }] = useFollowUserDeleteMutation();

    const handleUnfollow = async (): Promise<void> => {
        try {
            const response = await likeArtworkDelete({
                variables: { userId },
                //     update: (cache, { data }) => {
                //         const artworkLikesData = cache.readFragment<{
                //             id: number;
                //             likesCount: number;
                //         }>({
                //             id: 'Artwork:' + artworkId,
                //             fragment: gql`
                //                 fragment ____ on Artwork {
                //                     id
                //                     likesCount
                //                 }
                //             `,
                //         });

                //         cache.writeFragment<{
                //             isLikedByLoggedInUser: null;
                //             likesCount: number;
                //         }>({
                //             id: 'Artwork:' + artworkId,
                //             fragment: gql`
                //                 fragment __ on Artwork {
                //                     isLikedByLoggedInUser
                //                     likesCount
                //                 }
                //             `,
                //             data: {
                //                 isLikedByLoggedInUser: null,
                //                 likesCount: artworkLikesData?.likesCount! - 1,
                //             },
                //         });
                //     },
                refetchQueries: ['user', 'userFollowers', 'userFollowings'],
            });
            toast.success(`Unfollowed!`);
        } catch (error) {
            console.log(error);
        }
    };

    if (!user || userId === user.id) return null;

    return (
        <button
            onClick={handleUnfollow}
            className="text-xs h-6 font-bold bg-[#DE5D82] py-1 px-2 rounded-md flex self-center"
        >
            Following
        </button>
    );
}
