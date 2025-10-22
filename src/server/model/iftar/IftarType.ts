import { Types } from 'mongoose';

export interface IIftar {
    _id: string;
    numbering: string;
    slotId: Types.ObjectId;
    names: string[];
    date: string;
    day: string;
    createdAt: Date;
    updatedAt: Date;
}
