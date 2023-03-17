import { ReactNode } from 'react';
import SideBar from '../sidebar/sidebar';
import { Toaster } from 'react-hot-toast';

type CommonLayoutProps = {
    children: ReactNode;
};

export function CommonLayout({ children }: CommonLayoutProps): JSX.Element {
    return (
        <div className="flex">
            <SideBar />
            <div className="flex justify-center h-screen w-full max-w-[900px] mx-auto p-4">
                <>{children}</>
                <Toaster />
            </div>
        </div>
    );
}
