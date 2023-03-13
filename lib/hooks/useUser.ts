import { useUserLoggedInQuery } from '@/graphql/__generated__/graphql';

const useUser = () => {
    const { data, loading } = useUserLoggedInQuery();

    return data?.userLoggedIn.user;
};

export default useUser;
