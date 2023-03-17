import { ReactNode } from 'react';

interface UserContainerProps {
    children: ReactNode;
}

export default function UserContainer({ children }: UserContainerProps): JSX.Element {
    return <div className="flex flex-col h-full w-full pt-5 pb-20">{children}</div>;
}
