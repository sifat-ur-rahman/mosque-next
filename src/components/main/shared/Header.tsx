import getLoginUserRole from '@/server/actions/users/userRole';
import ResponsiveHeader from '../headerComponent/ResponsiveHeader';

async function Header() {
    const userRole = await getLoginUserRole();
    return <ResponsiveHeader userRole={userRole} />;
}

export default Header;
