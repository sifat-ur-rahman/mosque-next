import mongoose, { Model, Schema } from 'mongoose';
import { IIftar } from './IftarType';

const IftarSchema = new Schema<IIftar>(
    {
        numbering: {
            type: String,
            required: true,
        },
        slotId: {
            type: Schema.Types.ObjectId,
            ref: 'Slot',
            required: true,
        },
        names: {
            type: [String],
            //required: true,
            default: [],
        },
        date: {
            type: String,
            required: true,
        },
        day: {
            type: String,
            required: true,
            trim: true,
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

export type IftarModel = Model<IIftar>;

const Iftar =
    (mongoose.models.Iftar as IftarModel) ||
    mongoose.model<IIftar, IftarModel>('Iftar', IftarSchema);

export default Iftar;
