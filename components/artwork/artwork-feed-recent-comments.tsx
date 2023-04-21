import { RecentCommentType } from './artwork-feed';
import CommentLike from '../comment/comment-like';
import CommentUnlike from '../comment/comment-unlike';
import CommentUsername from '../comment/comment-username';
import CommenterCommenterAvatar from '../comment/comment-commenter-avatar';
import truncateString from '@/lib/truncateString';

type ArtworkFeedRecentCommentsProps = {
    recentComments: RecentCommentType[];
};

export default function ArtworkFeedRecentComments({ recentComments }: ArtworkFeedRecentCommentsProps) {
    return (
        <div className="flex flex-col gap-1">
            {recentComments
                .map((recentComment) => (
                    <div key={recentComment.id} className="flex justify-between bg-rose-200 p-2 rounded-lg">
                        <div className="flex flex-col gap-1 grow">
                            <span className="flex gap-2">
                                <CommenterCommenterAvatar
                                    username={recentComment.commenter.username}
                                    avatarUrl={recentComment.commenter.avatarUrl}
                                />
                                <CommentUsername username={recentComment.commenter.username} />
                                <span className="my-auto">{truncateString(recentComment.comment, 20)}</span>
                            </span>
                        </div>

                        <span className="flex self-center">
                            {recentComment.isLikedByLoggedInUser == null ? (
                                <CommentLike commentId={recentComment.id} commenterId={recentComment.commenter.id} />
                            ) : (
                                <CommentUnlike
                                    commentId={recentComment.id}
                                    commenterId={recentComment.commenter.id}
                                    likeId={recentComment.isLikedByLoggedInUser.id}
                                />
                            )}
                        </span>
                    </div>
                ))
                .reverse()}
        </div>
    );
}
