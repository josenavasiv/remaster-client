import useUser from '@/lib/hooks/useUser';
import { useRouter } from 'next/router';

type UserPanelProps = {};

export default function UserPanel(SideBarProps: UserPanelProps): JSX.Element | null {
    const user = useUser();
    const router = useRouter();

    if (router.pathname !== '/') return null;

    return (
        <div className="hidden md:flex w-0 shrink-0 md:w-52 relative pointer-events-none">
            <div className="fixed bottom-0 h-16 z-10 flex w-full gap-2 flex-row md:flex-col sm:h-full sm:top-0 md:w-52">
                <span className="flex w-full sm:flex-col sm:h-full sm:gap-10 sm:pb-4 sm:mt-12">
                    <span className="pointer-events-auto">USER PANEL</span>
                    <span>USER PANEL</span>
                    <span>USER PANEL</span>
                </span>
            </div>
        </div>
    );
}
