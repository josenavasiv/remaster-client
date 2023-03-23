import { useState } from 'react';

export function useModal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (): void => setIsOpen(true);
    const closeModal = (): void => setIsOpen(false);

    return { isOpen, openModal, closeModal };
}
