import { getRelativeDate } from '@/lib/relativeTime';
import { useState } from 'react';
import CommentDelete from '../comment/comment-delete';
import CommentEdit from '../comment/comment-edit';
import CommentEditInput from '../comment/comment-edit-input';
import CommentLike from '../comment/comment-like';
import CommentReply from '../comment/comment-reply';
import CommentReplyInput from '../comment/comment-reply-input';
import CommentUnlike from '../comment/comment-unlike';
import { LikeType } from './artwork-feed';

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
    isLikedByLoggedInUser?: LikeType | null | undefined;
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
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div>
            <div className="flex justify-between gap-1">
                <div className="grow">
                    <span className="font-bold">{reply.commenter.username} </span>
                    <span className="font-bold">@{reply.parentComment?.commenter.username} </span>
                    <span>{reply.comment}</span>
                </div>
                <span className="self-center">
                    {reply.isLikedByLoggedInUser == null ? (
                        <CommentLike commentId={reply.id} commenterId={reply.commenter.id} />
                    ) : (
                        <CommentUnlike
                            commentId={reply.id}
                            commenterId={reply.commenter.id}
                            likeId={reply.isLikedByLoggedInUser.id}
                        />
                    )}
                </span>
            </div>
            <div className="flex gap-2 text-[0.7rem] text-black/60">
                <p>{reply.likesCount ?? 'N/A'} Likes</p>
                <p>{getRelativeDate(reply.createdAt) ?? 'N/A'}</p>
                <CommentReply isReplying={isReplying} setIsReplying={setIsReplying} commenterId={reply.commenter.id} />
                <CommentEdit isEditing={isEditing} setIsEditing={setIsEditing} commenterId={reply.commenter.id} />
                <CommentDelete commentId={reply.id} commenterId={reply.commenter.id} />
            </div>
            {isReplying && (
                <CommentReplyInput
                    artworkId={artworkId}
                    parentCommentId={reply.parentCommentId!} // Store reply under the original parent's comment
                    parentComment={{
                        // Essentially replying to this comment -> Notifcations later
                        id: reply.id,
                        commenter: { username: reply.commenter.username },
                    }}
                />
            )}
            {isEditing && <CommentEditInput commentId={reply.id} comment={reply.comment} />}
        </div>
    );
}
