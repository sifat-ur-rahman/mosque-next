export interface IUser {
    _id: string;
    name: string;
    phone: string;
    password: string;
    role: 'Admin' | 'Moderator' | 'User';
    loginTimeStamp: [Date];
    isDeleted: boolean;
    createdAt: Date;
}
