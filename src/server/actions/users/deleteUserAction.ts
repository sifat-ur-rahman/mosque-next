'use server';

import User from '@/server/model/users/userModel';
import connectMongo from '@/server/utils/connection';
import { revalidatePath } from 'next/cache';

export default async function deleteUserAction(id: string) {
    try {
        await connectMongo();
        const deleted = await User.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true },
        ).lean();

        if (!deleted) {
            return { success: false, error: 'User not found' };
        }
        revalidatePath('/towercontrol/users');
        return { success: true, message: 'User deleted successfully!' };
    } catch (error) {
        console.error('Delete user error:', error);
        return { success: false, error: 'Failed to delete user' };
    }
}
