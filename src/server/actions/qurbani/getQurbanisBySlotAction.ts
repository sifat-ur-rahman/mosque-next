'use server';

import connectMongo from '@/server/utils/connection';

import Qurbani from '@/server/model/qurbani/QurbaniModal';
import { IQurbani } from '@/server/model/qurbani/QurbaniType';

export default async function getQurbanisBySlotAction(slotId: string) {
    try {
        await connectMongo();

        // Fetch all Qurbani for this slot and populate Family data
        let qurbanis = await Qurbani.find({ slotId })
            .populate('familyId')
            .lean<IQurbani[]>();

        qurbanis = qurbanis.sort(
            (a: any, b: any) => b.familyId?.members - a.familyId?.members,
        );
        if (!qurbanis || qurbanis.length === 0) {
            return {
                success: false,
                message: 'এই স্লটের জন্য কোনো কোরবানি পাওয়া যায়নি।',
                qurbanis: [],
            };
        }

        return {
            success: true,
            message: `${qurbanis.length} টি কোরবানি পাওয়া গেছে।`,
            qurbanis,
        };
    } catch (error: any) {
        console.error('Get Qurbani by Slot error:', error);
        return {
            success: false,
            message: error.message || 'কোরবানি তথ্য আনতে সমস্যা হয়েছে।',
        };
    }
}
