import React from 'react';

type MobileNavbarProps = {};

export default function MobileNavbar(MobileNavbarProps: MobileNavbarProps): JSX.Element {
    return (
        <>
            <div className="h-16 flex justify-between absolute bg-cyan-600 w-full bottom-0 sm:hidden">MobileNavbar</div>
            <div className="h-16 flex justify-between absolute bg-cyan-600 w-full top-0 sm:hidden">MobileNavbar</div>
        </>
    );
}
