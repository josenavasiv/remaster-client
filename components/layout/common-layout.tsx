import { ReactNode } from 'react';
import SideBar from '../sidebar/sidebar';
import MobileNavbar from '../navbar/mobile-navbar';
import { Toaster } from 'react-hot-toast';

type CommonLayoutProps = {
    children: ReactNode;
};

export function CommonLayout({ children }: CommonLayoutProps): JSX.Element {
    return (
        <div className="flex ">
            <SideBar />
            <div className="flex justify-center h-screen w-full max-w-[900px] mx-auto p-4 pb-16 sm:pb-0 pt-16 sm:pt-8">
                <>{children}</>
                <Toaster />
            </div>

            <MobileNavbar />
        </div>
    );
}
