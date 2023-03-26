import { useState, useRef, useEffect } from 'react';
import ArtworkCarousel from '../artwork/artwork-carousel';

type CreatePreviewsProps = {
    imageFiles: FileList | undefined;
    setImageFiles: React.Dispatch<React.SetStateAction<FileList | undefined>>;
};

export default function CreatePreviews({ imageFiles, setImageFiles }: CreatePreviewsProps) {
    const fileImageInputRef = useRef<HTMLInputElement>(null);
    const [previews, setPreviews] = useState<{ name: string; blob: string }[]>();

    const removeImageOnClick = (previewToRemoveName: string): void => {
        const filteredPreviews = previews?.filter((preview) => preview.name !== previewToRemoveName);
        setPreviews(filteredPreviews);
    };

    const isBelowUploadLimit = (files: FileList): boolean => {
        if (files.length > 10) {
            // Toas: Only 10 files are allowed!
            console.log('Only 10 Files are allowed!');
            return false;
        }
        return true;
    };

    // Preview Component
    useEffect(() => {
        if (imageFiles && isBelowUploadLimit(imageFiles)) {
            let imagesArray = Object.entries(imageFiles).map((e) => {
                return {
                    name: e[1].name,
                    blob: URL.createObjectURL(e[1]),
                }; // e[1] is the blob
            });
            setPreviews([...imagesArray]);
        } else {
            setPreviews(undefined);
        }
    }, [imageFiles]);

    return (
        <div className="">
            {!previews && (
                <>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            fileImageInputRef.current?.click();
                        }}
                        className="font-bold text-violet-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-12 h-12"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                        </svg>
                        Upload
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        multiple={true}
                        className="hidden"
                        ref={fileImageInputRef}
                        onChange={(e) => {
                            const files = e?.target.files;
                            if (files) {
                                setImageFiles(files);
                            } else {
                                setImageFiles(undefined);
                            }
                        }}
                    />
                </>
            )}
            {/* Add preview image component that has access to adding more image files */}
            {previews && previews.length > 0 && <ArtworkCarousel imageUrls={previews.map((pre) => pre.blob)} />}
        </div>
    );
}
