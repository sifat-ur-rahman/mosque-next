import AllUsersComponent from '@/components/towercontrol/users/AllUsersComponent';
import getAllUsersAction from '@/server/actions/users/getAllUsersAction';

async function AllUsers() {
    const users = await getAllUsersAction();
    return (
        <>
            <AllUsersComponent users={users} />
        </>
    );
}

export default AllUsers;
