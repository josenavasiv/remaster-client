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
        <div className="overflow-hidden relative rounded-md">
            <div
                style={{ transform: `translateX(-${current * 100}%)` }}
                className="flex transition-transform ease-in-out duration-300 w-[350px] h-[526px]"
            >
                {imageUrls.map((imageUrl, i) => (
                    <Image
                        key={i}
                        src={imageUrl}
                        alt={`${imageUrl}`}
                        width={350}
                        height={526}
                        className="object-contain bg-black aspect-square"
                        priority
                    />
                    // <Image
                    //     key={imageUrl}
                    //     src={imageUrl}
                    //     alt={`${imageUrl}`}
                    //     width={350}
                    //     height={526}
                    //     className="object-contain bg-black"
                    // />
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-between">
                <button onClick={prev} className="ml-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 text-white"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <button onClick={next} className="mr-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 text-white"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                            clipRule="evenodd"
                        />
                    </svg>
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
