export interface IDonation {
    _id: string;
    numbering: number;
    name: string;
    amount: number;
    isRead: boolean;
    due: number;
    createdAt: Date;
    updatedAt: Date;
}
