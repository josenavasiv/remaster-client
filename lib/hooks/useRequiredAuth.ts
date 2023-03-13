import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserLoggedInQuery } from '@/graphql/__generated__/graphql';

const useRequiredAuth = () => {
    const { data, loading } = useUserLoggedInQuery();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !data?.userLoggedIn.user) {
            router.replace('/');
            // router.replace('/login?next=' + router.pathname);
        }
    }, [data, loading, router]);

    return data?.userLoggedIn.user;
};

export default useRequiredAuth;
