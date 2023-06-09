import Link from 'next/link';
import toast from 'react-hot-toast';

type SidebarSearchProps = {};

export default function SidebarSearch({}: SidebarSearchProps) {
    return (
        <span className="sm:mx-auto self-center text-center pointer-events-auto">
            {/* <Link href={'/search'} className=""> */}
            <span className="cursor-pointer" onClick={() => toast.error('Search functionality soon!')}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[38px]">
                    <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clipRule="evenodd"
                    />
                </svg>
            </span>
            {/* </Link> */}
        </span>
    );
}
