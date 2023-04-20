import { ReactNode } from 'react';
import MobileNavbar from '../navbar/mobile-navbar';
import { Toaster } from 'react-hot-toast';

type CommonLayoutProps = {
    children: ReactNode;
};

export function CommonLayout({ children }: CommonLayoutProps): JSX.Element {
    return (
        <div className="flex overflow-x-hidden">
            <div className="flex h-screen w-full mx-auto p-4 pb-16 sm:pb-0 pt-16 sm:pt-8">
                <>{children}</>
                <Toaster position="top-left" reverseOrder={true} />
            </div>

            <MobileNavbar />
        </div>
    );
}
