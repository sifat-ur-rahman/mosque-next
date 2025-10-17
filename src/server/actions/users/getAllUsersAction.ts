'use server';

import User from '@/server/model/users/userModel';
import connectMongo from '@/server/utils/connection';

// get all user from database
export default async function getAllUsersAction() {
    await connectMongo();
    const users = await User.find({ isDeleted: false }).select('-password');
    return users;
}
