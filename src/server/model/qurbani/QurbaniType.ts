import { Types } from 'mongoose';

export interface IQurbani {
    _id: string;
    slotId: Types.ObjectId;
    familyId: Types.ObjectId;
    isQurbani: boolean;
    animalType: 'cow' | 'goat' | 'camel' | 'sheep' | 'other';
    foreignMember: number;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface FamilyQurbaniInput {
    name: string;
    members: number;
    phone?: string;
    numbering?: number;
    isQurbani: boolean;
    slotId: string;
    animalType: 'cow' | 'goat' | 'camel' | 'sheep' | 'other';
    foreignMember?: number;
}
