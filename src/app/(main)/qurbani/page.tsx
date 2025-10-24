import ComingSoon from '@/components/common/ComingSoon';
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
            <ComingSoon />
        </div>
    );
}

export default QurbaniPage;
