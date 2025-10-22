'use server';

import Iftar from '@/server/model/iftar/IftarModal';
import { IIftar } from '@/server/model/iftar/IftarType';
import connectMongo from '@/server/utils/connection';
import { Types } from 'mongoose';
import { revalidatePath } from 'next/cache';

export async function updateIftar(id: string, updatedData: Partial<IIftar>) {
    try {
        await connectMongo();

        if (!Types.ObjectId.isValid(id)) {
            return {
                success: false,
                message: 'Invalid Iftar ID format',
            };
        }

        const iftar = await Iftar.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });

        if (!iftar) {
            return {
                success: false,
                message: 'Iftar not found',
            };
        }

        // Revalidate relevant page
        revalidatePath('/towercontrol/iftar');

        return {
            success: true,
            message: 'Iftar updated successfully!',
            iftar,
        };
    } catch (error: any) {
        console.error('Error updating Iftar:', error);
        return {
            success: false,
            message: error.message || 'Failed to update Iftar',
        };
    }
}

export async function updateIftarNames(id: string, names: string[]) {
    try {
        await connectMongo();

        if (!Types.ObjectId.isValid(id)) {
            return {
                success: false,
                message: 'Invalid Iftar ID',
            };
        }

        const updatedIftar = await Iftar.findByIdAndUpdate(
            id,
            { names },
            { new: true, runValidators: true },
        );

        if (!updatedIftar) {
            return {
                success: false,
                message: 'Iftar not found',
            };
        }

        // Optional: revalidate the page if using ISR or caching
        revalidatePath('/iftar'); // adjust path as needed

        return {
            success: true,
            message: 'Iftar names updated successfully!',
            iftar: updatedIftar,
        };
    } catch (error: any) {
        console.error('Error updating Iftar names:', error);
        return {
            success: false,
            message: error.message || 'Failed to update names',
        };
    }
}
