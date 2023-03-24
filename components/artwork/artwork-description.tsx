import { linkifyTags } from '@/lib/linkifyTags';
import { Fragment } from 'react';

interface ArtworkDescriptionProps {
    description: string;
}

export default function ArtworkDescription({ description }: ArtworkDescriptionProps): JSX.Element {
    const words = description.split(' ');

    return (
        <div className="">
            {words.map((word, index) => (
                <Fragment key={index}>{linkifyTags(word)} </Fragment>
            ))}
        </div>
    );
}
