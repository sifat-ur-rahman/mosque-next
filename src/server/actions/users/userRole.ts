'use server';

import User from '@/server/model/users/userModel';
import connectMongo from '@/server/utils/connection';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// get user role from token
export default async function getLoginUserRole() {
    await connectMongo();

    const token = (await cookies()).get('mosque_token')?.value;
    //console.log({ token });
    if (!token) {
        return null;
    }
    const decodedToken: any = jwt.decode(token);
    //console.log({ decodedToken });
    if (!decodedToken) {
        return null;
    }
    const user = await User.findById(decodedToken.user._id);
    //  console.log({ user });
    if (!user) {
        return null;
    }

    return user.role;
}
