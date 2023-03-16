import Image from 'next/image';

interface ArtworkImageCarouselProps {
    imageUrls: string[];
}

export default function ArtworkImageCarousel({ imageUrls }: ArtworkImageCarouselProps): JSX.Element {
    return <img src={imageUrls[0]} className="w-full h-full max-h-[526px] object-contain rounded-md" />;
}

/* {imageUrls.map((imgUrl) => (
                // Would be own custom image component
                <img src={imgUrl} />
            ))} */
