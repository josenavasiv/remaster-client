import ArtworkCommentReply from './artwork-comment-reply';
import { ReplyType } from './artwork-comment-reply';

export type CommentType = {
    id: string;
    comment: string;
    likesCount: number;
    isLikedByLoggedInUser?: boolean | null | undefined;
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
    return (
        <>
            <div>
                <span className="font-bold">{comment.commenter.username} </span>
                {comment.comment}
            </div>
            <div className="flex flex-col indent-8">
                {comment?.replies.map((reply) => (
                    <ArtworkCommentReply key={reply.id} reply={reply} />
                ))}
            </div>
        </>
    );
}
