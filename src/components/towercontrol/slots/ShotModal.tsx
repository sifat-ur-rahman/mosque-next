'use client';

import { deleteSlotAction } from '@/server/actions/slots/deleteSlotAction';
import {
    updateSlotAction,
    updateSlotActiveStatus,
} from '@/server/actions/slots/updateSlotAction';
import { ISlot } from '@/server/model/slots/slotType';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPen, FaRegTrashAlt } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'sonner';

// 🅱️ Optional: Bangla mapping helper
function getBanglaType(type: 'Iftar' | 'Qurbani' | 'General'): string {
    const map: Record<typeof type, string> = {
        Iftar: 'ইফতার',
        Qurbani: 'কুরবানী',
        General: 'সাধারণ',
    };
    return map[type] || type;
}

interface SlotModalProps {
    selectedSlot: ISlot;
    setSelectedSlot: (slot: ISlot | null) => void;
}

type SlotFormData = {
    title: string;
    time: string;
    numbering: number;
    isActive: boolean;
};

export default function ShotModal({
    selectedSlot,
    setSelectedSlot,
}: SlotModalProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SlotFormData>({
        defaultValues: {
            title: selectedSlot.title,
            time: selectedSlot.time,
            numbering: selectedSlot.numbering,
            isActive: selectedSlot.isActive,
        },
    });

    const onSubmit = async (data: SlotFormData) => {
        try {
            // TODO: Replace this with your actual updateSlotAction()
            const res = await updateSlotAction(selectedSlot._id, data);
            console.log('Updating slot with:', data);
            if (res.success) {
                toast.success('স্লট সফলভাবে আপডেট হয়েছে!');
                setIsEditing(false);
                setSelectedSlot(null);
            } else {
                toast.error('আপডেট ব্যর্থ হয়েছে!');
            }
        } catch {
            toast.error('আপডেট ব্যর্থ হয়েছে!');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteSlotAction(selectedSlot._id);
            //  console.log('Deleting slot:', selectedSlot._id);

            toast.success('স্লট সফলভাবে মুছে ফেলা হয়েছে!');
            setShowDeleteModal(false);
            setSelectedSlot(null);
        } catch {
            toast.error('স্লট মুছে ফেলতে সমস্যা হয়েছে!');
        }
    };
    const handleSlotActivation = async () => {
        try {
            const res = await updateSlotActiveStatus(
                selectedSlot._id,
                selectedSlot.type,
            );
            // console.log('Slot activation response:', res);
            toast.success('স্লট সফলভাবে সক্রিয় করা হয়েছে!');

            setSelectedSlot(null);
        } catch {
            toast.error('স্লট সক্রিয় করতে সমস্যা হয়েছে!');
        }
    };

    if (!selectedSlot) return null;

    return (
        <AnimatePresence>
            {selectedSlot && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedSlot(null)}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-96 rounded-2xl bg-[#3C245A] p-6 text-white shadow-lg"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedSlot(null)}
                            className="absolute right-4 top-4 text-[#D4AF37] hover:text-red-400"
                        >
                            <RxCross2 size={20} />
                        </button>

                        {!isEditing ? (
                            // === View Mode ===
                            <>
                                <h2 className="mb-4 text-center text-xl font-bold text-[#D4AF37]">
                                    {selectedSlot.title}
                                </h2>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <p>
                                            <strong>টাইপ:</strong>{' '}
                                            {getBanglaType(selectedSlot.type)}
                                        </p>
                                        <p>
                                            <strong>সময়:</strong>{' '}
                                            {selectedSlot.time}
                                        </p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>
                                            <strong>সাল:</strong>{' '}
                                            {selectedSlot.year}
                                        </p>
                                        <p>
                                            <strong>নাম্বারিং:</strong>{' '}
                                            {selectedSlot.numbering} তম
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <p>
                                            <strong>স্ট্যাটাস:</strong>{' '}
                                            <span
                                                className={`font-roboto font-bold ${
                                                    selectedSlot.isActive
                                                        ? 'text-green-400'
                                                        : 'text-red-400'
                                                }`}
                                            >
                                                {selectedSlot.isActive
                                                    ? 'Active'
                                                    : 'Inactive'}
                                            </span>
                                        </p>
                                        <div>
                                            <button
                                                onClick={handleSlotActivation}
                                                type="button"
                                                className="rounded-md border border-green-400 px-3 py-1 font-roboto font-semibold text-green-500 transition-all duration-300 hover:text-white hover:opacity-90"
                                            >
                                                Active slot
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-between">
                                    <button
                                        onClick={() => {
                                            reset();
                                            setIsEditing(true);
                                        }}
                                        className="flex items-center gap-1 rounded-md bg-[#D4AF37] px-3 py-1 font-roboto font-semibold text-[#29173F] hover:opacity-90"
                                    >
                                        <FaPen size={14} /> Edit
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteModal(true)}
                                        className="flex items-center gap-1 rounded-md bg-red-500 px-3 py-1 font-roboto font-semibold text-white hover:opacity-90"
                                    >
                                        <FaRegTrashAlt size={14} /> Delete
                                    </button>
                                </div>
                            </>
                        ) : (
                            // === Edit Mode ===
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col gap-3"
                            >
                                <h2 className="mb-4 text-center text-xl font-bold text-[#D4AF37]">
                                    স্লট আপডেট করুন
                                </h2>

                                <div>
                                    <label className="mb-1 block text-sm text-[#D4AF37]">
                                        শিরোনাম
                                    </label>
                                    <input
                                        {...register('title', {
                                            required: 'শিরোনাম প্রয়োজন',
                                        })}
                                        className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                                        placeholder="স্লট শিরোনাম লিখুন"
                                    />
                                    {errors.title && (
                                        <p className="text-xs text-red-400">
                                            {errors.title.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm text-[#D4AF37]">
                                        সময়
                                    </label>
                                    <input
                                        {...register('time', {
                                            required: 'সময় প্রয়োজন',
                                        })}
                                        className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                                        placeholder="সময় লিখুন"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm text-[#D4AF37]">
                                        নাম্বারিং
                                    </label>
                                    <input
                                        type="number"
                                        {...register('numbering', {
                                            valueAsNumber: true,
                                            required: 'নাম্বারিং প্রয়োজন',
                                        })}
                                        className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 font-roboto text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                                    />
                                </div>

                                <div className="mt-4 flex justify-between">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="rounded-md bg-[#D4AF37] px-3 py-1 font-semibold text-[#29173F] hover:opacity-90"
                                    >
                                        {isSubmitting
                                            ? 'আপডেট হচ্ছে...'
                                            : 'আপডেট করুন'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="rounded-md bg-red-500 px-3 py-1 font-semibold text-white hover:opacity-90"
                                    >
                                        বাতিল
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            )}

            {/* ⚠️ Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="w-80 rounded-lg bg-[#3C245A] p-6 text-[#F5F3F0] shadow-lg">
                        <p className="mb-4 text-center">
                            আপনি কি নিশ্চিত আপনি{' '}
                            <strong className="text-[#D4AF37]">
                                {selectedSlot.title}
                            </strong>{' '}
                            মুছে ফেলতে চান?
                        </p>

                        <div className="flex justify-between">
                            <button
                                onClick={handleDelete}
                                className="rounded-md bg-red-500 px-3 py-1 font-semibold text-white hover:opacity-90"
                            >
                                হ্যাঁ, মুছুন
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="rounded-md bg-[#D4AF37] px-3 py-1 font-semibold text-black hover:opacity-90"
                            >
                                বাতিল
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
