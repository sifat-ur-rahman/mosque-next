import AllDashboardDonationComponent from '@/components/dashboard/donation/AllDashboardDonation';
import {
    getAllDonations,
    getDonationSummaryAction,
} from '@/server/actions/donations/gatDonations';

async function DonationDashboardPage() {
    const allDonations = await getAllDonations();
    const donationSummary = await getDonationSummaryAction();
    return (
        <>
            <AllDashboardDonationComponent
                allDonations={allDonations}
                donationSummary={donationSummary}
            />
        </>
    );
}

export default DonationDashboardPage;
