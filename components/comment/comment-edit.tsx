import useUser from '@/lib/hooks/useUser';
import { Dispatch, SetStateAction } from 'react';

type CommentEditProps = {
    isEditing: boolean;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    commenterId: string;
};

export default function CommentEdit({ isEditing, setIsEditing, commenterId }: CommentEditProps) {
    const user = useUser();
    if (!user || commenterId !== user.id) return null;

    return (
        <button className="text-[0.7rem]" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel Edit' : 'Edit'}
        </button>
    );
}
