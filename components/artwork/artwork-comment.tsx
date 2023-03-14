interface ArtworkCommentProps {
    id: string;
    comment: string;
    uploader: {
        id: string;
        username: string;
        avatarUrl: string;
    };
}

export default function ArtworkComment(ArtworkCommentProps: ArtworkCommentProps): JSX.Element {
    return <div>ArtworkComment</div>;
}
