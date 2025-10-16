import { DashboardSidebar } from '@/components/dashboard/common/Sidebar';
import { DashboardTopbar } from '@/components/dashboard/common/Topbar';
import isLogin from '@/utils/isLogin';
import type { ReactNode } from 'react';

function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-[#29173f]">
            <DashboardSidebar />

            {/* Main Content */}
            <div className="flex-1 lg:ml-64">
                <DashboardTopbar />

                <main className="">{children}</main>
            </div>
        </div>
    );
}

export default isLogin(DashboardLayout);
