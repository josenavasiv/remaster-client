import { ReactNode } from 'react';
import SideBar from '../sidebar/sidebar';
import { Toaster } from 'react-hot-toast';
import MobileNavbar from '../navbar/mobile-navbar';

type CommonLayoutProps = {
    children: ReactNode;
};

export function CommonLayout({ children }: CommonLayoutProps): JSX.Element {
    return (
        <div className="flex w-mega-max justify-center h-screen">
            <SideBar />
            <>{children}</>
            <Toaster />
        </div>
    );
}
