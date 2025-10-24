import TowerControlQurbaniComponent from '@/components/towercontrol/qurbani/TowerControlQurbaniComponent';
import { getFamilyWithQurbaniBySlotId } from '@/server/actions/family/getFamiliesAction';
import { getActiveSlotByType } from '@/server/actions/slots/getSoltAction';

async function AllQurbaniPage() {
    const slotId: any = await getActiveSlotByType('Qurbani');
    const res = await getFamilyWithQurbaniBySlotId(
        slotId ? slotId._id.toString() : '',
    );
    console.log(res.data);
    return (
        <div>
            <TowerControlQurbaniComponent data={res.data} />
        </div>
    );
}

export default AllQurbaniPage;
