import React from "react";

type ArtworkFeedTitleProps = {
	title: string;
};

export default function ArtworkFeedTitle({title}: ArtworkFeedTitleProps) {
  return <div>{title}</div>;
}
