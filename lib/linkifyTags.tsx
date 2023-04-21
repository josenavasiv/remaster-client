import Link from 'next/link';
// const hashtagRegex = /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9]{1,15})(\b|\r)/g;

export const linkifyTags = (word: string) => {
    if (word.startsWith('#')) {
        const tag = word.substring(1);
        return (
            <Link className="text-[#E94E77] font-bold" href={`/explore/tags/${tag}/`}>
                #{tag}
            </Link>
        );
    }
    return word;
};
