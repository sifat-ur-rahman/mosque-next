'use client';
import { updateDonationIsReadAction } from '@/server/actions/donations/updateDonationAction';
import { IDonation } from '@/server/model/donations/donationType';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import TowerControlDonationModal from './TowerControlDonationModal';
function AllTowerControlDonationComponent({
    allDonations,
}: {
    allDonations: IDonation[];
}) {
    const [selected, setSelected] = useState<IDonation | null>(null);
    const handleCardClick = async (donation: IDonation) => {
        setSelected(donation);

        // If donation is not read, mark it as read
        if (!donation.isRead) {
            await updateDonationIsReadAction(donation._id, true);
        }
    };
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {allDonations.map((item, index) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        onClick={() => handleCardClick(item)}
                        className={`no-select flex cursor-pointer flex-col gap-3 rounded-2xl bg-[#3C245A] p-4 shadow-lg transition-transform ${
                            !item.isRead
                                ? 'border border-[#D4AF37]'
                                : 'bg-[#3C245A]'
                        } `}
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
                <TowerControlDonationModal
                    donation={selected}
                    isOpen={!!selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </div>
    );
}

export default AllTowerControlDonationComponent;
