import Link from 'next/link';
import useUser from '@/lib/hooks/useUser';
import Modal from '@/components/modal/modal';
import { useModal } from '@/lib/hooks/useModal';
import CreateForm from '../create/create-form';

type SideBarProps = {};

export default function SideBar(SideBarProps: SideBarProps): JSX.Element {
    const user = useUser();
    const { isOpen, openModal, closeModal } = useModal();
    return (
        <div className="flex w-0 shrink-0 sm:w-20 relative">
            <div className="fixed bottom-0 h-16 z-10 flex w-full gap-2 flex-row sm:flex-col bg-purple-300 sm:h-full sm:top-0 sm:w-20">
                <Link href={'/'}>HOME</Link>
                <Link href={'/login'}>LOGIN</Link>
                <Link href={'/thelab'}>THELAB</Link>
                <p>LOGGED IN AS {user?.username}</p>
                <button className="bg-purple-200" onClick={openModal}>
                    CREATE NEW ARTWORK
                </button>
                <Modal isOpen={isOpen} closeModal={closeModal}>
                    <div className="flex flex-col text-center bg-cyan-200">
                        <CreateForm closeModal={closeModal} />
                    </div>
                </Modal>
            </div>
        </div>
    );
}
