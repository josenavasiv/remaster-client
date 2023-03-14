interface ArtworkCommentReplyProps {
    id: string;
    comment: string;
    uploader: {
        id: string;
        username: string;
        avatarUrl: string;
    };
}

export default function ArtworkCommentReply(ArtworkCommentReplyProps: ArtworkCommentReplyProps): JSX.Element {
    return <div>ArtworkComment</div>;
}
