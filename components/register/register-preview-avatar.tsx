import Image from 'next/image';

type RegisterPreviewAvatarProps = {
    avatarSrc: string;
};

export default function RegisterPreviewAvatar({ avatarSrc }: RegisterPreviewAvatarProps) {
    return (
        <Image
            src={avatarSrc}
            height="125"
            width="125"
            alt="Avatar"
            className="rounded-full aspect-square object-cover"
        />
    );
}
