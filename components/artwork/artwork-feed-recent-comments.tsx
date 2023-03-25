import { RecentCommentType } from './artwork-feed';
import Link from 'next/link';

type ArtworkFeedRecentCommentsProps = {
    recentComments: RecentCommentType[];
};

export default function ArtworkFeedRecentComments({ recentComments }: ArtworkFeedRecentCommentsProps) {
    return (
        <div>
            {recentComments
                .map((recentComment) => (
                    <div key={recentComment.id} className="flex ">
                        <p>
                            <Link href={`/user/${recentComment.commenter.username}`} className="font-medium">
                                {recentComment.commenter.username}
                            </Link>{' '}
                            {recentComment.comment}
                        </p>
                    </div>
                ))
                .reverse()}
        </div>
    );
}
