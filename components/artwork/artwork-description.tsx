import { linkifyTags } from '@/lib/linkifyTags';
import { Fragment } from 'react';

interface ArtworkDescriptionProps {
    description: string;
    username: string;
}

export default function ArtworkDescription({ description, username }: ArtworkDescriptionProps): JSX.Element {
    const words = description.split(' ');

    return (
        <div className="">
            <span className="font-bold ">{username} </span>
            {words.map((word, index) => (
                <Fragment key={index}>{linkifyTags(word)} </Fragment>
            ))}
        </div>
    );
}
