import QurbaniComponent from '@/components/main/qurbani/QurbaniComponent';
import { getFamilyWithQurbaniBySlotId } from '@/server/actions/family/getFamiliesAction';
import { getActiveSlotByType } from '@/server/actions/slots/getSoltAction';

async function QurbaniPage() {
    const slotId: any = await getActiveSlotByType('Qurbani');
    const res = await getFamilyWithQurbaniBySlotId(
        slotId ? slotId._id.toString() : '',
    );
    console.log({ res });
    return (
        <div>
            <QurbaniComponent data={res?.data} slotId={slotId} />
        </div>
    );
}

export default QurbaniPage;
