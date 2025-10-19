import AllTowerControlDonationComponent from '@/components/towercontrol/donation/AllTowerCoontrolDonationComponent';
import getAllDonations from '@/server/actions/donations/gatDonations';

async function page() {
    const allDonations = await getAllDonations();
    return (
        <>
            <AllTowerControlDonationComponent allDonations={allDonations} />
        </>
    );
}

export default page;
