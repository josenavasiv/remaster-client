import Head from 'next/head';
import Modal from '@/components/modal/modal';
import { useModal } from '@/lib/hooks/useModal';
import Link from 'next/link';

import CreateForm from '@/components/create/create-form';

export default function TheLab() {
    // Preview Component
    const { isOpen, openModal, closeModal } = useModal();

    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="w-screen h-screen">
                <p>Blog</p>
                <Link href={'/'}>HOME</Link>

                <button className="bg-purple-200" onClick={openModal}>
                    OPEN MODAL
                </button>
                <Modal isOpen={isOpen} closeModal={closeModal}>
                    <div className="flex flex-col text-center bg-cyan-200">
                        <CreateForm />
                    </div>
                </Modal>
            </div>
        </>
    );
}
