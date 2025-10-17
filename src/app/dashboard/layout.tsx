import { DashboardSidebar } from '@/components/dashboard/common/Sidebar';
import { DashboardTopbar } from '@/components/dashboard/common/Topbar';
import getUserProfile from '@/server/actions/users/getUsersProfile';
import isLogin from '@/utils/isLogin';
import type { ReactNode } from 'react';

async function DashboardLayout({ children }: { children: ReactNode }) {
    const userinfo = await getUserProfile();
    //console.log(loginUserRole);
    return (
        <div className="flex min-h-screen bg-[#29173f]">
            <DashboardSidebar userInfo={userinfo ?? ''} />

            {/* Main Content */}
            <div className="flex-1 lg:ml-64">
                <DashboardTopbar />

                <main className="">{children}</main>
            </div>
        </div>
    );
}

export default isLogin(DashboardLayout);
