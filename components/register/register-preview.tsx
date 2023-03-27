import { useState, useRef, useEffect } from 'react';
import RegisterPreviewAvatar from './register-preview-avatar';

type RegisterPreviewProps = {
    imageFile: FileList | undefined;
    setImageFile: React.Dispatch<React.SetStateAction<FileList | undefined>>;
};

export default function RegisterPreview({ imageFile, setImageFile }: RegisterPreviewProps) {
    const fileImageInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<{ name: string; blob: string }[]>();

    // Preview Component
    useEffect(() => {
        if (imageFile) {
            let imagesArray = Object.entries(imageFile).map((e) => {
                return {
                    name: e[1].name,
                    blob: URL.createObjectURL(e[1]),
                }; // e[1] is the blob
            });
            setPreview([...imagesArray]);
        } else {
            setPreview(undefined);
        }
    }, [imageFile]);

    return (
        <div className="">
            {!preview && (
                <>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            fileImageInputRef.current?.click();
                        }}
                        className="font-bold text-violet-500 flex flex-col"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-12 h-12 self-center"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        Upload Avatar
                    </button>
                </>
            )}
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileImageInputRef}
                onChange={(e) => {
                    const files = e?.target.files;
                    if (files) {
                        setImageFile(files);
                    } else {
                        setImageFile(undefined);
                    }
                }}
            />
            {/* Add preview image component that has access to adding more image files */}
            {preview && (
                <div
                    className="w-[125px] h-[125px] hover:cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        fileImageInputRef.current?.click();
                    }}
                >
                    <RegisterPreviewAvatar avatarSrc={preview[0].blob} />
                </div>
            )}
        </div>
    );
}
