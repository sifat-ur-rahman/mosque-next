'use server';

import { IFamily } from '@/server/model/family/FamilyType';
import Qurbani from '@/server/model/qurbani/QurbaniModal';
import {
    FamilyQurbaniInput,
    IQurbani,
} from '@/server/model/qurbani/QurbaniType';
import connectMongo from '@/server/utils/connection';
import { revalidatePath } from 'next/cache';
import { addFamilyAction } from '../family/addFamilyAction';
import deleteFamilyAction from '../family/deleteFamilyAction';

export async function addQurbaniAction(data: Partial<IQurbani>) {
    try {
        await connectMongo();

        // Create a new Qurbani entry
        const qurbani = await Qurbani.create({
            slotId: data.slotId?.toString(),
            familyId: data.familyId?.toString(),
            isQurbani: data.isQurbani ?? false,
            animalType: data.animalType,
            foreignMember: data.foreignMember ?? 0,
            isRead: data.isRead ?? false,
        });
        revalidatePath('/qurbani');

        return {
            success: true,
            message: 'নতুন কোরবানি সফলভাবে যোগ করা হয়েছে।',
            qurbani,
        };
    } catch (error: any) {
        console.error('Qurbani add error:', error);
        return {
            success: false,
            message: error.message || 'কোরবানি যোগ করতে সমস্যা হয়েছে।',
        };
    }
}

export async function addFamilyWithQurbaniAction(data: FamilyQurbaniInput) {
    await connectMongo();

    try {
        // ✅ Step 1: Extract and format the family data
        const familyData: Partial<IFamily> = {
            name: data.name,
            members: data.members,
            phone: data.phone || '',
            numbering: data.numbering,
            isRead: false,
        };

        // ✅ Step 2: Create Family
        const familyResult = await addFamilyAction(familyData);

        if (!familyResult.success || !familyResult.family) {
            throw new Error('Family creation failed');
        }

        const familyId = familyResult.family._id;

        // ✅ Step 3: Prepare Qurbani data
        const qurbaniData: Partial<IQurbani> = {
            slotId: data.slotId as any,
            familyId: familyId as any,
            isQurbani: data.isQurbani,
            animalType: data.animalType,
            foreignMember: data.foreignMember ?? 0,
            isRead: false,
        };

        // ✅ Step 4: Create Qurbani
        const qurbani = await Qurbani.create(qurbaniData);
        revalidatePath('/qurbani');

        return {
            success: true,
            message: `পরিবার ও কোরবানি সফলভাবে যোগ করা হয়েছে (পরিবার নাম্বার: ${familyResult.family.numbering})`,
            family: familyResult.family,
            qurbani,
        };
    } catch (error: any) {
        console.error('Add Family with Qurbani Error:', error);

        // ⚠️ If Qurbani fails after Family success, delete Family
        if (error.message !== 'Family creation failed' && error.familyId) {
            await deleteFamilyAction(error.familyId);
        }

        return {
            success: false,
            message:
                error.message || 'পরিবার ও কোরবানি যোগ করতে সমস্যা হয়েছে।',
        };
    }
}
