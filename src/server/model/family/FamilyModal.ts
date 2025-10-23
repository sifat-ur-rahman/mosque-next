import mongoose, { Model, Schema } from 'mongoose';
import { IFamily } from './FamilyType'; // import your interface

const FamilySchema = new Schema<IFamily>(
    {
        numbering: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        members: {
            type: Number,
            required: true,
            default: 1,
        },
        phone: {
            type: String,
            default: '',
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

export type FamilyModel = Model<IFamily>;

const Family =
    (mongoose.models.Family as FamilyModel) ||
    mongoose.model<IFamily, FamilyModel>('Family', FamilySchema);

export default Family;
