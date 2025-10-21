import mongoose, { Model, Schema } from 'mongoose';
import { ISlot } from './slotType';

const SlotSchema = new Schema<ISlot>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ['Iftar', 'Qurbani', 'General'],
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
            default: new Date().getFullYear(),
        },
        numbering: {
            type: Number,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);
export type SlotModel = Model<ISlot>;

const Slot =
    (mongoose.models.Slot as SlotModel) ||
    mongoose.model<ISlot, SlotModel>('Slot', SlotSchema);

export default Slot;
