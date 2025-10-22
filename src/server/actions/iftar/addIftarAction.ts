'use server';

import Iftar from '@/server/model/iftar/IftarModal';
import { IIftar } from '@/server/model/iftar/IftarType';
import connectMongo from '@/server/utils/connection';
import { revalidatePath } from 'next/cache';

export async function addIftarAction(data: Partial<IIftar>) {
    try {
        // Ensure DB connection
        await connectMongo();
        // console.log('data', data);
        // Create new Iftar document
        const newIftar = await Iftar.create(data);
        const plainIftar = newIftar.toObject({ versionKey: false });

        // Revalidate any page or route if needed
        revalidatePath('/towercontrol/iftar');

        return {
            success: true,
            message: 'Iftar added successfully!',
            iftar: plainIftar,
        };
    } catch (error: any) {
        console.error('Error adding Iftar:', error);
        return {
            success: false,
            message: error.message || 'Failed to add Iftar',
        };
    }
}
