import { User } from '@/graphql/__generated__/graphql';

type ArtworkUploaderProps = Pick<User, 'id' | 'username' | 'avatarUrl'>;

export default function ArtworkUploader({ id, username, avatarUrl }: ArtworkUploaderProps) {
    return <div>ArtworkUploader</div>;
}
