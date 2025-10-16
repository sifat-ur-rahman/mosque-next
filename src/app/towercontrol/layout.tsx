import { TowerControlSidebar } from '@/components/towercontrol/common/TowercontrolSidebar';
import { TowerControlTopBar } from '@/components/towercontrol/common/TowercontrolTopbar';
import isLogin from '@/utils/isLogin';
import type { ReactNode } from 'react';

function TowerControlLayout({ children }: { children: ReactNode }) {
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
