import useUser from '@/lib/hooks/useUser';
import { useUserLogoutMutation } from '@/graphql/__generated__/graphql';
import toast from 'react-hot-toast';

type LogoutButtonProps = {};

export default function LogoutButton({}: LogoutButtonProps) {
    const [userLogout, { loading, client }] = useUserLogoutMutation();
    const user = useUser();

    const handleLogout = async () => {
        await userLogout();
        await client.resetStore();
        toast.success('Logged Out!');
    };

    if (!user) return null;

    return <button onClick={handleLogout}>Logout</button>;
}
