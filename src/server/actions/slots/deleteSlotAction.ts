'use server';

import Slot from '@/server/model/slots/slotModal';
import connectMongo from '@/server/utils/connection';
import { revalidatePath } from 'next/cache';

export async function deleteSlotAction(id: string) {
    try {
        await connectMongo();

        if (!id) {
            return { success: false, message: 'Slot ID is required.' };
        }

        const deletedSlot = await Slot.findByIdAndDelete(id);

        if (!deletedSlot) {
            return {
                success: false,
                message: 'Slot not found or already deleted.',
            };
        }

        // Optional: Revalidate the slot list page
        revalidatePath('/towercontrol/slots');

        return {
            success: true,
            message: `Slot "${deletedSlot.title}" deleted successfully.`,
            data: deletedSlot,
        };
    } catch (error: any) {
        console.error('Error deleting slot:', error);
        return {
            success: false,
            message: 'Failed to delete slot.',
            error: error.message,
        };
    }
}
