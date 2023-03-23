import React from 'react';
import { useState } from 'react';
import Image from 'next/image';

type ArtworkCarouselProps = {
    imageUrls: string[];
};

export default function ArtworkCarousel({ imageUrls }: ArtworkCarouselProps) {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((current) => (current === 0 ? imageUrls.length - 1 : current - 1));
    const next = () => setCurrent((current) => (current === imageUrls.length - 1 ? 0 : current + 1));

    return (
        <div className="overflow-hidden relative">
            <div
                style={{ transform: `translateX(-${current * 100}%)` }}
                className="flex transition-transform ease-out duration-500 w-[350px] h-[526px]"
            >
                {imageUrls.map((imageUrl, i) => (
                    <Image
                        key={imageUrl}
                        src={imageUrl}
                        alt={`${imageUrl}`}
                        width={350}
                        height={526}
                        className="object-contain bg-black"
                    />
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-between">
                <button onClick={prev} className="w-6 ml-4 bg-white">
                    left
                </button>
                <button onClick={next} className="w-6 mr-4 bg-white">
                    right
                </button>
            </div>

            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {imageUrls.map((_, index) => (
                        <div
                            key={index}
                            className={`transition-all w-2 h-2 bg-white rounded-full ${
                                current === index ? 'p-1' : 'bg-opacity-50'
                            }`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
