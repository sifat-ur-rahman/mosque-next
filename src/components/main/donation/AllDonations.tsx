'use client';
import { IDonation } from '@/server/model/donations/donationType';
import { formatBDT } from '@/utils/formatBDT';
import { motion } from 'framer-motion';

function AllDonationsComponent({
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
    return (
        <div className="hide-scrollbar-mobile min-h-screen bg-[#29173F] p-6 text-white">
            <div className="mb-6 flex items-center justify-center">
                {' '}
                <h1 className="text-xl font-bold md:text-3xl">
                    সকল মাসিক দাতার তালিকা
                </h1>
            </div>
            {/* Summary Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                // whileHover={{ scale: 1.05 }}
                transition={{
                    delay: 0.1,
                    duration: 0.5,
                    type: 'spring',
                }}
                viewport={{ once: true, amount: 0.2 }}
                className="mb-6 flex w-full justify-center"
            >
                <div className="w-full max-w-md rounded-2xl border border-[#D4AF37]/50 bg-[#3C245A] py-2 text-center shadow-lg">
                    <div className="mb-2 border-b border-[#D4AF37]/50 pb-1">
                        <p className="flex justify-between gap-2 px-4 text-base">
                            <span className="font-semibold text-white">
                                মোট দাতার সংখ্যা:
                            </span>{' '}
                            <span className="font-bold text-[#D4AF37]">
                                <span className="font-roboto">
                                    {' '}
                                    {formatBDT(
                                        donationSummary?.totalCount || 0,
                                    )}
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
                                {formatBDT(donationSummary?.totalAmount) || 0} ৳
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <p className="flex justify-between gap-2 px-4 text-base">
                            <span className="font-semibold text-white">
                                মোট বকেয়া:
                            </span>{' '}
                            <span className="font-roboto font-bold text-[#D4AF37]">
                                {formatBDT(donationSummary?.totalDue) || 0} ৳
                            </span>
                        </p>
                    </div>
                </div>
            </motion.div>
            <div className="grid grid-cols-1 gap-8 md:mb-7 md:grid-cols-3">
                {allDonations.map((item, index) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{
                            delay: 0.3,
                            duration: 0.5,
                            type: 'spring',
                        }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="no-select flex cursor-pointer flex-col gap-3 rounded-2xl bg-[#3C245A] p-4 shadow-lg transition-transform"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#D4AF37] font-roboto text-xl font-bold text-white">
                                {item.numbering}
                            </div>
                            <div className="flex-1">
                                <div className="grid grid-cols-2 gap-8">
                                    <h4 className="text-lg font-semibold">
                                        {item.name || 'নাম পাওয়া যায়নি'}
                                    </h4>
                                    {item.type && item.type !== 'monthly' && (
                                        <p className="mt-1 text-sm">
                                            <strong className="">
                                                {item.type === 'one-time'
                                                    ? 'এককালীন'
                                                    : item.type === 'yearly'
                                                      ? 'বাৎসরিক'
                                                      : item.type === 'other'
                                                        ? 'অন্যান্য'
                                                        : ''}
                                            </strong>
                                        </p>
                                    )}
                                </div>
                                <div className="mt-1 flex w-full items-center gap-8">
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
            {/*  */}
        </div>
    );
}

export default AllDonationsComponent;
