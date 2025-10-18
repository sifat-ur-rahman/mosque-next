'use server';

import Donation from '@/server/model/donations/donationModal';
import connectMongo from '@/server/utils/connection';

export default async function deleteDonationAction(id: string) {
    await connectMongo();

    // find the donation
    const donation = await Donation.findById(id);
    if (!donation) {
        return { success: false, message: 'দাতার তথ্য খুঁজে পাওয়া যায়নি!' };
    }

    const deletedNumbering = donation.numbering;

    // delete the donation
    await Donation.findByIdAndDelete(id);

    // shift all numbering above deleted one down by -1
    await Donation.updateMany(
        { numbering: { $gt: deletedNumbering } },
        { $inc: { numbering: -1 } },
    );

    return {
        success: true,
        message: `${deletedNumbering} নাম্বারের দাতা মুছে ফেলা হয়েছে `,
    };
}
