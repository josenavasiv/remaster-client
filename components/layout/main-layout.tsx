import { ReactNode } from 'react';
import UserPanel from '../user/user-panel';
import SideBar from '../sidebar/sidebar';

type MainLayoutProps = {
    children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps): JSX.Element {
    return (
        <>
            <div className="flex w-full max-w-4xl justify-center mx-auto sm:gap-4">
                <SideBar />
                <>{children}</>
                {/* <UserPanel /> */}
            </div>
        </>
    );
}
