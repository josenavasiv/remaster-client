import { getRelativeDate } from '@/lib/relativeTime';
import { useState } from 'react';
import CommentReplyInput from '../comment/comment-reply-input';

export type ReplyType = {
    id: string;
    comment: string;
    commenter: {
        id: string;
        username: string;
        avatarUrl: string;
    };
    parentCommentId?: string | null | undefined;
    parentComment?: parentCommentType | null | undefined;
    isLikedByLoggedInUser?: boolean | null | undefined;
    likesCount: number;
    createdAt: string;
    updatedAt: string;
};

type ArtworkCommentReplyProps = {
    reply: ReplyType;
    artworkId: string;
};

export type parentCommentType = {
    id: string;
    commenter: {
        username: string;
    };
};

export default function ArtworkCommentReply({ reply, artworkId }: ArtworkCommentReplyProps): JSX.Element {
    const [isReplying, setIsReplying] = useState(false);

    return (
        <div>
            <div className="flex justify-between gap-1">
                <div className="grow">
                    <span className="font-bold">{reply.commenter.username} </span>
                    <span className="font-bold">@{reply.parentComment?.commenter.username} </span>
                    <span>{reply.comment}</span>
                </div>
                <span>{reply.isLikedByLoggedInUser ? 'H' : 'h'}</span>
            </div>
            <div className="flex gap-2 font-medium text-[0.7rem] text-black/60">
                <p>{reply.likesCount ?? 'N/A'} Likes</p>
                <p>{getRelativeDate(reply.createdAt) ?? 'N/A'}</p>
                <button className="text-[0.7rem]" onClick={() => setIsReplying(!isReplying)}>
                    {isReplying ? 'Cancel Reply' : 'Reply'}
                </button>
            </div>
            {isReplying && (
                <CommentReplyInput
                    artworkId={artworkId}
                    parentCommentId={reply.parentCommentId!} // Store reply under the original parent's comment
                    parentComment={{ // Essentially replying to this comment -> Notifcations later
                        id: reply.id,
                        commenter: { username: reply.commenter.username },
                    }}
                />
            )}
        </div>
    );
}
