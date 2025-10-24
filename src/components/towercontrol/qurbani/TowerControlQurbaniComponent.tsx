'use client';

import { QurbaniData } from '@/server/model/qurbani/QurbaniType';
import { motion } from 'framer-motion';
import { useState } from 'react';
import TowerControlQurbaniModal from './TowerControlQurbaniModal';

function TowerControlQurbaniComponent({
    data,
    slotId,
}: {
    data: QurbaniData[];
    slotId: string;
}) {
    const [selected, setSelected] = useState<QurbaniData | null>(null);

    if (!data || data.length === 0)
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-[#3C245A] border-t-[#D4AF37]"></div>
            </div>
        );

    const totalFamilies = data.length;
    const totalMembers = data.reduce((acc, f) => acc + (f.members || 0), 0);
    const totalQurbani = data.filter((f) => f.qurbani?.isQurbani).length;

    return (
        <div className="min-h-screen bg-[#29173F] p-6 text-white">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-xl font-bold md:text-3xl">
                    কুরবানির পরিবার তালিকা
                </h1>
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
                                {totalFamilies}
                            </span>
                        </p>
                    </div>

                    <div className="flex justify-between gap-2 px-4 text-base">
                        <p className="font-semibold text-white">
                            মোট সদস্য সংখ্যা:
                        </p>
                        <p className="font-bold text-[#D4AF37]">
                            {totalMembers} জন
                        </p>
                    </div>

                    <div className="mt-2 flex justify-between gap-2 px-4 text-base">
                        <p className="font-semibold text-white">
                            কুরবানি দিচ্ছে:
                        </p>
                        <p className="font-bold text-[#D4AF37]">
                            {totalQurbani} পরিবার
                        </p>
                    </div>
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
                        onClick={() => setSelected(family)}
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

            {/* Modal Placeholder */}
            {selected && (
                <>
                    <TowerControlQurbaniModal
                        qurbani={selected.qurbani}
                        familyId={selected?._id || ''}
                        slotId={slotId}
                        isOpen={!!selected}
                        onClose={() => setSelected(null)}
                    />
                </>
            )}
        </div>
    );
}

export default TowerControlQurbaniComponent;
