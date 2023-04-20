import Link from 'next/link';

type MobileNavbarProps = {};

export default function MobileNavbar(MobileNavbarProps: MobileNavbarProps): JSX.Element {
    return (
        <div className="h-12 flex justify-center fixed bg-[#f4ead5] w-full top-0 sm:hidden">
            <Link href={'/'} className="font-black text-[#334970] text-[2rem] self-center">
                PICADEX
            </Link>
        </div>
    );
}
