interface ArtworkDescriptionProps {
    description: string;
}

export default function ArtworkDescription({ description }: ArtworkDescriptionProps): JSX.Element {
    return <div>{description}</div>;
}
