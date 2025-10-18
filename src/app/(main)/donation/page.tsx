import AllDonationsComponent from '@/components/main/donation/AllDonations';
import getAllDonations from '@/server/actions/donations/gatDonations';

async function DonationPage() {
    const allDonations = await getAllDonations();
    return (
        <div>
            <AllDonationsComponent allDonations={allDonations} />
        </div>
    );
}

export default DonationPage;
