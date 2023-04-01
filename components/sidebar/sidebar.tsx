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
        <div className="flex w-0 shrink-0 sm:w-20 relative">
            <div className="fixed bottom-0 h-16 z-10 flex w-full gap-2 flex-row sm:flex-col bg-blue-300 sm:h-full sm:top-0 sm:w-20">
                <Link href={'/'} className="hidden sm:block sidebar self-center absolute">
                    ICON
                </Link>
                <span className="flex w-full sm:flex-col sm:h-full justify-around sm:justify-center sm:gap-10 sm:pb-4">
                    <SidebarHome />
                    <SidebarSearch />
                    <SidebarExplore />
                    <SidebarCreate />
                    {!user && (
                        <Link className="font-bold text-center" href={'/register'}>
                            REGISTER
                        </Link>
                    )}
                    {!user && (
                        <Link className="font-bold text-center" href={'/login'}>
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
