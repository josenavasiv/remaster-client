import React from 'react';

type MobileNavbarProps = {};

export default function MobileNavbar(MobileNavbarProps: MobileNavbarProps): JSX.Element {
    return (
        <>
            <div className="h-16 flex justify-between fixed bg-cyan-600 w-full top-0 sm:hidden">MobileNavbarTOP</div>
            <div className="h-16 flex justify-between fixed bg-cyan-600 w-full bottom-0 sm:hidden">
                MobileNavbarBOTTOM
            </div>
        </>
    );
}
