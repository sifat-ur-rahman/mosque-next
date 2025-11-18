'use client';

import ComingSoon from '@/components/common/ComingSoon';
import { IFamily } from '@/server/model/family/FamilyType';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import FamilyModal from './FamilyModal';

function AllFamilyComponent({ allFamilies }: { allFamilies: IFamily[] }) {
    const [selected, setSelected] = useState<IFamily | null>(null);

    if (!allFamilies || allFamilies.length === 0)
        return (
            <div className="flex h-screen items-center justify-center">
                <ComingSoon title="কোরবানি তালিকা তৈরি হচ্ছে" />

                {/* <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-[#3C245A] border-t-[#D4AF37]"></div> */}
            </div>
        );

    const totalMembers = allFamilies.reduce(
        (acc, f) => acc + (f.members || 0),
        0,
    );

    return (
        <div className="min-h-screen bg-[#29173F] p-6 text-white">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-xl font-bold md:text-3xl">
                    সকল পরিবারের তালিকা
                </h1>
                <Link
                    href="/towercontrol/family/add"
                    className="rounded-lg border border-[#D4AF37]/50 p-2 text-center font-semibold text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#29173F]"
                >
                    নতুন পরিবার যুক্ত করুন
                </Link>
            </div>

            {/* Summary */}
            <div className="mb-6 flex justify-center">
                <div className="w-full max-w-md rounded-2xl border border-[#D4AF37]/50 bg-[#3C245A] py-2 text-center shadow-lg">
                    <div className="mb-2 border-b border-[#D4AF37]/50 pb-1">
                        <p className="flex justify-between gap-2 px-4 text-base">
                            <span className="font-semibold text-white">
                                মোট পরিবার সংখ্যা:
                            </span>
                            <span className="font-roboto font-bold text-[#D4AF37]">
                                {allFamilies.length}
                            </span>
                        </p>
                    </div>

                    <div className="flex justify-between gap-2 px-4 text-base">
                        <p className="font-semibold text-white">
                            মোট সদস্য সংখ্যা:
                        </p>
                        <p className="font-bold text-[#D4AF37]">
                            <span className="font-roboto"> {totalMembers}</span>{' '}
                            জন
                        </p>
                    </div>
                </div>
            </div>

            {/* Family cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {allFamilies.map((family, index) => (
                    <motion.div
                        key={family._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        onClick={() => setSelected(family)}
                        className="no-select flex cursor-pointer flex-col gap-3 rounded-2xl bg-[#3C245A] p-4 shadow-lg transition-transform hover:scale-105"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#D4AF37] font-roboto text-xl font-bold text-white">
                                {family.numbering}
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">
                                    {family.name || 'নাম পাওয়া যায়নি'}
                                </h2>
                                <div className="mt-1 flex w-full items-center justify-between gap-8">
                                    <p className="text-sm">
                                        সদস্য সংখ্যা:{' '}
                                        <strong className="font-roboto">
                                            {family.members}
                                        </strong>
                                    </p>
                                    <p className="text-sm">
                                        ফোন:{' '}
                                        {family.phone ? (
                                            <strong className="font-roboto">
                                                {family.phone}
                                            </strong>
                                        ) : (
                                            <span className="">
                                                নাম্বার নেই
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Family modal */}
            {selected && (
                <FamilyModal
                    family={selected}
                    isOpen={!!selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </div>
    );
}

export default AllFamilyComponent;
