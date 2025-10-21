export interface ISlot {
    _id: string;
    title: string;
    type: 'Iftar' | 'Qurbani' | 'General';
    time: string;
    year: number;
    numbering: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
