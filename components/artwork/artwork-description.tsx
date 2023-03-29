import { linkifyTags } from '@/lib/linkifyTags';
import { Fragment } from 'react';
import CommentUsername from '../comment/comment-username';

interface ArtworkDescriptionProps {
    description: string;
    username: string;
}

export default function ArtworkDescription({ description, username }: ArtworkDescriptionProps): JSX.Element {
    const words = description.split(' ');
    return (
        <div className="">
            <span>
                <CommentUsername username={username} />{' '}
                {words.map((word, index) => (
                    <Fragment key={index}>{linkifyTags(word)} </Fragment>
                ))}
            </span>
        </div>
    );
}
