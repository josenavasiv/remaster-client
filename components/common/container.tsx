import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
}

export default function Container({ children }: ContainerProps): JSX.Element {
    return <div className="flex flex-col h-full w-full pt-5 pb-20">{children}</div>;
}
