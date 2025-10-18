'use server';

import Donation from '@/server/model/donations/donationModal';
import connectMongo from '@/server/utils/connection';

interface DonationInput {
    name: string;
    amount: number;
    numbering?: number;
}

export default async function addDonationAction(data: DonationInput) {
    try {
        await connectMongo();

        // Case 1: No numbering provided → add at end
        if (!data.numbering) {
            const lastDonation = await Donation.findOne()
                .sort({ numbering: -1 })
                .lean();
            const nextNumber = (lastDonation?.numbering || 0) + 1;

            const donation = await Donation.create({
                ...data,
                numbering: nextNumber,
            });

            return {
                success: true,
                message: `নতুন দাতার নাম সফলভাবে যোগ করা হয়েছে (নাম্বার: ${nextNumber})`,
                donation,
            };
        }

        // Case 2: Numbering provided → shift others and insert
        const newNumbering = data.numbering;

        // Shift existing donations
        await Donation.updateMany(
            { numbering: { $gte: newNumbering } },
            { $inc: { numbering: 1 } },
        );

        // Insert new donation at given numbering
        const donation = await Donation.create({
            ...data,
            numbering: newNumbering,
        });

        return {
            success: true,
            message: `নতুন দাতার নাম সফলভাবে যোগ করা হয়েছে (নাম্বার: ${newNumbering})`,
            donation,
        };
    } catch (error: any) {
        console.error('Donation add error:', error);
        return {
            success: false,
            message: error.message || 'দাতা যোগ করতে সমস্যা হয়েছে।',
        };
    }
}
