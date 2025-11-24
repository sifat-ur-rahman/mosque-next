'use client';

import { IIftar } from '@/server/model/iftar/IftarType';
import { ISlot } from '@/server/model/slots/slotType';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import TowerControlIftarModal from './TowerControlIftarModal';

function TowerControlIftarComponent({
    allIftars,
    slot,
}: {
    allIftars: IIftar[];
    slot: ISlot;
}) {
    //  console.log(slot);
    const [selectedIftar, setSelectedIftar] = useState<IIftar | null>(null);

    const handleCardClick = (iftar: IIftar) => {
        setSelectedIftar(iftar);
    };

    return (
        <div className="min-h-screen bg-[#29173F] p-6 text-white">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-xl font-bold md:text-3xl">
                    {slot?.title} -{' '}
                    <span className="font-roboto"> {slot.year}</span>
                </h1>
                <Link
                    className="rounded-lg border border-[#D4AF37]/50 p-2 text-center font-roboto font-semibold text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#29173F]"
                    href="/towercontrol/iftar/add"
                >
                    Add New Iftar
                </Link>
            </div>

            {/* Iftar Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {allIftars.map((item, index) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        onClick={() => handleCardClick(item)}
                        className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-[#D4AF37] bg-[#3C245A] p-4 shadow-lg"
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
                                        {item.names.map((name, idx) => (
                                            <li className="" key={idx}>
                                                {name}
                                            </li>
                                        ))}
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

            {selectedIftar && (
                <TowerControlIftarModal
                    iftar={selectedIftar}
                    isOpen={!!selectedIftar}
                    onClose={() => setSelectedIftar(null)}
                />
            )}
        </div>
    );
}

export default TowerControlIftarComponent;
