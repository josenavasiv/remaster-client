import ArtworkCommentReply from './artwork-comment-reply';
import { ReplyType } from './artwork-comment-reply';
import { useState } from 'react';
import { LikeType } from './artwork-feed';
import { getRelativeDate } from '@/lib/relativeTime';

export type CommentType = {
    id: string;
    comment: string;
    likesCount: number;
    isLikedByLoggedInUser?: LikeType | null | undefined;
    commenter: {
        id: string;
        username: string;
        avatarUrl: string;
    };
    replies: ReplyType[];
    createdAt: string;
    updatedAt: string;
};

type ArtworkCommentProps = {
    comment: CommentType;
};

export default function ArtworkComment({ comment }: ArtworkCommentProps): JSX.Element {
    const [showReplies, setShowReplies] = useState(false);

    return (
        <div className="">
            <div className="flex justify-between gap-1">
                <div className="grow">
                    <span className="font-bold">{comment.commenter.username} </span>
                    <span>{comment.comment}</span>
                </div>
                <span>{comment.isLikedByLoggedInUser ? 'H' : 'h'}</span>
            </div>
            <div className="flex gap-2 font-medium text-[0.7rem] pb-2 text-black/60">
                <p>{comment.likesCount ?? 'N/A'} Likes</p>
                <p>{getRelativeDate(comment.createdAt) ?? 'N/A'}</p>
                {comment.replies.length > 0 && (
                    <button className="text-[0.7rem]" onClick={() => setShowReplies(!showReplies)}>
                        {showReplies ? 'Hide' : 'Show'} Replies ({comment.replies.length})
                    </button>
                )}
            </div>

            {showReplies && (
                <div className="flex flex-col gap-2 pb-2 ml-8">
                    {comment?.replies.map((reply) => (
                        <ArtworkCommentReply key={reply.id} reply={reply} />
                    ))}
                </div>
            )}
        </div>
    );
}
