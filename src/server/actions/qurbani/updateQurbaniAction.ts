'use server';

import connectMongo from '@/server/utils/connection';

import Qurbani from '@/server/model/qurbani/QurbaniModal';
import { IQurbani } from '@/server/model/qurbani/QurbaniType';
import { revalidatePath } from 'next/cache';

export async function updateQurbaniAction(id: string, data: Partial<IQurbani>) {
    try {
        await connectMongo();

        // Prevent changing these critical references
        const { slotId, familyId, ...allowedFields } = data;

        // Update only allowed fields
        const updatedQurbani = await Qurbani.findByIdAndUpdate(
            id,
            { $set: allowedFields },
            { new: true, runValidators: true },
        ).lean<IQurbani>();

        if (!updatedQurbani) {
            return {
                success: false,
                message: 'কোরবানি তথ্য খুঁজে পাওয়া যায়নি।',
            };
        }
        revalidatePath('/qurbani');
        return {
            success: true,
            message: 'কোরবানি তথ্য সফলভাবে হালনাগাদ হয়েছে।',
            qurbani: updatedQurbani,
        };
    } catch (error: any) {
        console.error('Qurbani update error:', error);
        return {
            success: false,
            message:
                error.message || 'কোরবানি তথ্য হালনাগাদ করতে সমস্যা হয়েছে।',
        };
    }
}
