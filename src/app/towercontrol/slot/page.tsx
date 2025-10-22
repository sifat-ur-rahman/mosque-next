import AllSlotsComponent from '@/components/towercontrol/slots/AllSlotsComponent';
import { getAllSlotsGroupedByType } from '@/server/actions/slots/getSoltAction';

async function SlotPage() {
    const allSlots = await getAllSlotsGroupedByType();
    return (
        <div>
            <AllSlotsComponent allSlots={allSlots} />
        </div>
    );
}

export default SlotPage;
