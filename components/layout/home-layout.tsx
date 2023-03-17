import { ReactNode } from 'react';
import Navbar from '../navbar/navbar';
import UserPanel from '../user/user-panel';

type HomeLayoutProps = {
    children: ReactNode;
};

export function HomeLayout({ children }: HomeLayoutProps): JSX.Element {
    return (
        <>
            <div className="flex flex-col w-full max-w-xl">
                <Navbar />
                <>{children}</>
            </div>
            <UserPanel />
        </>
    );
}
