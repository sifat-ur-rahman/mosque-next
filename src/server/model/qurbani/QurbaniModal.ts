import mongoose, { Model, Schema } from 'mongoose';
import { IQurbani } from './QurbaniType';

const QurbaniSchema = new Schema<IQurbani>(
    {
        slotId: {
            type: Schema.Types.ObjectId,
            ref: 'Slot',
            required: true,
        },
        familyId: {
            type: Schema.Types.ObjectId,
            ref: 'Family',
            required: true,
        },
        isQurbani: {
            type: Boolean,
            default: false,
        },
        animalType: {
            type: String,
            enum: ['cow', 'goat', 'camel', 'sheep', 'other', ''],
            default: '',
        },
        foreignMember: {
            type: Number,
            default: 0,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

export type QurbaniModel = Model<IQurbani>;

const Qurbani =
    (mongoose.models.Qurbani as QurbaniModel) ||
    mongoose.model<IQurbani, QurbaniModel>('Qurbani', QurbaniSchema);

export default Qurbani;
