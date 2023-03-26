import ArtworkCommentReply from './artwork-comment-reply';
import { ReplyType } from './artwork-comment-reply';
import { useState } from 'react';
import { LikeType } from './artwork-feed';
import { getRelativeDate } from '@/lib/relativeTime';
import CommentReplyInput from '../comment/comment-reply-input';

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
    artworkId: string;
};

export default function ArtworkComment({ comment, artworkId }: ArtworkCommentProps): JSX.Element {
    const [showReplies, setShowReplies] = useState(false);
    const [isReplying, setIsReplying] = useState(false);

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
                <button className="text-[0.7rem]" onClick={() => setIsReplying(!isReplying)}>
                    {isReplying ? 'Cancel Reply' : 'Reply'}
                </button>
                {comment.replies.length > 0 && (
                    <button className="text-[0.7rem]" onClick={() => setShowReplies(!showReplies)}>
                        {showReplies ? 'Hide' : 'Show'} Replies ({comment.replies.length})
                    </button>
                )}
            </div>

            {showReplies && (
                <div className="flex flex-col gap-2 pb-2 ml-8">
                    {comment?.replies.map((reply) => (
                        <ArtworkCommentReply key={reply.id} reply={reply} artworkId={artworkId} />
                    ))}
                </div>
            )}

            {isReplying && (
                <CommentReplyInput
                    artworkId={artworkId}
                    parentCommentId={comment.id}
                    parentComment={{ id: comment.id, commenter: { username: comment.commenter.username } }}
                />
            )}
        </div>
    );
}
