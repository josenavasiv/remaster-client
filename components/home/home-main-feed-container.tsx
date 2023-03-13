import { ReactNode } from 'react';

interface HomeMainFeedContainerProps {
    children: ReactNode;
}

export default function HomeMainFeedContainer({ children }: HomeMainFeedContainerProps): JSX.Element {
    return <div className="flex flex-col h-full w-full max-w-xl overflow-y-scroll">{children}</div>;
}
