'use client';

import deleteDonationAction from '@/server/actions/donations/deleteDonationAction';
import { getDonationCount } from '@/server/actions/donations/gatDonations';
import updateDonationAction from '@/server/actions/donations/updateDonationAction';
import { IDonation } from '@/server/model/donations/donationType';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPen, FaRegTrashAlt } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'sonner';

interface TowerControlDonationModalProps {
    donation: IDonation;
    isOpen: boolean;
    onClose: () => void;
}

type FormData = {
    name: string;
    amount: number;
    due: number;
    numbering: number;
};

export default function TowerControlDonationModal({
    donation,
    isOpen,
    onClose,
}: TowerControlDonationModalProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [donationCount, setDonationCount] = useState<number>(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        defaultValues: {
            name: donation.name,
            amount: donation.amount,
            due: donation.due,
            numbering: donation.numbering,
        },
    });
    useEffect(() => {
        const fetchDonationCount = async () => {
            try {
                const count = await getDonationCount();
                setDonationCount(count);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDonationCount();
    }, [donation]);

    const onSubmit = async (data: FormData) => {
        try {
            const res = await updateDonationAction({
                id: donation._id,
                name: data.name,
                amount: +data.amount,
                due: +data.due,
                numbering: +data.numbering,
            });

            if (!res.success) {
                toast.error(res.message || 'দাতার তথ্য আপডেট ব্যর্থ হয়েছে!');
                return;
            }

            toast.success(res.message || 'দাতার তথ্য সফলভাবে আপডেট হয়েছে!');
            setIsEditing(false);
            onClose();
        } catch (err) {
            toast.error('দাতার তথ্য আপডেট করতে সমস্যা হয়েছে!');
        }
    };
    const handleDelete = async () => {
        try {
            const res = await deleteDonationAction(donation._id);
            if (!res.success) {
                toast.error(res.message || 'Failed to delete!');
                return;
            }
            toast.success(res.message || 'Deleted successfully!');
            setShowDeleteModal(false);
            onClose();
        } catch {
            toast.error('Error deleting!');
        }
    };
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="relative mx-4 w-full rounded-2xl bg-[#3C245A] p-6 text-[#F5F3F0] shadow-lg md:mx-0 md:w-[400px]"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 text-[#D4AF37] hover:text-red-400"
                        >
                            <RxCross2 size={20} />
                        </button>

                        {!isEditing ? (
                            // === View Mode ===
                            <>
                                <h2 className="mb-4 text-center text-xl font-bold text-[#D4AF37]">
                                    {donation.name || 'নাম পাওয়া যায়নি'}
                                </h2>

                                <div className="space-y-2">
                                    <p>
                                        নির্ধারিত:{' '}
                                        <span className="font-roboto font-bold">
                                            {donation.amount || 0} ৳
                                        </span>
                                    </p>
                                    <p>
                                        বকেয়াঃ{' '}
                                        <span className="font-roboto font-bold">
                                            {donation.due || 0} ৳
                                        </span>
                                    </p>
                                </div>

                                <div className="mt-6 flex justify-between">
                                    <button
                                        onClick={() => {
                                            reset();
                                            setIsEditing(true);
                                        }}
                                        className="flex items-center gap-1 rounded-md bg-[#D4AF37] px-3 py-1 font-semibold text-[#29173F] hover:opacity-90"
                                    >
                                        <FaPen /> পরিবর্তন করুন
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteModal(true)}
                                        className="flex items-center gap-1 rounded-md bg-red-500 px-3 py-1 font-semibold text-white hover:opacity-90"
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
                                    দাতার তথ্য আপডেট করুন
                                </h2>

                                <div>
                                    <label className="mb-1 block text-sm text-[#D4AF37]">
                                        দাতার নাম
                                    </label>
                                    <input
                                        {...register('name', {
                                            required: 'নাম প্রয়োজন',
                                        })}
                                        className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                                        placeholder="নাম লিখুন"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-400">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm text-[#D4AF37]">
                                        দানের পরিমাণ (টাকা)
                                    </label>
                                    <input
                                        type="number"
                                        {...register('amount', {
                                            required: 'পরিমাণ প্রয়োজন',
                                            valueAsNumber: true,
                                            min: {
                                                value: 0,
                                                message: '০ এর বেশি হতে হবে',
                                            },
                                        })}
                                        className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 font-roboto text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                                        placeholder="ডোনেশন পরিমাণ"
                                    />
                                    {errors.amount && (
                                        <p className="text-sm text-red-400">
                                            {errors.amount.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm text-[#D4AF37]">
                                        বাকেয়া টাকা (যদি থাকে)
                                    </label>
                                    <input
                                        type="number"
                                        {...register('due', {
                                            valueAsNumber: true,
                                        })}
                                        className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 font-roboto text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                                        placeholder="বাকি পরিমাণ"
                                    />
                                    {errors.due && (
                                        <p className="text-sm text-red-400">
                                            {errors.due.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm text-[#D4AF37]">
                                        সিরিয়াল নাম্বার (যদি পরিবর্তন করতে চান)
                                    </label>
                                    <select
                                        {...register('numbering', {
                                            required: 'সিরিয়াল নাম্বার দিন',
                                            valueAsNumber: true,
                                        })}
                                        defaultValue={donation.numbering}
                                        className="min-h-[2.44rem] w-full appearance-none rounded-md border border-[#D4AF37]/40 bg-[#29173F] px-4 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                                    >
                                        {Array.from(
                                            { length: donationCount },
                                            (_, i) => {
                                                const number = i + 1;

                                                return (
                                                    <option
                                                        key={number}
                                                        value={number}
                                                    >
                                                        {number}
                                                    </option>
                                                );
                                            },
                                        )}
                                    </select>
                                    {errors.numbering && (
                                        <p className="mt-1 text-xs text-red-400">
                                            {errors.numbering.message}
                                        </p>
                                    )}
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
                                {donation.name}
                            </strong>{' '}
                            কে মুছে ফেলতে চান?
                        </p>

                        <div className="flex justify-between">
                            <button
                                onClick={handleDelete}
                                className="rounded-md bg-red-500 px-3 py-1 font-semibold text-white hover:opacity-90"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="rounded-md bg-[#D4AF37] px-3 py-1 font-semibold text-black hover:opacity-90"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
