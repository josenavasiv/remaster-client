import Link from 'next/link';
import useUser from '@/lib/hooks/useUser';

type SideBarProps = {};

export default function SideBar(SideBarProps: SideBarProps): JSX.Element {
    const user = useUser();
    return (
        <div className="flex w-0 shrink-0 sm:w-20 relative">
            <div className="fixed bottom-0 h-16 z-10 flex w-full flex-col bg-purple-300 sm:h-full sm:top-0 sm:w-20">
                <Link href={'/'}>HOME</Link>
                <Link href={'/login'}>LOGIN</Link>
                <p>LOGGED IN AS {user?.username}</p>
            </div>
        </div>
    );
}
