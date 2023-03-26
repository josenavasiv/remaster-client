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
        <div className="">
            <div className="flex justify-between gap-1">
                <div className="grow">
                    <span className="font-bold">{comment.commenter.username} </span>
                    <span>{comment.comment}</span>
                </div>
                <span className="self-center">
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
            </div>
            <div className="flex gap-1.5  text-[0.7rem] pb-2 text-black/60">
                <p>{comment.likesCount ?? 'N/A'} Likes</p>
                <p>{getRelativeDate(comment.createdAt) ?? 'N/A'}</p>
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
                <CommentEdit isEditing={isEditing} setIsEditing={setIsEditing} commenterId={comment.commenter.id} />
                <CommentDelete commentId={comment.id} commenterId={comment.commenter.id} />
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

            {isEditing && <CommentEditInput commentId={comment.id} comment={comment.comment} />}
        </div>
    );
}
