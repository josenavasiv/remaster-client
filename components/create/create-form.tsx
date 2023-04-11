import { useArtworkCreateMutation } from '@/graphql/__generated__/graphql';
import { useRouter } from 'next/router';
import { useState } from 'react';
import TextField from '../input/text-field';
import TextAreaField from '../input/textarea-field';
import validator from 'validator';
import CreatePreviews from './create-previews';
import toast from 'react-hot-toast';

type CreateFormProps = {
    closeModal: () => void;
};

// This includes the image uploading, previews, and everything
export default function CreateForm({ closeModal }: CreateFormProps) {
    const router = useRouter();
    const [artworkCreate, { data, loading, error }] = useArtworkCreateMutation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFiles, setImageFiles] = useState<FileList>(); // Drill into preview component
    // Will move into a custom hook for uploadToStorage
    const [isStoring, SetIsStoring] = useState(false);

    const [errors, setErrors] = useState({
        title: false,
        description: false,
    });

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        const isValidTitle = validator.isLength(title, { min: 3, max: 30 });
        const isValidDescription = validateDescription(description);

        setErrors({
            title: !isValidTitle,
            description: !isValidDescription,
        });

        if (isValidTitle && isValidDescription && imageFiles) {
            SetIsStoring(true);
            const { urls } = await uploadImageBlobsToStorage(imageFiles);
            SetIsStoring(false);

            const response = await artworkCreate({
                variables: {
                    title,
                    description,
                    imageUrls: urls,
                },
                refetchQueries: ['userFeed'],
            });

            if (response.data?.artworkCreate?.errors && response.data.artworkCreate.errors.length > 0) {
                response.data.artworkCreate.errors.forEach((error) => {
                    toast.error(error.message);
                });
            } else {
                toast.success(`Created ${response.data?.artworkCreate.artwork?.title}`);
                closeModal();
                if (router.pathname === '/') {
                    return;
                } else {
                    router.push(`/artwork/${response.data?.artworkCreate.artwork?.id}`);
                }
            }
        }
    };

    // console.log(imageFiles); Re-renders due to useState of TextField

    // Returns array of urls
    // Create into a custom hook
    const uploadImageBlobsToStorage = async (imageFiles: FileList): Promise<{ urls: string[] }> => {
        // UPLOAD IMAGES TO BACKEND ON FORM SUBMISSION
        const imageBlobs = new FormData();
        Array.from(imageFiles).map((f, i) => {
            imageBlobs.append(`image${i}`, f);
        });

        const response = await fetch(
            process.env.NODE_ENV == 'production'
                ? (process.env.NEXT_PUBLIC_STORAGE as string)
                : (process.env.NEXT_PUBLIC_DEVELOPMENT_STORAGE as string),
            {
                // const response = await fetch('http://localhost:4000/storage', {
                credentials: 'include',
                method: 'POST',
                body: imageBlobs,
            }
        );

        const imageUrls = await response.json();
        console.log(imageUrls);

        return imageUrls;
    };

    const validateDescription = (desc: string): Boolean => {
        return validator.isLength(description, { min: 5, max: 300 }) && (desc.match(/#/g) || []).length <= 10;
    };

    return (
        <div className="w-[350px] sm:w-[750px] bg-gray-200 p-5 rounded-xl">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex-1 self-center">
                    <CreatePreviews imageFiles={imageFiles} setImageFiles={setImageFiles} />
                </div>
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
                    <p className="">CREATE ARTWORK</p>
                    <div className="flex flex-col text-left">
                        <TextField
                            setValue={setTitle}
                            label="Title"
                            placeholder="Title your masterpiece!"
                            error={errors.title}
                            errorMessage="Title is invalid"
                            required={true}
                        />
                        <TextAreaField
                            setValue={setDescription}
                            label="Description"
                            placeholder="Describe your artworks!"
                            error={errors.description}
                            errorMessage="Description is invalid"
                            required={true}
                        />
                        <input
                            type="submit"
                            value="Create Artwork"
                            className="w-full bg-violet-400 py-2 disabled:bg-violet-900 font-medium rounded-md hover:cursor-pointer"
                            disabled={isStoring || loading}
                        />
                        {(isStoring || loading) && <div>LOADING...</div>}
                    </div>
                </form>
            </div>
        </div>
    );
}
