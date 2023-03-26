import { getRelativeDate } from '@/lib/relativeTime';

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
    return (
        <div>
            <div className="flex justify-between gap-1">
                <div className="grow">
                    <span className="font-bold">{reply.commenter.username} </span>
                    <span className="font-bold">@{reply.parentCommentId} </span>
                    <span>{reply.comment}</span>
                </div>
                <span>{reply.isLikedByLoggedInUser ? 'H' : 'h'}</span>
            </div>
            <div className="flex gap-2 font-medium text-[0.7rem] text-black/60">
                <p>{reply.likesCount ?? 'N/A'} Likes</p>
                <p>{getRelativeDate(reply.createdAt) ?? 'N/A'}</p>
            </div>
        </div>
    );
}
