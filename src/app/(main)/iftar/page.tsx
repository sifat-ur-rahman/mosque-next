import AllIftarComponent from '@/components/main/iftar/AllIftars';
import { getIftarsBySlotId } from '@/server/actions/iftar/getIftar';
import { getActiveSlotByType } from '@/server/actions/slots/getSoltAction';

async function IftarPage() {
    const slotId: any = await getActiveSlotByType('Iftar');
    const allIftars: any = await getIftarsBySlotId(
        slotId ? slotId._id.toString() : '',
    );
    return (
        <div>
            <AllIftarComponent allIftars={allIftars} slot={slotId} />
        </div>
    );
}

export default IftarPage;
