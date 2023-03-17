import Image from 'next/image';

interface ArtworkCarouselImageProps {
    imageUrls: string[];
}

export default function ArtworkCarouselImage({ imageUrls }: ArtworkCarouselImageProps): JSX.Element {
    return (
        <div className="w-[350px] h-[526px] rounded-lg bg-black relative">
            <Image src={imageUrls[0]} alt="" fill={true} className="object-contain rounded-lg" />
        </div>
        // <img
        //     src={imageUrls[0]}
        //     className="w-full h-full max-w-[350px] max-h-[526px] object-contain rounded-lg bg-black"
        // />
    );
}

/* {imageUrls.map((imgUrl) => (
                // Would be own custom image component
                <img src={imgUrl} />
            ))} */
