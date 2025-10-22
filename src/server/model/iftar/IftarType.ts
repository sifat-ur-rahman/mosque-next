import { Types } from 'mongoose';

export interface IIftar {
    _id: string;
    numbering: number;
    slotId: Types.ObjectId;
    names: string[];
    date: Date;
    day: string;
    createdAt: Date;
    updatedAt: Date;
}
