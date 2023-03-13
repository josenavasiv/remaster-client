import { ReactNode } from 'react';
import SideBar from '../sidebar/sidebar';

type CommonLayoutProps = {
    children: ReactNode;
};

export function CommonLayout({ children }: CommonLayoutProps): JSX.Element {
    return (
        <div className="flex w-mega-max justify-center h-screen">
            <SideBar />
            <>{children}</>
        </div>
    );
}
