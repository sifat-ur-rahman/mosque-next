import DashboardIftarComponent from '@/components/dashboard/iftar/DashboardIftarComponent';
import { getIftarsBySlotId } from '@/server/actions/iftar/getIftar';
import { getActiveSlotByType } from '@/server/actions/slots/getSoltAction';
import { IIftar } from '@/server/model/iftar/IftarType';

async function DashboardIftarPage() {
    const slotId: any = await getActiveSlotByType('Iftar');
    const allIftars = await getIftarsBySlotId(
        slotId ? slotId._id.toString() : '',
    );

    return (
        <div>
            <DashboardIftarComponent
                slot={slotId}
                allIftars={allIftars as IIftar[]}
            />
        </div>
    );
}

export default DashboardIftarPage;
