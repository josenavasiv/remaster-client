import { ReactNode } from 'react';

interface HomeMainFeedContainerProps {
    children: ReactNode;
}

export default function HomeMainFeedContainer({ children }: HomeMainFeedContainerProps): JSX.Element {
    return <div className="flex flex-col h-full w-full overflow-y-scroll overflow-x-hidden pt-5 pb-20">{children}</div>;
}
