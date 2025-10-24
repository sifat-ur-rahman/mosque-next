'use server';

import Qurbani from '@/server/model/qurbani/QurbaniModal';
import connectMongo from '@/server/utils/connection';
import deleteFamilyAction from '../family/deleteFamilyAction';

// Delete only Qurbani by ID
export async function deleteQurbaniAction(id: string) {
    try {
        await connectMongo();

        const deletedQurbani = await Qurbani.findByIdAndDelete(id);

        if (!deletedQurbani) {
            return {
                success: false,
                message: 'কোরবানি তথ্য খুঁজে পাওয়া যায়নি।',
            };
        }

        return {
            success: true,
            message: 'কোরবানি সফলভাবে মুছে ফেলা হয়েছে।',
            qurbani: deletedQurbani,
        };
    } catch (error: any) {
        console.error('Delete Qurbani error:', error);
        return {
            success: false,
            message: error.message || 'কোরবানি মুছে ফেলতে সমস্যা হয়েছে।',
        };
    }
}

// Delete Qurbani along with its associated Family
export async function deleteQurbaniWithFamilyAction(qurbaniId: string) {
    try {
        await connectMongo();

        //  Find the Qurbani first
        const qurbani = await Qurbani.findById(qurbaniId);

        if (!qurbani) {
            return {
                success: false,
                message: 'কোরবানি তথ্য খুঁজে পাওয়া যায়নি।',
            };
        }

        const familyId = qurbani.familyId;

        // Delete the Qurbani
        await Qurbani.findByIdAndDelete(qurbaniId);

        // Delete the associated Family
        await deleteFamilyAction(familyId.toString());

        return {
            success: true,
            message: 'কোরবানি এবং পরিবার সফলভাবে মুছে ফেলা হয়েছে।',
        };
    } catch (error: any) {
        console.error('Delete Qurbani with Family error:', error);
        return {
            success: false,
            message:
                error.message || 'কোরবানি এবং পরিবার মুছে ফেলতে সমস্যা হয়েছে।',
        };
    }
}
