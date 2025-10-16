export interface IUser {
    phone: string;
    password: string;
    createdAt: Date;
    role: 'Admin' | 'Moderator' | 'User';
    isDeleted: boolean;
    _id: string;
}
