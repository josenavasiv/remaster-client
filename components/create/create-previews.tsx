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
        <div>
            {!previews && (
                <>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            fileImageInputRef.current?.click();
                        }}
                        className="w-20 h-20 rounded-full bg-blue-400 m-5"
                    >
                        Add Images
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
