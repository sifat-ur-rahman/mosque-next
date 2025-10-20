import AllDonationsComponent from '@/components/main/donation/AllDonations';
import {
    getAllDonations,
    getDonationSummaryAction,
} from '@/server/actions/donations/gatDonations';

async function DonationPage() {
    const allDonations = await getAllDonations();
    const donationSummary = await getDonationSummaryAction();
    return (
        <div className="hide-scrollbar-mobile">
            <AllDonationsComponent
                allDonations={allDonations}
                donationSummary={donationSummary}
            />
        </div>
    );
}

export default DonationPage;
