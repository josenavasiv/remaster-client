import { ReactNode } from 'react';
import SideBar from '../sidebar/sidebar';
import { Toaster } from 'react-hot-toast';
import UserPanel from '../user/user-panel';

type CommonLayoutProps = {
    children: ReactNode;
};

export function CommonLayout({ children }: CommonLayoutProps): JSX.Element {
    return (
        <div className="flex justify-center h-screen max-w-[900px] mx-auto">
            <SideBar />
            <>{children}</>
            <UserPanel />
            <Toaster />
        </div>
    );
}
