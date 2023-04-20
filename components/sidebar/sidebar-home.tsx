import Link from 'next/link';

type SidebarHomeProps = {};

export default function SidebarHome({}: SidebarHomeProps) {
    return (
        <span className="sm:mx-auto self-center text-center hidden sm:block pointer-events-auto">
            <Link href={'/'} className="lg:flex lg:gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[38px]">
                    <path
                        fillRule="evenodd"
                        d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                        clipRule="evenodd"
                    />
                </svg>
            </Link>
        </span>
    );
}
