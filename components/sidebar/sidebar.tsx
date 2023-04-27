import Link from 'next/link';
import useUser from '@/lib/hooks/useUser';
import LogoutButton from '../logout/logout-button';
import SidebarUser from './sidebar-user';
import SidebarHome from './sidebar-home';
import SidebarExplore from './sidebar-explore';
import SidebarCreate from './sidebar-create';
import SidebarSearch from './sidebar-search';
import Notifications from '../notifications/notifications';
import { useUserLoginMutation } from '@/graphql/__generated__/graphql';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

type SideBarProps = {};

export default function SideBar(SideBarProps: SideBarProps): JSX.Element {
    const user = useUser();
    const [userLogin, { data, loading, error, client }] = useUserLoginMutation();
    const router = useRouter();

    return (
        <div className="flex w-0 shrink-0 sm:w-16 pointer-events-none text-[#334970]">
            <div className="fixed bottom-0 left-0 sm:left-auto h-12 z-10 flex w-full gap-2 flex-row sm:flex-col sm:h-full sm:top-0 sm:w-16 ">
                <span className="flex w-full bg-[#f4ead5] sm:flex-col sm:h-full justify-around sm:justify-start sm:gap-8 sm:mt-12">
                    <Link href={'/'} className="hidden sm:block self-center pointer-events-auto sm:pb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-[38px] mx-auto"
                        >
                            <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                            <path
                                fillRule="evenodd"
                                d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-center">PICADEX</span>
                    </Link>
                    <SidebarHome />
                    <SidebarSearch />
                    <SidebarExplore />
                    <SidebarCreate />
                    {!user && (
                        <Link className="font-bold text-center pointer-events-auto self-center" href={'/register'}>
                            REGISTER
                        </Link>
                    )}
                    {!user && (
                        <Link className="font-bold text-center pointer-events-auto self-center" href={'/login'}>
                            LOGIN
                        </Link>
                    )}
                    {!user && (
                        <button
                            className="font-bold text-center pointer-events-auto"
                            onClick={async () => {
                                const response = await userLogin({
                                    variables: {
                                        username: 'demo',
                                        password: 'qwerty',
                                    },
                                });
                                await client.resetStore(); // Everytime we get to this page we reset the entire cache

                                if (response.data?.userLogin?.errors && response.data.userLogin.errors.length > 0) {
                                    response.data.userLogin.errors.forEach((error) => {
                                        toast.error(error.message);
                                    });
                                } else {
                                    toast.success(`Logged in as demo`);
                                    router.push('/');
                                }
                            }}
                        >
                            LOGIN AS DEMO
                        </button>
                    )}

                    <LogoutButton />
                    {user && <Notifications />}

                    <SidebarUser />
                </span>
            </div>
        </div>
    );
}
