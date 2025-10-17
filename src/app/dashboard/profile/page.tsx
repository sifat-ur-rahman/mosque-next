import UserProfile from '@/components/common/UserProfile';
import getUserProfile from '@/server/actions/users/getUsersProfile';

async function UserProfilePage() {
    const user = await getUserProfile();
    return (
        <>
            <UserProfile user={user} />
        </>
    );
}

export default UserProfilePage;
