'use server';

import Iftar from '@/server/model/iftar/IftarModal';
import connectMongo from '@/server/utils/connection';
import { Types } from 'mongoose';
import { revalidatePath } from 'next/cache';

export async function deleteIftarAction(id: string) {
    try {
        await connectMongo();

        if (!Types.ObjectId.isValid(id)) {
            return {
                success: false,
                message: 'Invalid Iftar ID',
            };
        }

        const deletedIftar = await Iftar.findByIdAndDelete(id);

        if (!deletedIftar) {
            return {
                success: false,
                message: 'Iftar not found',
            };
        }

        // Optional: revalidate page cache
        revalidatePath('/iftar'); // adjust path if needed

        return {
            success: true,
            message: 'Iftar deleted successfully!',
            iftar: deletedIftar,
        };
    } catch (error: any) {
        console.error('Error deleting Iftar:', error);
        return {
            success: false,
            message: error.message || 'Failed to delete Iftar',
        };
    }
}
