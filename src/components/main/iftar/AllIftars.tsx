'use client';

import ComingSoon from '@/components/common/ComingSoon';
import { IIftar } from '@/server/model/iftar/IftarType';
import { ISlot } from '@/server/model/slots/slotType';
import { motion } from 'framer-motion';

function AllIftarComponent({
    allIftars,
    slot,
}: {
    allIftars: IIftar[];
    slot: ISlot;
}) {
    if (!allIftars || allIftars.length === 0) {
        return (
            <div className="min-h-screen bg-[#29173F] p-6 text-white">
                <h1 className="text-center text-xl font-bold md:text-3xl">
                    {slot?.title} -{' '}
                    <span className="font-roboto"> {slot.year}</span>
                </h1>

                <ComingSoon title="ইফতার তালিকা তৈরি হচ্ছে" />
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-[#29173F] p-6 text-white">
            <div className="mb-6 flex items-center justify-center">
                <h1 className="text-center text-xl font-bold md:text-3xl">
                    {slot?.title} -{' '}
                    <span className="font-roboto"> {slot.year}</span>
                </h1>
            </div>

            {/* Iftar Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {allIftars.map((item: any, index: number) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        // onClick={() => handleCardClick(item)}
                        className="flex cursor-pointer flex-col gap-3 rounded-2xl bg-[#3C245A] p-4 shadow-lg"
                    >
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-11 items-center justify-center rounded-full border-2 border-[#D4AF37] font-roboto text-xl font-bold text-white">
                                {item.numbering}
                            </div>
                            <div className="w-full">
                                <p className="mb-1 text-xl font-bold text-[#D4AF37]">
                                    {new Date(item.date).toLocaleDateString(
                                        'bn-BD',
                                    )}
                                </p>
                                <p className="text-base font-bold">
                                    {item.day}
                                </p>
                                {item.names.length > 0 ? (
                                    <ul className="mt-1 grid list-inside list-disc grid-cols-2 justify-between text-sm">
                                        {item.names.map(
                                            (name: string, idx: number) => (
                                                <li className="" key={idx}>
                                                    {name}
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                ) : (
                                    <p className="mt-1 text-sm">
                                        নাম পাওয়া যায়নি
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default AllIftarComponent;
