interface ArtworkImageCarouselProps {
    imageUrls: string[];
}

export default function ArtworkImageCarousel({ imageUrls }: ArtworkImageCarouselProps): JSX.Element {
    return (
        <div>
            {imageUrls.map((imgUrl) => (
                // Would be own custom image component
                <img src={imgUrl} />
            ))}
        </div>
    );
}
