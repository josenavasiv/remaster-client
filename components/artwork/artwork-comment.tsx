import ArtworkCommentReply from './artwork-comment-reply';
import { CommentType } from './artwork-details';

type ArtworkCommentProps = {
    comment: CommentType;
};

export default function ArtworkComment({ comment }: ArtworkCommentProps): JSX.Element {
    return (
        <>
            <div>{comment.comment}</div>
            <div className="flex flex-col indent-8">
                {comment?.replies.map((reply) => (
                    <ArtworkCommentReply key={reply.id} reply={reply} />
                ))}
            </div>
        </>
    );
}
