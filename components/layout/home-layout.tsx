import { ReactNode } from 'react';
import Navbar from '../navbar/navbar';
import UserPanel from '../user/user-panel';

type HomeLayoutProps = {
    children: ReactNode;
};

export function HomeLayout({ children }: HomeLayoutProps): JSX.Element {
    return (
        <div className="flex">
            <div className="flex flex-col w-96">
                <Navbar />
                <>{children}</>
            </div>
            <UserPanel />
        </div>
    );
}
