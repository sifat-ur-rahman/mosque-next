'use server';

import User from '@/server/model/users/userModel';
import connectMongo from '@/server/utils/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function loginAction(data: {
    phone: string;
    password: string;
}) {
    await connectMongo();

    // Check If User Is Exist
    const user = await User.findOne({ phone: data.phone, isDeleted: false });
    if (!user) {
        return {
            success: false,
            error: 'দুঃখিত, আপনার মোবাইল নম্বর টি আমাদের রেকর্ডে নেই। অনুগ্রহ করে আপনার মোবাইল নম্বর টি সঠিক আছে কিনা আবার যাচাই করুন। ',
        };
    }

    // Check If User Password is Match
    if (
        !user.password ||
        !(await bcrypt.compare(data.password, user.password))
    ) {
        return {
            success: false,
            error: 'দুঃখিত! আপনি যে পাসওয়ার্ডটি দিয়েছেন তা সঠিক নয়। অনুগ্রহ করে আবার চেষ্টা করুন।',
        };
    }

    // We omit the password using destructuring
    const { password, ...cleanUserObject } = user.toObject();

    // Create Token & Set Token To Cookies
    const token = jwt.sign(
        { user: cleanUserObject },
        process.env.TOKEN_SECRET as string,
        { expiresIn: '30d' },
    );
    (await cookies()).set('mosque_token', token, { maxAge: 2592000 });
    if (!user.role) {
        redirect('/');
    }
    // Redirect User According To Their Role
    switch (user.role) {
        case 'Admin':
            redirect('/towercontrol');
        case 'Moderator':
            redirect('/dashboard');
        case 'User':
        default:
            redirect('/');
    }
}
