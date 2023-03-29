import Link from 'next/link';

type TagProps = {
    id: string;
    tagname: string;
};

export default function Tag({ tagname }: TagProps) {
    return (
        <Link href={`/explore/tags/${tagname}`} className="font-bold text-xl p-1 hover:cursor-pointer">
            #{tagname}
        </Link>
    );
}
