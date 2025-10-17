'use server';

import User from '@/server/model/users/userModel';
import connectMongo from '@/server/utils/connection';

// create a new user
export default async function addUserAction(data: any) {
    await connectMongo();
    const user = new User(data);
    await user.save();
    return { success: true, user };
}
