import { ReactNode } from 'react';
import UserPanel from '../user/user-panel';

type HomeLayoutProps = {
    children: ReactNode;
};

export function HomeLayout({ children }: HomeLayoutProps): JSX.Element {
    return (
        <>
            <div className="flex flex-col w-full">
                <>{children}</>
            </div>
            <UserPanel />
        </>
    );
}
