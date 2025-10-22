import { Types } from 'mongoose';

export interface IIftar {
    _id: string;
    numbering: string;
    slotId: Types.ObjectId;
    names: string[];
    date: Date;
    day: string;
    createdAt: Date;
    updatedAt: Date;
}
