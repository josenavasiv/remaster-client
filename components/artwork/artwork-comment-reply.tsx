import { ReplyType } from './artwork-details';

type ArtworkCommentReplyProps = {
    reply: ReplyType;
};

export default function ArtworkCommentReply({ reply }: ArtworkCommentReplyProps): JSX.Element {
    return <div className=''>{reply.comment}</div>;
}
