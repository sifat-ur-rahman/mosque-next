import mongoose, { Model, Schema } from 'mongoose';
import { IDonation } from './donationType';

const donationSchema: Schema<IDonation> = new Schema<IDonation>(
    {
        name: String,
        numbering: Number,
        amount: Number,
        isRead: { type: Boolean, default: false },
        due: { type: Number, default: 0 },
    },
    { timestamps: true },
);

export type DonationModel = Model<IDonation>;

const Donation =
    (mongoose.models.Donation as DonationModel) ||
    mongoose.model<IDonation, DonationModel>('Donation', donationSchema);

export default Donation;
