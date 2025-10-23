'use server';

import Iftar from '@/server/model/iftar/IftarModal';
import connectMongo from '@/server/utils/connection';
import { Types } from 'mongoose';

export async function getIftarsBySlotId(slotId: string) {
    try {
        await connectMongo();

        if (!Types.ObjectId.isValid(slotId)) {
            return {
                success: false,
                message: 'Invalid slot ID format',
                iftars: [],
            };
        }

        const iftars = await Iftar.find({ slotId })
            .sort({ numbering: 1 })
            .lean();

        return iftars;
    } catch (error: any) {
        console.error('Error fetching Iftars by slotId:', error);
    }
}
