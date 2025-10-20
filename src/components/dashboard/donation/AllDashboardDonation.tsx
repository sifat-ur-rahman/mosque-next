'use client';
import { IDonation } from '@/server/model/donations/donationType';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import DashboardDonationModal from './DashboardDonationModal';

function AllDashboardDonationComponent({
    allDonations,
    donationSummary,
}: {
    allDonations: IDonation[];
    donationSummary: {
        totalCount: number;
        totalAmount: number;
        totalDue: number;
    };
}) {
    const [selected, setSelected] = useState<IDonation | null>(null);

    return (
        <div className="min-h-screen bg-[#29173F] p-6 text-white">
            <div className="mb-6 flex items-center justify-between">
                {' '}
                <h1 className="text-xl font-bold md:text-3xl">
                    সকল দাতার তালিকা
                </h1>
                <Link
                    className="rounded-lg border border-[#D4AF37]/50 p-2 text-center font-semibold text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#29173F]"
                    href="/dashboard/donation/add"
                >
                    নতুন দাতা যুক্ত করুন
                </Link>
            </div>
            {/* Summary Section */}
            <div className="mb-6 flex justify-center">
                <div className="w-full max-w-md rounded-2xl border border-[#D4AF37]/50 bg-[#3C245A] py-2 text-center shadow-lg">
                    <div className="mb-2 border-b border-[#D4AF37]/50 pb-1">
                        <p className="flex justify-between gap-2 px-4 text-base">
                            <span className="font-semibold text-white">
                                মোট দাতার সংখ্যা:
                            </span>{' '}
                            <span className="font-bold text-[#D4AF37]">
                                <span className="font-roboto">
                                    {' '}
                                    {donationSummary?.totalCount || 0}
                                </span>{' '}
                                জন
                            </span>
                        </p>
                    </div>
                    <div className="mb-2 border-b border-[#D4AF37]/50 pb-1">
                        <div className="flex justify-between gap-2 px-4 text-base">
                            <p className="font-semibold text-white">
                                মোট নির্ধারিত দান (প্রতি মাসে):
                            </p>{' '}
                            <p className="font-roboto font-bold text-[#D4AF37]">
                                {donationSummary?.totalAmount || 0} ৳
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <p className="flex justify-between gap-2 px-4 text-base">
                            <span className="font-semibold text-white">
                                মোট বকেয়া:
                            </span>{' '}
                            <span className="font-roboto font-bold text-[#D4AF37]">
                                {donationSummary?.totalDue || 0} ৳
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {allDonations.map((item, index) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        onClick={() => setSelected(item)}
                        className={`no-select flex cursor-pointer flex-col gap-3 rounded-2xl bg-[#3C245A] p-4 shadow-lg transition-transform hover:scale-105`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#D4AF37] font-roboto text-xl font-bold text-white">
                                {item.numbering}
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">
                                    {item.name || 'নাম পাওয়া যায়নি'}
                                </h2>
                                <div className="mt-1 flex w-full items-center justify-between gap-8">
                                    <p className="text-sm">
                                        নির্ধারিত:{' '}
                                        <strong className="font-roboto">
                                            {item.amount}
                                        </strong>{' '}
                                        ৳
                                    </p>
                                    <p className="text-sm">
                                        বকেয়াঃ{' '}
                                        <strong className="font-roboto">
                                            {item.due || 0}
                                        </strong>{' '}
                                        ৳
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            {selected && (
                <DashboardDonationModal
                    donation={selected}
                    isOpen={!!selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </div>
    );
}

export default AllDashboardDonationComponent;
