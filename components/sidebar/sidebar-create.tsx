import Modal from '@/components/modal/modal';
import { useModal } from '@/lib/hooks/useModal';
import useUser from '@/lib/hooks/useUser';
import CreateForm from '../create/create-form';

type SidebarCreateProps = {};

export default function SidebarCreate({}: SidebarCreateProps) {
    const user = useUser();
    const { isOpen, openModal, closeModal } = useModal();

    if (!user) return null;
    return (
        <>
            <button className="self-center pointer-events-auto text-[#B13E77]" onClick={openModal}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-[38px] sm:mx-auto"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <Modal isOpen={isOpen} closeModal={closeModal}>
                <div className="flex flex-col text-center">
                    <CreateForm closeModal={closeModal} />
                </div>
            </Modal>
        </>
    );
}
