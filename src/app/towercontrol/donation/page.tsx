import AllTowerControlDonationComponent from '@/components/towercontrol/donation/AllTowerCoontrolDonationComponent';
import {
    getAllDonations,
    getDonationSummaryAction,
} from '@/server/actions/donations/gatDonations';

async function page() {
    const allDonations = await getAllDonations();
    const donationSummary = await getDonationSummaryAction();
    return (
        <>
            <AllTowerControlDonationComponent
                allDonations={allDonations}
                donationSummary={donationSummary}
            />
        </>
    );
}

export default page;
