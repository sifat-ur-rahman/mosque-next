'use server';

import Family from '@/server/model/family/FamilyModal';
import connectMongo from '@/server/utils/connection';
import { revalidatePath } from 'next/cache';

export interface UpdateFamilyInput {
    id: string;
    name?: string;
    members?: number;
    phone?: string;
    numbering?: number;
}

export default async function updateFamilyAction(data: UpdateFamilyInput) {
    await connectMongo();

    const { id, name, members, phone, numbering } = data;

    // Find current family
    const family = await Family.findById(id);
    if (!family) {
        return { success: false, message: 'পরিবারের তথ্য খুঁজে পাওয়া যায়নি!' };
    }

    const oldNumbering = family.numbering;

    // Case 1: No numbering change → normal update
    if (numbering === undefined || numbering === oldNumbering) {
        family.name = name ?? family.name;
        family.members = members ?? family.members;
        family.phone = phone ?? family.phone;
        await family.save();
        revalidatePath('/dashboard/family'); // adjust the path as needed

        return {
            success: true,
            message: 'পরিবারের তথ্য সফলভাবে আপডেট হয়েছে।',
            family,
        };
    }

    // Case 2: Numbering changed → reorder others
    if (numbering < oldNumbering) {
        // moved up: shift between newNumbering and oldNumbering - 1 down by +1
        await Family.updateMany(
            { numbering: { $gte: numbering, $lt: oldNumbering } },
            { $inc: { numbering: 1 } },
        );
    } else {
        // moved down: shift between oldNumbering + 1 and newNumbering up by -1
        await Family.updateMany(
            { numbering: { $gt: oldNumbering, $lte: numbering } },
            { $inc: { numbering: -1 } },
        );
    }

    // update current family numbering and other fields
    family.name = name ?? family.name;
    family.members = members ?? family.members;
    family.phone = phone ?? family.phone;
    family.numbering = numbering;
    await family.save();
    revalidatePath('/dashboard/family');

    return {
        success: true,
        message: 'পরিবারের তথ্য সফলভাবে আপডেট হয়েছে।',
        family,
    };
}
