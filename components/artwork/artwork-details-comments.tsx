import React from 'react';
import { CommentType } from './artwork-details';
import ArtworkComment from './artwork-comment';

type ArtworkDetailsCommentsProps = { comments: CommentType[] };

export default function ArtworkDetailsComments({ comments }: ArtworkDetailsCommentsProps) {
    return (
        <div className="flex flex-col">
            {comments.map((comment) => (
                <ArtworkComment key={comment.id} comment={comment} />
            ))}
        </div>
    );
}
