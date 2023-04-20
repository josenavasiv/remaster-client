import Link from 'next/link';
import useUser from '@/lib/hooks/useUser';
import LogoutButton from '../logout/logout-button';
import SidebarUser from './sidebar-user';
import SidebarHome from './sidebar-home';
import SidebarExplore from './sidebar-explore';
import SidebarCreate from './sidebar-create';
import SidebarSearch from './sidebar-search';
import Notifications from '../notifications/notifications';

type SideBarProps = {};

export default function SideBar(SideBarProps: SideBarProps): JSX.Element {
    const user = useUser();

    return (
        <div className="flex w-0 shrink-0 sm:w-16 pointer-events-none text-[#334970]">
            <div className="fixed bottom-0 left-0 sm:left-auto h-16 z-10 flex w-full gap-2 flex-row sm:flex-col sm:h-full sm:top-0 sm:w-16 ">
                <span className="flex w-full sm:flex-col sm:h-full justify-around sm:justify-start sm:gap-8 sm:mt-12">
                    <Link href={'/'} className="hidden sm:block sidebar self-center pointer-events-auto sm:pb-6">
                        M
                    </Link>
                    <SidebarHome />
                    <SidebarSearch />
                    <SidebarExplore />
                    <SidebarCreate />
                    {!user && (
                        <Link className="font-bold text-center pointer-events-auto" href={'/register'}>
                            REGISTER
                        </Link>
                    )}
                    {!user && (
                        <Link className="font-bold text-center pointer-events-auto" href={'/login'}>
                            LOGIN
                        </Link>
                    )}

                    <LogoutButton />
                    {user && <Notifications />}

                    <SidebarUser />
                </span>
            </div>
        </div>
    );
}
