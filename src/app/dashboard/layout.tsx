import { DashboardSidebar } from '@/components/dashboard/common/Sidebar';
import { DashboardTopbar } from '@/components/dashboard/common/Topbar';
import getLoginUserRole from '@/server/actions/users/userRole';
import isLogin from '@/utils/isLogin';
import type { ReactNode } from 'react';

async function DashboardLayout({ children }: { children: ReactNode }) {
    const loginUserRole = await getLoginUserRole();
    console.log(loginUserRole);
    return (
        <div className="flex min-h-screen bg-[#29173f]">
            <DashboardSidebar loginUserRole={loginUserRole ?? ''} />

            {/* Main Content */}
            <div className="flex-1 lg:ml-64">
                <DashboardTopbar />

                <main className="">{children}</main>
            </div>
        </div>
    );
}

export default isLogin(DashboardLayout);
