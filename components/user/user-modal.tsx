import { useModal } from '@/lib/hooks/useModal';
import { Tab } from '@headlessui/react';
import Modal from '../modal/modal';
import UserFollowers from './user-followers';
import UserFollowings from './user-followings';

type UserModalProps = {
    username: string;
};

const categories = ['Followers', 'Followings'];
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

export default function UserModal({ username }: UserModalProps) {
    const { isOpen, openModal, closeModal } = useModal();

    return (
        <>
            <button className="self-center sm:self-auto" onClick={openModal}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-[36px] sm:mx-auto self-center"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                </svg>
            </button>
            <Modal isOpen={isOpen} closeModal={closeModal}>
                <div className="w-[350px] h-[440px] bg-gray-200 p-5 rounded-xl flex flex-col">
                    <div className="flex flex-col h-full w-full overflow-y-scroll gap-3 no-scrollbar">
                        <Tab.Group>
                            <Tab.List className="flex p-1 gap-5 w-full justify-center">
                                {categories.map((category) => (
                                    <Tab
                                        key={category}
                                        className={({ selected }) =>
                                            classNames(
                                                'w-16 font-bold border-b-2 focus:outline-none',
                                                selected ? ' text-[#DE5D82] border-b-2 border-[#DE5D82]' : ''
                                            )
                                        }
                                    >
                                        {category}
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel>
                                    <UserFollowers username={username} />
                                </Tab.Panel>
                                <Tab.Panel>
                                    <UserFollowings username={username} />
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </Modal>
        </>
    );
}
