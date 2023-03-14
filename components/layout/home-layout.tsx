import { ReactNode } from 'react';
import Navbar from '../navbar/navbar';

type HomeLayoutProps = {
    children: ReactNode;
};

export function HomeLayout({ children }: HomeLayoutProps): JSX.Element {
    return (
        <div className="flex flex-col w-full px-5 max-w-xl">
            <Navbar />
            <>{children}</>
        </div>
    );
}
