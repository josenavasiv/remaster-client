import { ReactNode } from 'react';

interface ArtworkContainerProps {
    children: ReactNode;
}

export default function ArtworkContainer({ children }: ArtworkContainerProps): JSX.Element {
    return <div className="flex flex-col h-full w-full pt-5 pb-20">{children}</div>;
}
