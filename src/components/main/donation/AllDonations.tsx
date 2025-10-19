'use client';
import { IDonation } from '@/server/model/donations/donationType';
import { motion } from 'framer-motion';

function AllDonationsComponent({
    allDonations,
}: {
    allDonations: IDonation[];
}) {
    // const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    return (
        <div className="min-h-screen bg-[#29173F] p-6 text-white">
            <div className="mb-6 flex items-center justify-center">
                {' '}
                <h1 className="text-xl font-bold md:text-3xl">
                    সকল মাসিক দাতার তালিকা
                </h1>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {allDonations.map((item, index) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{
                            delay: index * 0.1,
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
            {/*  */}
        </div>
    );
}

export default AllDonationsComponent;
