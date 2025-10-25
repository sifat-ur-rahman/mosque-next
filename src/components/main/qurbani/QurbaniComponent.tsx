'use client';

import { QurbaniData } from '@/server/model/qurbani/QurbaniType';
import { ISlot } from '@/server/model/slots/slotType';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

function QurbaniComponent({
    data,
    slotId,
}: {
    data: QurbaniData[];
    slotId: ISlot;
}) {
    const [openSummary, setOpenSummary] = useState(false);

    if (!data || data.length === 0)
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-[#3C245A] border-t-[#D4AF37]"></div>
            </div>
        );
    //  Optimized calculations using useMemo
    const summary = useMemo(() => {
        const totalFamilies = data.length;
        const totalMembers = data.reduce((acc, f) => acc + (f.members || 0), 0);
        const totalQurbani = data.filter((f) => f.qurbani?.isQurbani).length;

        const totalForeignMember = data.reduce(
            (acc, f) => acc + (f.qurbani?.foreignMember || 0),
            0,
        );

        const qurbaniTrueMembers = data
            .filter((f) => f.qurbani?.isQurbani)
            .reduce((acc, f) => acc + (f.members || 0), 0);

        const qurbaniFalseMembers = data
            .filter((f) => !f.qurbani?.isQurbani)
            .reduce((acc, f) => acc + (f.members || 0), 0);

        const qurbaniTrueForeign = data
            .filter((f) => f.qurbani?.isQurbani)
            .reduce((acc, f) => acc + (f.qurbani?.foreignMember || 0), 0);

        const qurbaniFalseForeign = data
            .filter((f) => !f.qurbani?.isQurbani)
            .reduce((acc, f) => acc + (f.qurbani?.foreignMember || 0), 0);

        const qurbaniFalseFamilies = data.filter(
            (f) => !f.qurbani?.isQurbani,
        ).length;

        return {
            totalFamilies,
            totalMembers,
            totalQurbani,
            totalForeignMember,
            qurbaniTrueMembers,
            qurbaniFalseMembers,
            qurbaniTrueForeign,
            qurbaniFalseForeign,
            qurbaniFalseFamilies,
        };
    }, [data]);
    return (
        <div className="min-h-screen bg-[#29173F] p-6 text-white">
            {/* Header */}
            <div className="mb-6 flex items-center justify-center">
                <h1 className="text-xl font-bold md:text-3xl">
                    {slotId.title} -
                    <span className="font-roboto"> {slotId.year}</span>
                </h1>
            </div>

            <div className="mb-6 flex justify-center">
                <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#D4AF37]/50 bg-[#3C245A] shadow-lg">
                    <button
                        onClick={() => setOpenSummary(!openSummary)}
                        className="flex w-full items-center justify-between px-5 py-3 text-lg font-semibold text-[#D4AF37] focus:outline-none"
                    >
                        সংক্ষিপ্ত বিবরণ দেখুন
                        <motion.span
                            animate={{ rotate: openSummary ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-xl"
                        >
                            ▼
                        </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                        {openSummary && (
                            <motion.div
                                key="content"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                    duration: 0.4,
                                    ease: 'easeInOut',
                                }}
                                className="overflow-hidden border-t border-[#D4AF37]/40 bg-[#412A67]"
                            >
                                <div className="space-y-2 px-6 py-4 text-sm">
                                    <div className="flex justify-between border-b border-[#D4AF37]/30 pb-1">
                                        <span>মোট পরিবার:</span>
                                        <span className="font-roboto text-[#D4AF37]">
                                            {summary.totalFamilies}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>মোট সদস্য:</span>
                                        <span className="font-roboto text-[#D4AF37]">
                                            {summary.totalMembers} জন
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>মোট দেশের বাইরে:</span>
                                        <span className="font-roboto text-[#D4AF37]">
                                            {summary.totalForeignMember} জন
                                        </span>
                                    </div>

                                    <div className="flex justify-between border-t border-[#D4AF37]/30 pt-2">
                                        <span>কুরবানি দিচ্ছে পরিবার:</span>
                                        <span className="font-roboto text-[#D4AF37]">
                                            {summary.totalQurbani} পরিবার
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>কুরবানি দিচ্ছে সদস্য:</span>
                                        <span className="font-roboto text-[#D4AF37]">
                                            {summary.qurbaniTrueMembers} জন
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>কুরবানি দিচ্ছে দেশের বাইরে:</span>
                                        <span className="font-roboto text-[#D4AF37]">
                                            {summary.qurbaniTrueForeign} জন
                                        </span>
                                    </div>

                                    <div className="flex justify-between border-t border-[#D4AF37]/30 pt-2">
                                        <span>কুরবানি দিচ্ছে না পরিবার:</span>
                                        <span className="font-bold text-[#D4AF37]">
                                            {summary.qurbaniFalseFamilies}{' '}
                                            পরিবার
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>কুরবানি দিচ্ছে না সদস্য:</span>
                                        <span className="font-roboto text-[#D4AF37]">
                                            {summary.qurbaniFalseMembers} জন
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>
                                            কুরবানি দিচ্ছে না দেশের বাইরে:
                                        </span>
                                        <span className="font-roboto text-[#D4AF37]">
                                            {summary.qurbaniFalseForeign} জন
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Family cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {data.map((family, index) => (
                    <motion.div
                        key={family._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        // onClick={() => setSelected(family)}
                        className="no-select flex cursor-pointer flex-col gap-3 rounded-2xl bg-[#3C245A] p-4 shadow-lg transition-transform hover:scale-105"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#D4AF37] font-roboto text-xl font-bold text-white">
                                {family.numbering}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">
                                    {family.name || 'নাম পাওয়া যায়নি'}
                                </h2>
                                <div className="mt-1 flex w-full items-center justify-between gap-8">
                                    <p className="text-sm">
                                        সদস্য:{' '}
                                        <strong className="font-roboto">
                                            {family.members}
                                        </strong>{' '}
                                        জন
                                    </p>
                                    {family?.qurbani?.foreignMember !== 0 &&
                                        family?.qurbani?.foreignMember !==
                                            null &&
                                        family?.qurbani?.foreignMember !==
                                            undefined && (
                                            <p className="text-sm text-gray-300">
                                                দেশের বাইরে:{' '}
                                                <strong className="font-roboto">
                                                    {
                                                        family?.qurbani
                                                            ?.foreignMember
                                                    }
                                                </strong>{' '}
                                                জন
                                            </p>
                                        )}
                                </div>
                            </div>
                        </div>

                        {/* Qurbani Info */}
                        {family.qurbani ? (
                            <div
                                className={`mt-2 rounded-xl border p-2 text-center text-sm ${
                                    family.qurbani.isQurbani
                                        ? 'border-green-400 bg-green-900/20 text-green-300'
                                        : 'border-red-400 bg-red-900/20 text-red-300'
                                }`}
                            >
                                {family.qurbani.isQurbani ? (
                                    <>
                                        🐐 কুরবানি দিচ্ছে (
                                        {family.qurbani.animalType || 'অজানা'})
                                    </>
                                ) : (
                                    <>❌ কুরবানি দিচ্ছে না</>
                                )}
                            </div>
                        ) : (
                            <div className="mt-2 rounded-xl border border-gray-500 bg-gray-800/30 p-2 text-center text-sm text-gray-300">
                                ❓ তথ্য নেই
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default QurbaniComponent;
