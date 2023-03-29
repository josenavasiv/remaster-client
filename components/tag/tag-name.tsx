import React from 'react';

type TagNameProps = {
    tagname: string;
};

export default function TagName({ tagname }: TagNameProps) {
    return <div className="font-extrabold text-5xl">#{tagname}</div>;
}
