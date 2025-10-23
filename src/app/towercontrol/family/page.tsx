import AllFamilyComponent from '@/components/towercontrol/family/AllFamilyComponent';
import { getAllFamiliesAction } from '@/server/actions/family/getFamiliesAction';

async function AllFamilyPage() {
    const allFamily: any = await getAllFamiliesAction();
    return (
        <>
            <AllFamilyComponent allFamilies={allFamily} />
        </>
    );
}

export default AllFamilyPage;
