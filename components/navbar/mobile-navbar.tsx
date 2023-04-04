import Link from 'next/link';

type MobileNavbarProps = {};

export default function MobileNavbar(MobileNavbarProps: MobileNavbarProps): JSX.Element {
    return (
        <div className="h-16 flex justify-center fixed bg-cyan-600 w-full top-0 sm:hidden">
            <Link href={'/'} className="font-black text-[3rem] self-center">
                I C O N
            </Link>
        </div>
    );
}
