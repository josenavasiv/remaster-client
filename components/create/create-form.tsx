import { UserFeedDocument, UserFeedQuery, useArtworkCreateMutation } from '@/graphql/__generated__/graphql';
import { useRouter } from 'next/router';
import { useState } from 'react';
import TextField from '../input/text-field';
import validator from 'validator';
import CreatePreviews from './create-previews';

type CreateFormProps = {};

// This includes the image uploading, previews, and everything
export default function CreateForm({}: CreateFormProps) {
    const router = useRouter();
    const [artworkCreate, { data, loading, error }] = useArtworkCreateMutation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFiles, setImageFiles] = useState<FileList>(); // Drill into preview component

    const [errors, setErrors] = useState({
        title: false,
        description: false,
    });

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        const isValidTitle = validator.isLength(title, { min: 3, max: 30 });
        const isValidDescription = validator.isLength(description, { min: 5, max: 300 });

        setErrors({
            title: !isValidTitle,
            description: !isValidDescription,
        });

        if (isValidTitle && isValidDescription && imageFiles) {
            const { urls } = await uploadImageBlobsToStorage(imageFiles);

            const response = await artworkCreate({
                variables: {
                    title,
                    description,
                    imageUrls: urls,
                },
                update: (cache, { data }) => {
                    // WANT TO USE THE CACHE UPDATE
                    // if (data) {
                    //     const UFQ = cache.readQuery<UserFeedQuery>({ query: UserFeedDocument });
                    //     console.log('UFQ');
                    //     console.log(UFQ);
                    //     UFQ?.userFeed.artworks;
                    //     const UFQUserFeed = console.log('DATA');
                    //     console.log(data);
                    //     cache.writeQuery<UserFeedQuery>({
                    //         query: UserFeedDocument,
                    //         data: {
                    //             userFeed: {
                    //                 errors: UFQ?.userFeed.errors!,
                    //                 artworks: [{ ...data?.artworkCreate.artwork!, __typename: 'Artwork' }],
                    //                 hasMore: UFQ?.userFeed.hasMore!,
                    //             },
                    //         },
                    //     });
                    //     const UFQ2 = cache.readQuery<UserFeedQuery>({ query: UserFeedDocument });
                    //     console.log(UFQ2);
                    // }
                },
            });

            // if (response.data?.artworkCreate?.errors && response.data.userLogin.errors.length > 0) {
            //     response.data.userLogin.errors.forEach((error) => {
            //         toast.error(error.message);
            //     });
            // } else {
            //     toast.success('SUCCESSFULLY LOGGED IN!');
            //     router.push('/');
            // }
        }
    };

    // console.log(imageFiles); Re-renders due to useState of TextField

    // Returns array of urls
    const uploadImageBlobsToStorage = async (imageFiles: FileList): Promise<{ urls: string[] }> => {
        // UPLOAD IMAGES TO BACKEND ON FORM SUBMISSION
        const imageBlobs = new FormData();
        Array.from(imageFiles).map((f, i) => {
            imageBlobs.append(`image${i}`, f);
        });

        const response = await fetch('http://localhost:4000/storage', {
            credentials: 'include',
            method: 'POST',
            body: imageBlobs,
        });

        const imageUrls = await response.json();
        console.log(imageUrls);

        return imageUrls;
    };

    return (
        <div className="w-[350px] sm:w-[700px] bg-gray-500 p-5">
            <p className="text-center">CREATE ARTWORK</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <CreatePreviews imageFiles={imageFiles} setImageFiles={setImageFiles} />
                </div>

                <div className="flex-1 flex flex-col">
                    <TextField
                        setValue={setTitle}
                        label="Title"
                        placeholder="Title"
                        error={errors.title}
                        errorMessage="Title is invalid"
                        required={true}
                    />
                    <TextField
                        setValue={setDescription}
                        label="Description"
                        placeholder="Description"
                        error={errors.description}
                        errorMessage="Description is invalid"
                        required={true}
                    />
                    <input type="submit" value="Create Artwork" className="w-full bg-cyan-600 py-2" />
                </div>
            </form>
        </div>
    );
}
