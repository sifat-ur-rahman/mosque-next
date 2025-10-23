'use server';

import Family from '@/server/model/family/FamilyModal';
import connectMongo from '@/server/utils/connection';
import { revalidatePath } from 'next/cache';

export default async function deleteFamilyAction(id: string) {
    await connectMongo();

    // Find the family
    const family = await Family.findById(id);
    if (!family) {
        return { success: false, message: 'পরিবারের তথ্য খুঁজে পাওয়া যায়নি!' };
    }

    const deletedNumbering = family.numbering;

    // Delete the family
    await Family.findByIdAndDelete(id);

    // Shift all families with numbering above the deleted one down by -1
    await Family.updateMany(
        { numbering: { $gt: deletedNumbering } },
        { $inc: { numbering: -1 } },
    );

    revalidatePath('/dashboard/family'); // adjust the path if needed

    return {
        success: true,
        message: `${deletedNumbering} নাম্বারের পরিবার মুছে ফেলা হয়েছে।`,
    };
}
