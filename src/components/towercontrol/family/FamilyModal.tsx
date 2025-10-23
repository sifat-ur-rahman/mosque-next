'use client';

import deleteFamilyAction from '@/server/actions/family/deleteFamilyAction';
import updateFamilyAction from '@/server/actions/family/updateFamilyAction';
import { IFamily } from '@/server/model/family/FamilyType';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPen, FaRegTrashAlt } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'sonner';

interface FamilyModalProps {
    family: IFamily;
    isOpen: boolean;
    onClose: () => void;
}

type FormData = {
    name: string;
    members: number;
    phone: string;
    numbering: number;
};

export default function FamilyModal({
    family,
    isOpen,
    onClose,
}: FamilyModalProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        defaultValues: {
            name: family.name,
            members: family.members,
            phone: family.phone,
            numbering: family.numbering,
        },
    });

    useEffect(() => {
        reset({
            name: family.name,
            members: family.members,
            phone: family.phone,
            numbering: family.numbering,
        });
    }, [family, reset]);

    const onSubmit = async (data: FormData) => {
        try {
            const res = await updateFamilyAction({
                id: family._id,
                ...data,
            });
            if (!res.success) {
                toast.error(
                    res.message || 'পরিবারের তথ্য আপডেট ব্যর্থ হয়েছে!',
                );
                return;
            }
            toast.success(res.message || 'পরিবারের তথ্য সফলভাবে আপডেট হয়েছে!');
            setIsEditing(false);
            onClose();
        } catch {
            toast.error('পরিবারের তথ্য আপডেট করতে সমস্যা হয়েছে!');
        }
    };

    const handleDelete = async () => {
        try {
            const res = await deleteFamilyAction(family._id);
            if (!res.success) {
                toast.error(res.message || 'পরিবার মুছে ফেলা ব্যর্থ!');
                return;
            }
            toast.success(res.message || 'পরিবার সফলভাবে মুছে ফেলা হয়েছে!');
            setShowDeleteModal(false);
            onClose();
        } catch {
            toast.error('পরিবার মুছে ফেলতে সমস্যা হয়েছে!');
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
                            <>
                                {/* View Mode */}
                                <h2 className="mb-4 text-center text-xl font-bold text-[#D4AF37]">
                                    {family.name || 'নাম পাওয়া যায়নি'}
                                </h2>
                                <div className="space-y-2">
                                    <p>
                                        সদস্য সংখ্যা:{' '}
                                        <span className="font-roboto font-bold">
                                            {family.members}
                                        </span>
                                    </p>
                                    <p>
                                        ফোন নম্বর:{' '}
                                        <span className="font-roboto font-bold">
                                            {family.phone || '-'}
                                        </span>
                                    </p>
                                </div>
                                <div className="mt-6 flex justify-between">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-1 rounded-md bg-[#D4AF37] px-3 py-1 font-semibold text-[#29173F] hover:opacity-90"
                                    >
                                        <FaPen /> পরিবর্তন করুন
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteModal(true)}
                                        className="flex items-center gap-1 rounded-md bg-red-500 px-3 py-1 font-semibold text-white hover:opacity-90"
                                    >
                                        <FaRegTrashAlt size={14} /> মুছে ফেলুন
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Edit Mode */}
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="flex flex-col gap-3"
                                >
                                    <h2 className="mb-4 text-center text-xl font-bold text-[#D4AF37]">
                                        পরিবারের তথ্য আপডেট করুন
                                    </h2>

                                    <div>
                                        <label className="mb-1 block text-sm text-[#D4AF37]">
                                            পরিবারের নাম
                                        </label>
                                        <input
                                            {...register('name', {
                                                required: 'নাম প্রয়োজন',
                                            })}
                                            className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-400">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm text-[#D4AF37]">
                                            সদস্য সংখ্যা
                                        </label>
                                        <input
                                            type="number"
                                            {...register('members', {
                                                required:
                                                    'সদস্য সংখ্যা প্রয়োজন',
                                                min: {
                                                    value: 1,
                                                    message:
                                                        'সদস্য সংখ্যা ১ বা তার বেশি হতে হবে',
                                                },
                                            })}
                                            className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                                        />
                                        {errors.members && (
                                            <p className="text-sm text-red-400">
                                                {errors.members.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm text-[#D4AF37]">
                                            ফোন নম্বর
                                        </label>
                                        <input
                                            {...register('phone', {
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: 'শুধু সংখ্যা দিন',
                                                },
                                            })}
                                            className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                                        />
                                        {errors.phone && (
                                            <p className="text-sm text-red-400">
                                                {errors.phone.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm text-[#D4AF37]">
                                            সিরিয়াল নাম্বার
                                        </label>
                                        <input
                                            type="number"
                                            {...register('numbering', {
                                                required:
                                                    'সিরিয়াল নাম্বার দিন',
                                                min: {
                                                    value: 1,
                                                    message:
                                                        '১ বা তার বেশি হতে হবে',
                                                },
                                            })}
                                            className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                                        />
                                        {errors.numbering && (
                                            <p className="text-sm text-red-400">
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
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="w-80 rounded-lg bg-[#3C245A] p-6 text-[#F5F3F0] shadow-lg">
                        <p className="mb-4 text-center">
                            আপনি কি নিশ্চিত যে{' '}
                            <strong className="text-[#D4AF37]">
                                {family.name}
                            </strong>{' '}
                            মুছে ফেলতে চান?
                        </p>
                        <div className="flex justify-between">
                            <button
                                onClick={handleDelete}
                                className="rounded-md bg-red-500 px-3 py-1 font-semibold text-white hover:opacity-90"
                            >
                                হ্যাঁ, মুছে ফেলুন
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
