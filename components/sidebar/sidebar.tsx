import { useWindowSize } from 'react-use';

type SideBarProps = {};

export default function SideBar(SideBarProps: SideBarProps): JSX.Element {
    const { width } = useWindowSize();

    return <>{width < 770 ? null : <div className="sidebar w-20">REMASTER</div>}</>;
}
