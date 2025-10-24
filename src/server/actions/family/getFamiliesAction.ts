'use server';

import Family from '@/server/model/family/FamilyModal';
import connectMongo from '@/server/utils/connection';
import mongoose from 'mongoose';

// Get all families
export async function getAllFamiliesAction() {
    try {
        await connectMongo();

        const families = await Family.find().sort({ numbering: 1 }).lean();

        return families;
    } catch (error: any) {
        console.error('Get all families error:', error);
    }
}

// Get family by ID
export async function getFamilyByIdAction(familyId: string) {
    try {
        await connectMongo();

        const family = await Family.findById(familyId).lean();

        if (!family) {
            return {
                success: false,
                message: 'পরিবার পাওয়া যায়নি।',
            };
        }

        return {
            success: true,
            family,
        };
    } catch (error: any) {
        console.error('Get family by ID error:', error);
        return {
            success: false,
            message: error.message || 'পরিবারের তথ্য আনা যায়নি।',
        };
    }
}

// Get family by numbering
export async function getFamilyByNumberingAction(numbering: number) {
    try {
        await connectMongo();

        const family = await Family.findOne({ numbering }).lean();

        if (!family) {
            return {
                success: false,
                message: `নাম্বার ${numbering} এর কোন পরিবার পাওয়া যায়নি।`,
            };
        }

        return {
            success: true,
            family,
        };
    } catch (error: any) {
        console.error('Get family by numbering error:', error);
        return {
            success: false,
            message: error.message || 'পরিবারের তথ্য আনা যায়নি।',
        };
    }
}

// Get total family count
export async function getFamilyCountAction() {
    try {
        await connectMongo();

        const count = await Family.countDocuments().lean();

        return count;
    } catch (error: any) {
        console.error('Get family count error:', error);
    }
}

export async function getFamilyWithQurbaniBySlotId(slotId: string) {
    try {
        await connectMongo();

        // Convert slotId to ObjectId
        const slotObjectId = new mongoose.Types.ObjectId(slotId);

        // Aggregation pipeline
        const familiesWithQurbani = await Family.aggregate([
            {
                // Fetch all families (remove $match or add filter if needed)
                $match: {},
            },
            {
                // Lookup Qurbani for this family and slotId
                $lookup: {
                    from: 'qurbanis',
                    let: { familyId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$familyId', '$$familyId'] },
                                        { $eq: ['$slotId', slotObjectId] },
                                    ],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                animalType: 1,
                                foreignMember: 1,
                                isQurbani: 1,
                                isRead: 1,
                            },
                        },
                    ],
                    as: 'qurbani',
                },
            },
            {
                // Flatten the qurbani array to single object or null
                $addFields: {
                    qurbani: { $arrayElemAt: ['$qurbani', 0] },
                },
            },
            {
                // Sort families by members descending
                $sort: { members: -1 },
            },
            {
                // Only include required fields
                $project: {
                    _id: 1,
                    name: 1,
                    members: 1,
                    phone: 1,
                    qurbani: 1,
                },
            },
        ]);

        // Add sequential numbering to families only
        const familiesWithNumbering = familiesWithQurbani.map(
            (family, index) => ({
                ...family,
                numbering: index + 1, // 1, 2, 3...
            }),
        );

        return {
            success: true,
            message: `${familiesWithNumbering.length} টি পরিবার পাওয়া গেছে।`,
            data: familiesWithNumbering,
        };
    } catch (error: any) {
        console.error('Get Family with Qurbani by Slot error:', error);
        return {
            success: false,
            message:
                error.message ||
                'ফ্যামিলি এবং কোরবানি তথ্য আনতে সমস্যা হয়েছে।',
            data: [],
        };
    }
}
