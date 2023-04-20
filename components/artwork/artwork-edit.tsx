import { useArtworkUpdateMutation } from '@/graphql/__generated__/graphql';
import useUser from '@/lib/hooks/useUser';
import { useRouter } from 'next/router';
import Modal from '../modal/modal';
import { useModal } from '@/lib/hooks/useModal';
import EditForm from '../edit/edit-form';

type ArtworkEditProps = {
    artworkId: string;
    uploaderId: string;
    title: string;
    description: string;
    imageUrls: string[];
};

export default function ArtworkEdit({ artworkId, uploaderId, title, description, imageUrls }: ArtworkEditProps) {
    const user = useUser();
    const router = useRouter();
    const [artworkUpdate, { data, loading, error }] = useArtworkUpdateMutation();
    const { isOpen, openModal, closeModal } = useModal();

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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                </svg>
            </button>
            <Modal isOpen={isOpen} closeModal={closeModal}>
                <EditForm
                    artworkId={artworkId}
                    closeModal={closeModal}
                    titleToEdit={title}
                    descriptionToEdit={description}
                    imageUrls={imageUrls}
                />
            </Modal>
        </>
    );
}
