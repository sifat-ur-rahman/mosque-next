'use server';

import Slot from '@/server/model/slots/slotModal';
import { ISlot } from '@/server/model/slots/slotType';
import connectMongo from '@/server/utils/connection';
import { revalidatePath } from 'next/cache';

export default async function addSlotAction(data: Partial<ISlot>) {
    try {
        await connectMongo();

        // Validate required fields
        if (!data.title || !data.type || !data.time) {
            return { success: false, message: 'Missing required fields.' };
        }

        // Create new slot
        const slot = await Slot.create({
            title: data.title,
            type: data.type,
            time: data.time,
            year: data.year || new Date().getFullYear(),
            numbering: data.numbering || 1,
            isActive: false,
        });

        // Optional: revalidate the page where slots are displayed
        revalidatePath('/towercontrol/slot');

        return {
            success: true,
            message: 'Slot added successfully.',
            data: slot,
        };
    } catch (error: any) {
        console.error('Error adding slot:', error);
        return {
            success: false,
            message: 'Failed to add slot.',
            error: error.message,
        };
    }
}
