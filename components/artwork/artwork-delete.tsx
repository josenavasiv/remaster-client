import { useArtworkDeleteMutation } from '@/graphql/__generated__/graphql';
import useUser from '@/lib/hooks/useUser';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Modal from '../modal/modal';
import { useModal } from '@/lib/hooks/useModal';

type ArtworkDeleteProps = {
    artworkId: string;
    uploaderId: string;
};

export default function ArtworkDelete({ artworkId, uploaderId }: ArtworkDeleteProps) {
    const user = useUser();
    const router = useRouter();
    const [artworkDelete, { data, loading, error }] = useArtworkDeleteMutation();

    const { isOpen, openModal, closeModal } = useModal();

    const handleDelete = async (): Promise<void> => {
        try {
            const response = await artworkDelete({
                variables: { artworkId },
                update: (cache, { data }) => {
                    cache.evict({ id: 'Artwork:' + artworkId });
                },
            });
            toast.success(`Deleted ${artworkId}!`);
            closeModal();
            if (router.pathname === '/') {
                return;
            } else {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
            closeModal();
        }
    };

    if (!user || uploaderId !== user.id) return null;

    return (
        <>
            <button onClick={openModal} className="">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 text-[#E94E77]"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                </svg>
            </button>
            <Modal isOpen={isOpen} closeModal={closeModal}>
                <div className="flex flex-col text-center">
                    <div className="flex flex-col gap-3 w-[350px] bg-gray-200 p-5 rounded-xl">
                        <p>Are you sure you want to delete this artwork?</p>
                        <div className="flex justify-around font-bold">
                            <button className="bg-violet-400 p-2 rounded-lg" onClick={closeModal}>
                                Cancel
                            </button>
                            <button className="bg-red-500 p-2 rounded-lg" onClick={handleDelete} disabled={loading}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
