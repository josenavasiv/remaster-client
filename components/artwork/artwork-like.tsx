import { useLikeArtworkCreateMutation } from '@/graphql/__generated__/graphql';

type ArtworkLikeProps = {
    artworkId: string;
};

export default function ArtworkLike({ artworkId }: ArtworkLikeProps) {
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

    return (
        <button onClick={handleLike} className="bg-blue text-white font-extrabold">
            Like
        </button>
    );
}
