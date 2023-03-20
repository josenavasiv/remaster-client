import { UserLoggedInDocument, UserLoggedInQuery, useUserLoginMutation } from '@/graphql/__generated__/graphql';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import TextField from '../input/text-field';
import validator from 'validator';

type LoginFormProps = {};

export default function LoginForm({}: LoginFormProps) {
    const router = useRouter();
    const [userLogin, { data, loading, error }] = useUserLoginMutation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({
        username: false,
        password: false,
    });

    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValidUsername = validator.isLength(username, { min: 3, max: 20 });
        const isValidPassword = validator.isLength(password, { min: 5, max: 20 });

        setErrors({
            username: !isValidUsername,
            password: !isValidPassword,
        });

        if (isValidUsername && isValidPassword) {
            const response = await userLogin({
                variables: {
                    username,
                    password,
                },
                update: (cache, { data }) => {
                    cache.writeQuery<UserLoggedInQuery>({
                        query: UserLoggedInDocument,
                        data: {
                            __typename: 'Query',
                            userLoggedIn: data?.userLogin!,
                        },
                    });
                },
            });

            if (response.data?.userLogin?.errors && response.data.userLogin.errors.length > 0) {
                response.data.userLogin.errors.forEach((error) => {
                    toast.error(error.message);
                });
            } else {
                toast.success('SUCCESSFULLY LOGGED IN!');
                router.push('/');
            }
        }
    };

    return (
        <div className="w-[350px] bg-gray-500 p-5">
            <p className="text-center">REMASTER</p>
            <form onSubmit={onLogin} className="flex flex-col gap-2">
                <TextField
                    setValue={setUsername}
                    label="username"
                    placeholder="username"
                    error={errors.username}
                    errorMessage="Username is invalid"
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
                <input type="submit" value="Login" className="w-full bg-cyan-600 py-2" />
            </form>
        </div>
    );
}