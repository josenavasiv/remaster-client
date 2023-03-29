import { RecentCommentType } from './artwork-feed';
import Link from 'next/link';
import CommentLike from '../comment/comment-like';
import CommentUnlike from '../comment/comment-unlike';
import CommentUsername from '../comment/comment-username';

type ArtworkFeedRecentCommentsProps = {
    recentComments: RecentCommentType[];
};

export default function ArtworkFeedRecentComments({ recentComments }: ArtworkFeedRecentCommentsProps) {
    return (
        <div className="flex flex-col gap-1">
            {recentComments
                .map((recentComment) => (
                    <div key={recentComment.id} className="flex justify-between">
                        <span>
                            <CommentUsername username={recentComment.commenter.username} /> {recentComment.comment}
                        </span>
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
