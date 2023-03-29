import Link from "next/link";

type ArtworkFeedTitleProps = {
	id: string;
	title: string;
};

export default function ArtworkFeedTitle({id, title}: ArtworkFeedTitleProps) {
  return <Link className="font-extrabold text-lg" href={`/artwork/${id}`}>{title}</Link>;
}
