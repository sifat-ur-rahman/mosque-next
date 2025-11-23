'use server';

import Donation from '@/server/model/donations/donationModal';
import connectMongo from '@/server/utils/connection';

//  get all donation from database
export async function getAllDonations() {
    await connectMongo();
    const donations = await Donation.find().sort({ numbering: 1 }).lean();
    return donations;
}

// get donation count from database
export async function getDonationCount() {
    await connectMongo();
    const count = await Donation.countDocuments().lean();
    return count;
}

// get donation by id from database
export async function getDonation(id: string) {
    await connectMongo();
    const donation = await Donation.findById(id).lean();
    return donation;
}

export async function getDonationSummaryAction() {
    await connectMongo();

    try {
        const [summary] = await Donation.aggregate([
            {
                // one-time & other বাদ
                $match: {
                    $or: [
                        { type: { $exists: false } }, // no type → treat as monthly
                        { type: 'monthly' },
                        { type: 'yearly' },
                    ],
                },
            },
            {
                $project: {
                    type: {
                        // যদি type না থাকে → monthly
                        $ifNull: ['$type', 'monthly'],
                    },
                    amount: 1,
                    due: 1,

                    // yearly → amount / 12
                    monthlyAmount: {
                        $cond: [
                            {
                                $eq: [
                                    { $ifNull: ['$type', 'monthly'] },
                                    'yearly',
                                ],
                            },
                            { $divide: ['$amount', 12] },
                            '$amount',
                        ],
                    },

                    // yearly due → unchanged
                    monthlyDue: {
                        $cond: [
                            {
                                $eq: [
                                    { $ifNull: ['$type', 'monthly'] },
                                    'yearly',
                                ],
                            },
                            '$due',
                            '$due',
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalCount: { $sum: 1 },
                    totalAmount: { $sum: '$monthlyAmount' },
                    totalDue: { $sum: '$monthlyDue' },
                },
            },
        ]);

        return {
            success: true,
            totalCount: summary?.totalCount || 0,
            totalAmount: summary?.totalAmount || 0,
            totalDue: summary?.totalDue || 0,
        };
    } catch (error) {
        console.error('Error fetching donation summary:', error);
        return {
            success: false,
            totalCount: 0,
            totalAmount: 0,
            totalDue: 0,
            message: 'Failed to fetch donation summary',
        };
    }
}
