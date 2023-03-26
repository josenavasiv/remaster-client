import { useLikeArtworkDeleteMutation } from '@/graphql/__generated__/graphql';
import useUser from '@/lib/hooks/useUser';

type ArtworkUnlikeProps = {
    artworkId: string;
    likeId: string;
    uploaderId: string;
};

export default function ArtworkUnlike({ artworkId, likeId, uploaderId }: ArtworkUnlikeProps) {
    const user = useUser();
    const [likeArtworkDelete, { data, loading, error }] = useLikeArtworkDeleteMutation();

    const handleUnlike = async (): Promise<void> => {
        try {
            const response = await likeArtworkDelete({
                variables: { artworkId, likeId },
                refetchQueries: ['artwork'],
            });
        } catch (error) {
            console.log(error);
        }
    };

    if (!user || user.id === uploaderId) return null;

    return (
        <button onClick={handleUnlike} className="bg-fuchsia-400 px-2 py-1 rounded-lg font-extrabold">
            Liked!
        </button>
    );
}
