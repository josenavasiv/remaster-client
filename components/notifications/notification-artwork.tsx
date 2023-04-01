import Image from 'next/image';

type NotificationArtworkProps = {
    id: string;
    imageUrls: string[];
};

export default function NotificationArtwork({ id, imageUrls }: NotificationArtworkProps) {
    return (
        <div className="shrink w-16 self-center">
            <Image
                src={imageUrls[0]}
                alt={imageUrls[0]}
                height={44}
                width={44}
                className="aspect-square object-cover m-auto"
            />
        </div>
    );
}
