'use server';

import User from '@/server/model/users/userModel';
import connectMongo from '@/server/utils/connection';
import { revalidatePath } from 'next/cache';

export default async function deleteUserAction(id: string, isDeleted = true) {
    try {
        await connectMongo();
        const deleted = await User.findByIdAndUpdate(
            id,
            { isDeleted },
            { new: true },
        ).lean();

        if (!deleted) {
            return { success: false, error: 'User not found' };
        }
        revalidatePath('/towercontrol/users');
        const message = isDeleted
            ? 'ব্যবহারকারী সফলভাবে মুছে ফেলা হয়েছে।'
            : 'ব্যবহারকারী সফলভাবে পুনরুদ্ধার করা হয়েছে।';
        return { success: true, message };
    } catch (error) {
        console.error('Delete user error:', error);
        return {
            success: false,
            error: isDeleted
                ? 'ব্যবহারকারী মুছে ফেলতে ব্যর্থ হয়েছে।'
                : 'ব্যবহারকারী পুনরুদ্ধার করতে ব্যর্থ হয়েছে।',
        };
    }
}
