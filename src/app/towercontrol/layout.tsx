import AccessDenied from '@/components/common/AccessDenied';
import { TowerControlSidebar } from '@/components/towercontrol/common/TowercontrolSidebar';
import { TowerControlTopBar } from '@/components/towercontrol/common/TowercontrolTopbar';
import getLoginUserRole from '@/server/actions/users/userRole';
import isLogin from '@/utils/isLogin';
import type { ReactNode } from 'react';

async function TowerControlLayout({ children }: { children: ReactNode }) {
    const loginUserRole = await getLoginUserRole();
    //  console.log(loginUserRole);
    if (loginUserRole !== 'Admin') return <AccessDenied />;

    return (
        <div className="flex min-h-screen bg-[#29173f]">
            <TowerControlSidebar />

            {/* Main Content */}
            <div className="flex-1 lg:ml-64">
                <TowerControlTopBar />

                <main className="">{children}</main>
            </div>
        </div>
    );
}

export default isLogin(TowerControlLayout);
