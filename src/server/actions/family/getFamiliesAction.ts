'use server';

import Family from '@/server/model/family/FamilyModal';
import connectMongo from '@/server/utils/connection';

// Get all families
export async function getAllFamiliesAction() {
    try {
        await connectMongo();

        const families = await Family.find().sort({ numbering: 1 }).lean();

        return {
            success: true,
            families,
        };
    } catch (error: any) {
        console.error('Get all families error:', error);
        return {
            success: false,
            message: error.message || 'পরিবারের তথ্য আনা যায়নি।',
        };
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
