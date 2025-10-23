'use server';

import Family from '@/server/model/family/FamilyModal';
import { IFamily } from '@/server/model/family/FamilyType';
import connectMongo from '@/server/utils/connection';

export async function addFamilyAction(data: Partial<IFamily>) {
    try {
        await connectMongo();

        // Case 1: No numbering provided → add at end
        if (!data.numbering) {
            const lastFamily = await Family.findOne()
                .sort({ numbering: -1 })
                .lean();
            const nextNumber = (lastFamily?.numbering || 0) + 1;

            const family = await Family.create({
                ...data,
                numbering: nextNumber,
            });

            return {
                success: true,
                message: `নতুন পরিবার সফলভাবে যোগ করা হয়েছে (নাম্বার: ${nextNumber})`,
                family,
            };
        }

        // Case 2: Numbering provided → shift others and insert
        const newNumbering = data.numbering;

        // Shift existing families
        await Family.updateMany(
            { numbering: { $gte: newNumbering } },
            { $inc: { numbering: 1 } },
        );

        // Insert new family at given numbering
        const family = await Family.create({
            ...data,
            numbering: newNumbering,
        });

        return {
            success: true,
            message: `নতুন পরিবার সফলভাবে যোগ করা হয়েছে (নাম্বার: ${newNumbering})`,
            family,
        };
    } catch (error: any) {
        console.error('Family add error:', error);
        return {
            success: false,
            message: error.message || 'পরিবার যোগ করতে সমস্যা হয়েছে।',
        };
    }
}
