'use client';

import { ISlot } from '@/server/model/slots/slotType';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import ShotModal from './ShotModal';

interface AllSlotsComponentProps {
    allSlots: {
        slots: ISlot[];
        count: number;
        type: 'Iftar' | 'Qurbani' | 'General';
    }[];
}

export default function AllSlotsComponent({
    allSlots,
}: AllSlotsComponentProps) {
    const [selectedSlot, setSelectedSlot] = useState<ISlot | null>(null);

    const typeColors: Record<string, string> = {
        Iftar: 'from-yellow-500 to-orange-500',
        Qurbani: 'from-green-500 to-emerald-600',
        General: 'from-blue-500 to-indigo-600',
    };
    function getBanglaType(type: 'Iftar' | 'Qurbani' | 'General'): string {
        const map: Record<typeof type, string> = {
            Iftar: 'ইফতার',
            Qurbani: 'কুরবানী',
            General: 'সাধারণ',
        };
        return map[type] || type;
    }

    return (
        <div className="min-h-screen bg-[#29173F] p-6 text-white">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="font-roboto text-3xl font-bold">All Slots</h1>

                <Link
                    className="rounded-lg border border-[#D4AF37]/50 p-2 text-center font-roboto font-semibold text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#29173F]"
                    href="/towercontrol/slot/add"
                >
                    Add New Slot
                </Link>
            </div>

            {allSlots.map((group, gIndex) => (
                <div key={group.type} className="mb-10">
                    {/* Group Header */}
                    <div className="mb-4 flex items-center gap-3">
                        <h2 className="text-2xl font-bold">
                            <h2 className="text-2xl font-bold">
                                {getBanglaType(group.type)} স্লট
                            </h2>
                        </h2>
                        <span className="ml-2 rounded-full bg-[#D4AF37]/20 px-3 py-1 font-roboto text-sm text-[#D4AF37]">
                            {group.count} items
                        </span>
                    </div>

                    {/* Slot Cards */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {group.slots.map((slot, index) => (
                            <motion.div
                                key={slot._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.4,
                                }}
                                onClick={() => setSelectedSlot(slot)}
                                className={`cursor-pointer rounded-2xl bg-[#3C245A] p-4 shadow-lg transition-transform hover:scale-105 ${
                                    !slot.isActive ? 'opacity-80' : ''
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-[#D4AF37]">
                                        {slot.title}
                                    </h3>
                                    <span
                                        className={`rounded-full px-3 py-1 font-roboto text-xs font-bold ${
                                            slot.isActive
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-500 text-white'
                                        }`}
                                    >
                                        {slot.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                <div className="mt-3 space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <p>
                                            সময়:{' '}
                                            <span className="font-bold">
                                                {slot.time}
                                            </span>
                                        </p>
                                        <p>
                                            সাল:{' '}
                                            <span className="font-roboto font-bold">
                                                {slot.year}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>
                                            নাম্বারিং:{' '}
                                            <span className="font-bold">
                                                <span className="font-roboto">
                                                    {' '}
                                                    {slot.numbering}
                                                </span>{' '}
                                                তম
                                            </span>
                                        </p>
                                        <p className="text-xs text-gray-300">
                                            তৈরি:{' '}
                                            {new Date(
                                                slot.createdAt,
                                            ).toLocaleDateString('bn-BD')}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Simple Slot Modal */}
            {selectedSlot && (
                <ShotModal
                    selectedSlot={selectedSlot}
                    setSelectedSlot={setSelectedSlot}
                />
            )}
        </div>
    );
}
