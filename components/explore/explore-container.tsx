import { ReactNode } from 'react';

interface ExploreContainerProps {
    children: ReactNode;
}

export default function ExploreContainer({ children }: ExploreContainerProps): JSX.Element {
    return <div className="flex flex-col h-full w-full pt-5 pb-20">{children}</div>;
}
