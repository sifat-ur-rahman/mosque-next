'use server';

import User from '@/server/model/users/userModel';
import connectMongo from '@/server/utils/connection';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';

interface UpdateUserInput {
    id: string;
    name: string;
    phone: string;
    role: 'Admin' | 'Moderator' | 'User';
    password?: string;
}

export default async function updateUserAction(data: UpdateUserInput) {
    try {
        await connectMongo();

        const user = await User.findById(data.id);
        if (!user) {
            return { success: false, error: 'User not found' };
        }

        // Check if phone number is being used by another user
        const phoneInUse = await User.findOne({
            phone: data.phone,
            _id: { $ne: data.id },
            isDeleted: false,
        }).lean();
        if (phoneInUse) {
            return {
                success: false,
                error: 'এই মোবাইল নম্বরটি ইতিমধ্যে ব্যবহৃত হয়েছে। অনুগ্রহ করে অন্য একটি নম্বর ব্যবহার করুন।',
            };
        }

        // Update user fields
        user.name = data.name;
        user.phone = data.phone;
        user.role = data.role;

        // If password is provided, hash and update
        if (data.password && data.password.trim() !== '') {
            const salt = await bcrypt.genSalt(12);
            user.password = await bcrypt.hash(data.password, salt);
        }

        await user.save();
        revalidatePath('/towercontrol/users');
        return {
            success: true,
            message: 'ব্যবহারকারী সফলভাবে আপডেট হয়েছে।',
            user,
        };
    } catch (err: any) {
        console.error('Update user error:', err);
        return { success: false, error: 'ইউজার আপডেট ব্যর্থ হয়েছে।' };
    }
}
