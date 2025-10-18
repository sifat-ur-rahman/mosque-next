'use server';

import Donation from '@/server/model/donations/donationModal';
import connectMongo from '@/server/utils/connection';

interface UpdateDonationInput {
    id: string;
    name?: string;
    amount?: number;
    numbering?: number;
}

export default async function updateDonationAction(data: UpdateDonationInput) {
    await connectMongo();

    const { id, name, amount, numbering } = data;

    // Find current donation
    const donation = await Donation.findById(id);
    if (!donation) {
        return { success: false, message: 'দাতার তথ্য খুঁজে পাওয়া যায়নি!' };
    }

    const oldNumbering = donation.numbering;

    // Case 1: No numbering change → normal update
    if (numbering === undefined || numbering === oldNumbering) {
        donation.name = name ?? donation.name;
        donation.amount = amount ?? donation.amount;
        await donation.save();

        return {
            success: true,
            message: 'দাতার তথ্য সফলভাবে আপডেট হয়েছে।',
            donation,
        };
    }

    //  Case 2: Numbering changed → reorder others
    if (numbering < oldNumbering) {
        // moved up: shift between newNumbering and oldNumbering - 1 down by +1
        await Donation.updateMany(
            { numbering: { $gte: numbering, $lt: oldNumbering } },
            { $inc: { numbering: 1 } },
        );
    } else {
        // moved down: shift between oldNumbering + 1 and newNumbering up by -1
        await Donation.updateMany(
            { numbering: { $gt: oldNumbering, $lte: numbering } },
            { $inc: { numbering: -1 } },
        );
    }

    // update current donation numbering and other fields
    donation.name = name ?? donation.name;
    donation.amount = amount ?? donation.amount;
    donation.numbering = numbering;
    await donation.save();

    return {
        success: true,
        message: `দাতার তথ্য সফলভাবে আপডেট হয়েছে।`,
        donation,
    };
}
