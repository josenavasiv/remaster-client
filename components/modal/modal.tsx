import { Dialog } from '@headlessui/react';
import { ReactNode } from 'react';

type ModalProps = {
    isOpen: boolean;
    modalClassName?: string;
    closeModalOnClick?: boolean;
    closeModal: () => void;
    children: ReactNode;
};

export default function Modal({ isOpen, modalClassName, closeModalOnClick, closeModal, children }: ModalProps) {
    return (
        <>
            {isOpen && (
                <Dialog className="relative z-10" open={isOpen} onClose={closeModal}>
                    <div className="fixed inset-0 bg-black bg-opacity-75" />
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Dialog.Panel
                                as="div"
                                className={modalClassName ?? undefined}
                                onClick={closeModalOnClick ? closeModal : undefined}
                            >
                                {children}
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            )}
        </>
    );
}
