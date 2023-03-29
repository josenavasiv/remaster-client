import { useArtworkUpdateMutation } from '@/graphql/__generated__/graphql';
import { useRouter } from 'next/router';
import { useState } from 'react';
import TextField from '../input/text-field';
import TextAreaField from '../input/textarea-field';
import validator from 'validator';
import toast from 'react-hot-toast';

type EditFormProps = {
    artworkId: string;
    titleToEdit: string;
    descriptionToEdit: string;
    imageUrls: string[];
    closeModal: () => void;
};

// This includes the image uploading, previews, and everything
export default function EditForm({ artworkId, titleToEdit, descriptionToEdit, imageUrls, closeModal }: EditFormProps) {
    const router = useRouter();
    const [artworkUpdate, { data, loading, error }] = useArtworkUpdateMutation();
    const [title, setTitle] = useState(titleToEdit);
    const [description, setDescription] = useState(descriptionToEdit);

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

        if (isValidTitle && isValidDescription) {
            const response = await artworkUpdate({
                variables: {
                    artworkId,
                    title,
                    description,
                    imageUrls,
                },
                refetchQueries: ['userFeed'],
            });

            if (response.data?.artworkUpdate?.errors && response.data.artworkUpdate.errors.length > 0) {
                response.data.artworkUpdate.errors.forEach((error) => {
                    toast.error(error.message);
                });
            } else {
                toast.success(`Edited ${response.data?.artworkUpdate.artwork?.title}`);
                closeModal();
                if (router.pathname === '/') {
                    return;
                } else {
                    router.push(`/artwork/${response.data?.artworkUpdate.artwork?.id}`);
                }
            }
        }
    };

    const validateDescription = (desc: string): Boolean => {
        return validator.isLength(description, { min: 5, max: 300 }) && (desc.match(/#/g) || []).length <= 10;
    };

    return (
        <div className="w-[350px] bg-gray-200 p-5 rounded-xl">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
                    <p className="text-center font-bold">Editing Artwork</p>
                    <div className="flex flex-col text-left">
                        <TextField
                            value={title}
                            setValue={setTitle}
                            label="Title"
                            placeholder={title}
                            error={errors.title}
                            errorMessage="Title is invalid"
                            required={true}
                        />
                        <TextAreaField
                            value={description}
                            setValue={setDescription}
                            label="Description"
                            placeholder={description}
                            error={errors.description}
                            errorMessage="Description is invalid"
                            required={true}
                        />
                        <input
                            type="submit"
                            value="Edit Artwork"
                            className="w-full bg-violet-400 py-2 disabled:bg-violet-900 font-medium rounded-md hover:cursor-pointer"
                            disabled={loading}
                        />
                        {loading && <div>LOADING...</div>}
                    </div>
                </form>
            </div>
        </div>
    );
}
