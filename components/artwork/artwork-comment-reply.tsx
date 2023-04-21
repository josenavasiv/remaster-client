import { getRelativeDate } from '@/lib/relativeTime';
import { useState } from 'react';
import CommentDelete from '../comment/comment-delete';
import CommentEdit from '../comment/comment-edit';
import CommentEditInput from '../comment/comment-edit-input';
import CommentLike from '../comment/comment-like';
import CommentReply from '../comment/comment-reply';
import CommentReplyInput from '../comment/comment-reply-input';
import CommentUnlike from '../comment/comment-unlike';
import CommentUsername from '../comment/comment-username';
import { LikeType } from './artwork-feed';
import CommenterCommenterAvatar from '../comment/comment-commenter-avatar';

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
        id: string;
        username: string;
    };
};

export default function ArtworkCommentReply({ reply, artworkId }: ArtworkCommentReplyProps): JSX.Element {
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="bg-violet-100 p-3 rounded-lg">
            <div className="flex justify-between gap-1">
                <div className="flex flex-col gap-1 grow">
                    <span className="flex gap-2">
                        <CommenterCommenterAvatar
                            username={reply.commenter.username}
                            avatarUrl={reply.commenter.avatarUrl}
                        />
                        <CommentUsername username={reply.commenter.username} />
                    </span>
                    <span>
                        <CommentUsername username={reply.parentComment?.commenter.username!} isReply /> {reply.comment}
                    </span>
                </div>
                <span className="pt-0.5">
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
                <span className="pt-0.5 flex gap-1 self-start">
                    <CommentEdit isEditing={isEditing} setIsEditing={setIsEditing} commenterId={reply.commenter.id} />
                    <CommentDelete commentId={reply.id} commenterId={reply.commenter.id} />
                </span>
            </div>
            <div className="flex gap-2 text-[0.7rem] text-black/60">
                <p>{getRelativeDate(reply.createdAt) ?? 'N/A'}</p>
                <p>{reply.likesCount ?? 'N/A'} Likes</p>
                <CommentReply isReplying={isReplying} setIsReplying={setIsReplying} commenterId={reply.commenter.id} />
            </div>
            {isReplying && (
                <CommentReplyInput
                    artworkId={artworkId}
                    parentCommentId={reply.parentCommentId!} // Store reply under the original parent's comment
                    parentComment={{
                        // Essentially replying to this comment -> Notifcations later
                        id: reply.id,
                        commenter: { id: reply.commenter.id, username: reply.commenter.username },
                    }}
                />
            )}
            {isEditing && <CommentEditInput commentId={reply.id} comment={reply.comment} />}
        </div>
    );
}
