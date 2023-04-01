import { CommentType } from './artwork-comment';
import ArtworkComment from './artwork-comment';

type ArtworkDetailsCommentsProps = { comments: CommentType[]; artworkId: string };

export default function ArtworkDetailsComments({ comments, artworkId }: ArtworkDetailsCommentsProps) {
    return (
        <div className="grow flex flex-col gap-1 h-32 overflow-y-scroll no-scrollbar">
            {comments.map((comment) => (
                <ArtworkComment key={comment.id} comment={comment} artworkId={artworkId} />
            ))}
        </div>
    );
}
