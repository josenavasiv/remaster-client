import { useLikeArtworkCreateMutation } from '@/graphql/__generated__/graphql';
import useUser from '@/lib/hooks/useUser';

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
                refetchQueries: ['artwork'],
            });
        } catch (error) {
            console.log(error);
        }
    };

    if (!user || uploaderId === user.id) return null;

    return (
        <button onClick={handleLike} className="bg-fuchsia-400 px-2 py-1 rounded-lg font-extrabold text-white">
            Like
        </button>
    );
}
