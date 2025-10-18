'use server';

import Donation from '@/server/model/donations/donationModal';
import connectMongo from '@/server/utils/connection';

//  get all donation from database
export default async function getDonations() {
    await connectMongo();
    const donations = await Donation.find().lean();
    return donations;
}

// get donation count from database
export async function getDonationCount() {
    await connectMongo();
    const count = await Donation.countDocuments().lean();
    return count;
}

// get donation by id from database
export async function getDonation(id: string) {
    await connectMongo();
    const donation = await Donation.findById(id).lean();
    return donation;
}
