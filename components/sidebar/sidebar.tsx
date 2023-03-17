type SideBarProps = {};

export default function SideBar(SideBarProps: SideBarProps): JSX.Element {
    return (
        <div className="flex w-0 shrink-0 sm:w-20 relative">
            <div className="fixed bottom-0 h-16 z-10 flex w-full flex-col justify-between bg-red-200 sm:h-full sm:top-0 sm:w-20">
                SIDEBAR
            </div>
        </div>
    );
}
