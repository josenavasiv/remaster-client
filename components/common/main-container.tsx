import { ReactNode } from 'react';

interface MainContainerProps {
    children: ReactNode;
}

export default function MainContainer({ children }: MainContainerProps): JSX.Element {
    return <div className="flex flex-col h-full w-full pt-5 pb-20">{children}</div>;
}
