'use server';

import Slot from '@/server/model/slots/slotModal';
import { ISlot } from '@/server/model/slots/slotType';
import connectMongo from '@/server/utils/connection';
import { revalidatePath } from 'next/cache';

export async function updateSlotAction(id: string, data: Partial<ISlot>) {
    try {
        await connectMongo();

        // remove isActive from update data
        const { isActive, ...updateData } = data;

        const updatedSlot = await Slot.findByIdAndUpdate(id, updateData, {
            new: true,
        });

        if (!updatedSlot) {
            return { success: false, message: 'Slot not found.' };
        }

        // Revalidate slot list page if needed
        revalidatePath('/towercontrol/slot');

        return {
            success: true,
            message: 'Slot updated successfully.',
            data: updatedSlot,
        };
    } catch (error: any) {
        console.error('Error updating slot:', error);
        return {
            success: false,
            message: 'Failed to update slot.',
            error: error.message,
        };
    }
}

/// Activate a slot and deactivate others of the same type use => updateSlotActiveStatus(slot._id, slot.type)
export async function updateSlotActiveStatus(id: string, type: string) {
    try {
        await connectMongo();

        if (!id || !type) {
            return {
                success: false,
                message: 'Slot ID and type are required.',
            };
        }

        //  Deactivate all other slots in the same type
        await Slot.updateMany({ type }, { isActive: false });

        //  Activate only the selected slot
        const updatedSlot = await Slot.findByIdAndUpdate(
            id,
            { isActive: true },
            { new: true },
        );

        if (!updatedSlot) {
            return { success: false, message: 'Slot not found.' };
        }

        //  Revalidate page
        revalidatePath('/towercontrol/slot');

        return {
            success: true,
            message: `Activated slot "${updatedSlot.title}" for ${type}`,
            data: updatedSlot,
        };
    } catch (error: any) {
        console.error('Error updating active slot:', error);
        return {
            success: false,
            message: 'Failed to activate slot.',
            error: error.message,
        };
    }
}
