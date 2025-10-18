'use server';

import User from '@/server/model/users/userModel';
import connectMongo from '@/server/utils/connection';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';

// create a new user with hashed password
export default async function addUserAction(data: {
    phone: string;
    password: string;
    role?: string;
}) {
    await connectMongo();

    // Check if phone already exists
    const existingUser = await User.findOne({
        phone: data.phone,
    }).lean();
    if (existingUser) {
        return {
            success: false,
            error: 'এই মোবাইল নম্বরটি ইতিমধ্যে ব্যবহৃত হয়েছে। অনুগ্রহ করে অন্য একটি নম্বর ব্যবহার করুন।',
        };
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Create user
    const user = new User({
        ...data,
        password: hashedPassword,
    });

    await user.save();
    revalidatePath('/towercontrol/users');
    return {
        success: true,
        message: 'ব্যবহারকারী সফলভাবে তৈরি হয়েছে।',
        user,
    };
}
