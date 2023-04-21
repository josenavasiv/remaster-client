import ArtworkCommentReply from './artwork-comment-reply';
import { ReplyType } from './artwork-comment-reply';
import { useState } from 'react';
import { LikeType } from './artwork-feed';
import { getRelativeDate } from '@/lib/relativeTime';
import CommentReplyInput from '../comment/comment-reply-input';
import CommentDelete from '../comment/comment-delete';
import useUser from '@/lib/hooks/useUser';
import CommentEdit from '../comment/comment-edit';
import CommentReply from '../comment/comment-reply';
import CommentEditInput from '../comment/comment-edit-input';
import CommentLike from '../comment/comment-like';
import CommentUnlike from '../comment/comment-unlike';
import CommentUsername from '../comment/comment-username';
import CommenterCommenterAvatar from '../comment/comment-commenter-avatar';

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
    const user = useUser();
    const [showReplies, setShowReplies] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="bg-rose-200 p-3 rounded-lg">
            <div className="flex justify-between">
                <div className="flex flex-col gap-1 grow">
                    <span className="flex gap-2">
                        <CommenterCommenterAvatar
                            username={comment.commenter.username}
                            avatarUrl={comment.commenter.avatarUrl}
                        />
                        <CommentUsername username={comment.commenter.username} />
                    </span>
                    <span>{comment.comment}</span>
                </div>
                <span className="pt-0.5">
                    {comment.isLikedByLoggedInUser == null ? (
                        <CommentLike commentId={comment.id} commenterId={comment.commenter.id} />
                    ) : (
                        <CommentUnlike
                            commentId={comment.id}
                            commenterId={comment.commenter.id}
                            likeId={comment.isLikedByLoggedInUser.id}
                        />
                    )}
                </span>
                <span className="pt-0.5 flex gap-1 self-start">
                    <CommentEdit isEditing={isEditing} setIsEditing={setIsEditing} commenterId={comment.commenter.id} />
                    <CommentDelete commentId={comment.id} commenterId={comment.commenter.id} />
                </span>
            </div>
            <div className="flex gap-1.5 text-[0.7rem] text-black/60">
                <p>{getRelativeDate(comment.createdAt) ?? 'N/A'}</p>
                <p>{comment.likesCount ?? 'N/A'} Likes</p>
                <CommentReply
                    isReplying={isReplying}
                    setIsReplying={setIsReplying}
                    commenterId={comment.commenter.id}
                />
                {comment.replies.length > 0 && (
                    <button className="text-[0.7rem]" onClick={() => setShowReplies(!showReplies)}>
                        {showReplies ? 'Hide' : 'Show'} Replies ({comment.replies.length})
                    </button>
                )}
            </div>

            {showReplies && (
                <div className="flex flex-col gap-2 ml-9">
                    {comment?.replies.map((reply) => (
                        <ArtworkCommentReply key={reply.id} reply={reply} artworkId={artworkId} />
                    ))}
                </div>
            )}

            {isReplying && (
                <CommentReplyInput
                    artworkId={artworkId}
                    parentCommentId={comment.id}
                    parentComment={{
                        id: comment.id,
                        commenter: { id: comment.commenter.id, username: comment.commenter.username },
                    }}
                />
            )}

            {isEditing && <CommentEditInput commentId={comment.id} comment={comment.comment} />}
        </div>
    );
}
