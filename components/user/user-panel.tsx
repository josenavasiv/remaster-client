import { useWindowSize } from 'react-use';

interface UserPanelProps {}

export default function UserPanel(UserPanelProps: UserPanelProps): JSX.Element {
    const { width } = useWindowSize();

    return <>{width < 1100 ? null : <div className="flex flex-col w-44">UserPanel</div>}</>;
}
