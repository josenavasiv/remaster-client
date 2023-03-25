import { CommentType } from './artwork-comment';
import ArtworkComment from './artwork-comment';

type ArtworkDetailsCommentsProps = { comments: CommentType[] };

export default function ArtworkDetailsComments({ comments }: ArtworkDetailsCommentsProps) {
    return (
        <div className="flex flex-col gap-1">
            {comments.map((comment) => <ArtworkComment key={comment.id} comment={comment} />).reverse()}
        </div>
    );
}
