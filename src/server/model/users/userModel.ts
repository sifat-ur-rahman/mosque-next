import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from './userType';

const userSchema: Schema<IUser> = new Schema<IUser>(
    {
        name: String,
        phone: String,
        password: String,
        role: { type: String, default: 'User' },
        isDeleted: { type: Boolean, default: false },
        loginTimeStamp: { type: [Date], default: [] },
    },
    { timestamps: true },
);

export type UserModel = Model<IUser>;

const User =
    (mongoose.models.User as UserModel) ||
    mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
