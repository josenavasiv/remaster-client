import { UserLoggedInDocument, UserLoggedInQuery, useUserRegisterMutation } from '@/graphql/__generated__/graphql';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import TextField from '../input/text-field';
import validator from 'validator';
import Link from 'next/link';
import RegisterPreview from './register-preview';

type RegisterFormProps = {};

export default function RegisterForm({}: RegisterFormProps) {
    const router = useRouter();
    const [userRegister, { data, loading, error, client }] = useUserRegisterMutation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageFile, setImageFile] = useState<FileList>(); // Drill into preview component
    // Will move into a custom hook for uploadToStorage
    const [isStoring, SetIsStoring] = useState(false);

    const [errors, setErrors] = useState({
        username: false,
        email: false,
        password: false,
    });

    const onRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValidUsername = validator.isLength(username, { min: 3, max: 20 });
        const isValidEmail = validator.isEmail(email);
        const isValidPassword = validator.isLength(password, { min: 5, max: 20 });

        setErrors({
            username: !isValidUsername,
            email: !isValidEmail,
            password: !isValidPassword,
        });

        if (isValidUsername && isValidPassword && isValidEmail) {
            let avatarUrl: string | null = null;

            if (imageFile) {
                SetIsStoring(true);
                const { urls } = await uploadImageBlobsToStorage(imageFile);
                avatarUrl = urls[0];
                SetIsStoring(false);
            }

            const response = await userRegister({
                variables: {
                    username,
                    email,
                    password,
                    avatarUrl,
                },
                update: (cache, { data }) => {
                    cache.writeQuery<UserLoggedInQuery>({
                        query: UserLoggedInDocument,
                        data: {
                            __typename: 'Query',
                            userLoggedIn: data?.userRegister!,
                        },
                    });
                },
                refetchQueries: ['userFeed', 'notifications'],
            });

            if (response.data?.userRegister?.errors && response.data.userRegister.errors.length > 0) {
                response.data.userRegister.errors.forEach((error) => {
                    toast.error(error.message);
                });
            } else {
                toast.success('SUCCESSFULLY REGISTERED!');
                toast.success(`WELCOME ${response.data?.userRegister.user?.username}!`);
                router.push('/');
            }
        }
    };

    // Returns array of urls
    // Create into a custom hook
    const uploadImageBlobsToStorage = async (imageFiles: FileList): Promise<{ urls: string[] }> => {
        // UPLOAD IMAGES TO BACKEND ON FORM SUBMISSION
        const imageBlobs = new FormData();
        Array.from(imageFiles).map((f, i) => {
            imageBlobs.append(`image${i}`, f);
        });

        const response = await fetch('https://bantlads.com/storage', {
        // const response = await fetch('http://localhost:4000/storage', {
            credentials: 'include',
            method: 'POST',
            body: imageBlobs,
        });

        const imageUrls = await response.json();
        console.log(imageUrls);

        return imageUrls;
    };

    return (
        <div className="w-[350px] bg-gray-200 p-5 rounded-xl">
            <p className="text-center mb-2">REMASTER REGISTER</p>
            <form onSubmit={onRegister} className="flex flex-col gap-2">
                <TextField
                    setValue={setUsername}
                    label="username"
                    placeholder="username"
                    error={errors.username}
                    errorMessage="Username is invalid"
                    required={true}
                />
                <TextField
                    setValue={setEmail}
                    label="email"
                    placeholder="email"
                    error={errors.email}
                    errorMessage="Email is invalid"
                    required={true}
                />
                <TextField
                    setValue={setPassword}
                    type="password"
                    label="password"
                    placeholder="password"
                    error={errors.password}
                    errorMessage="Password is invalid"
                    required={true}
                />
                <div className="flex-1 self-center pb-3">
                    <RegisterPreview imageFile={imageFile} setImageFile={setImageFile} />
                </div>
                <input
                    type="submit"
                    value="Register"
                    className="w-full bg-violet-400 py-2 disabled:bg-violet-900 font-medium rounded-md hover:cursor-pointer"
                    disabled={isStoring || loading}
                />
            </form>
            {(isStoring || loading) && <div>LOADING...</div>}
            <p className="text-center mt-4">
                Have an account?{' '}
                <Link className="font-bold text-violet-800" href={'/login'}>
                    Login Here!
                </Link>
            </p>
        </div>
    );
}
