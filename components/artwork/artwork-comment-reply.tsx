export type ReplyType = {
    id: string;
    comment: string;
    commenter: {
        id: string;
        username: string;
        avatarUrl: string;
    };
    parentCommentId?: string | null | undefined;
    isLikedByLoggedInUser?: boolean | null | undefined;
    likesCount: number;
    createdAt: string;
    updatedAt: string;
};

type ArtworkCommentReplyProps = {
    reply: ReplyType;
};

export default function ArtworkCommentReply({ reply }: ArtworkCommentReplyProps): JSX.Element {
    return <div className="">{reply.comment}</div>;
}
