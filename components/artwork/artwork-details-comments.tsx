import React from 'react';
import { CommentsType } from './artwork-details';

type ArtworkDetailsCommentsProps = { comments: CommentsType[] };

export default function ArtworkDetailsComments({ comments }: ArtworkDetailsCommentsProps) {
    return (
        <div className="flex flex-col">
            {comments.map((comment) => (
                <div key={comment.id}>{comment.comment}</div>
            ))}
        </div>
    );
}
