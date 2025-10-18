import AllDashboardDonationComponent from '@/components/dashboard/donation/AllDashboardDonation';
import getAllDonations from '@/server/actions/donations/gatDonations';

async function DonationDashboardPage() {
    const allDonations = await getAllDonations();
    return (
        <>
            <AllDashboardDonationComponent allDonations={allDonations} />
        </>
    );
}

export default DonationDashboardPage;
