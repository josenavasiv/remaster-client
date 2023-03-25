import { useLikeArtworkDeleteMutation } from '@/graphql/__generated__/graphql';

type ArtworkUnlikeProps = {
    artworkId: string;
    likeId: string;
};

export default function ArtworkUnlike({ artworkId, likeId }: ArtworkUnlikeProps) {
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

    return (
        <button onClick={handleUnlike} className="bg-blue text-white font-extrabold">
            Unlike
        </button>
    );
}
