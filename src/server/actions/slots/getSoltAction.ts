'use server';

import Slot from '@/server/model/slots/slotModal';
import connectMongo from '@/server/utils/connection';

export async function getAllSlotsGroupedByType() {
    try {
        await connectMongo();

        const groupedSlots = await Slot.aggregate([
            {
                $group: {
                    _id: '$type',
                    slots: { $push: '$$ROOT' },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    type: '$_id',
                    slots: 1,
                    count: 1,
                },
            },
        ]);

        // Optional: sort by type order
        const typeOrder = ['Iftar', 'Qurbani', 'General'];
        groupedSlots.sort(
            (a, b) => typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type),
        );

        return groupedSlots;
    } catch (error: any) {
        console.error('Error fetching grouped slots:', error);
        return [];
    }
}

// Fetch active slots by type Use=> //getActiveSlotsByType('Iftar')
export async function getActiveSlotsByType(type: string) {
    try {
        await connectMongo();

        if (!type) {
            return { success: false, message: 'Slot type is required.' };
        }

        const slots = await Slot.find({
            type,
            isActive: true,
        })
            .sort({ numbering: 1 })
            .lean();

        if (!slots.length) {
            return {
                success: false,
                message: `No active slots found for type: ${type}`,
                data: [],
            };
        }

        return {
            success: true,
            message: `Active slots for ${type}`,
            data: slots,
        };
    } catch (error: any) {
        console.error('Error fetching slots by type:', error);
        return {
            success: false,
            message: 'Failed to fetch slots.',
            error: error.message,
        };
    }
}

// Fetch all slots by type Use=> //getSlotsByType('Iftar')
export async function getSlotsByType(type: string) {
    try {
        await connectMongo();

        if (!type) {
            return { success: false, message: 'Slot type is required.' };
        }

        const slots = await Slot.find({ type }).sort({ numbering: 1 }).lean();

        if (!slots.length) {
            return {
                success: false,
                message: `No slots found for type: ${type}`,
                data: [],
            };
        }

        return {
            success: true,
            message: `All slots for ${type}`,
            data: slots,
        };
    } catch (error: any) {
        console.error('Error fetching slots by type:', error);
        return {
            success: false,
            message: 'Failed to fetch slots.',
            error: error.message,
        };
    }
}
