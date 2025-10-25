'use client';

import { addQurbaniAction } from '@/server/actions/qurbani/addQurbaniAction';
import { deleteQurbaniAction } from '@/server/actions/qurbani/deleteQurbaniAction';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPen, FaRegTrashAlt } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'sonner';

interface IQurbaniModalProps {
    qurbani: any;
    familyId: string;
    slotId: string;
    isOpen: boolean;
    onClose: () => void;
}

type FormData = {
    isQurbani: boolean;
    animalType: 'cow' | 'goat' | 'camel' | 'sheep' | 'other' | '';
    foreignMember: number;
};

export default function TowerControlQurbaniModal({
    qurbani,
    familyId,
    slotId,
    isOpen,
    onClose,
}: IQurbaniModalProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm<FormData>({
        defaultValues: {
            isQurbani: qurbani?.isQurbani ?? false,
            animalType: qurbani?.animalType || '',
            foreignMember: qurbani?.foreignMember ?? 0,
        },
    });
    const isQurbani = watch('isQurbani');
    useEffect(() => {
        reset({
            isQurbani: qurbani?.isQurbani ?? false,
            animalType: qurbani?.animalType || '',
            foreignMember: qurbani?.foreignMember ?? 0,
        });
    }, [qurbani, reset]);

    const onSubmit = async (data: FormData) => {
        if (data.isQurbani === false) {
            data.animalType = '';
        }

        try {
            const res = await addQurbaniAction({
                ...data,
                familyId: familyId as any,
                slotId: slotId as any,
            });
            // console.log(res);
            if (!res.success) {
                toast.error(res.message || 'কোরবানি আপডেট ব্যর্থ হয়েছে!');
                return;
            }

            toast.success(
                res.message || 'কোরবানি তথ্য সফলভাবে সংরক্ষিত হয়েছে!',
            );
            setIsEditing(false);
            onClose();
        } catch (error) {
            toast.error('কোরবানি আপডেট করতে সমস্যা হয়েছে!');
        }
    };

    const handleDelete = async () => {
        try {
            const res = await deleteQurbaniAction(qurbani._id);
            if (!res.success) {
                toast.error(res.message || 'কোরবানি তথ্য মুছে ফেলা ব্যর্থ!');
                return;
            }
            toast.success(res.message || 'কোরবানি তথ্য মুছে ফেলা হয়েছে!');
            setShowDeleteModal(false);
            onClose();
        } catch {
            toast.error('কোরবানি তথ্য মুছে ফেলতে সমস্যা হয়েছে!');
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
                                    কোরবানি তথ্য
                                </h2>
                                <div className="space-y-2 text-sm">
                                    <p>
                                        কোরবানি দিচ্ছে:{' '}
                                        <span className="font-roboto font-bold">
                                            {qurbani?.isQurbani
                                                ? 'হ্যাঁ'
                                                : 'না'}
                                        </span>
                                    </p>
                                    {qurbani?.isQurbani && (
                                        <>
                                            <p>
                                                পশুর ধরন:{' '}
                                                <span className="font-roboto font-bold">
                                                    {qurbani?.animalType || '-'}
                                                </span>
                                            </p>
                                            {qurbani?.foreignMember ? (
                                                <p>
                                                    বিদেশি সদস্য:{' '}
                                                    <span className="font-roboto font-bold">
                                                        {qurbani.foreignMember}
                                                    </span>{' '}
                                                    জন
                                                </p>
                                            ) : null}
                                        </>
                                    )}
                                </div>

                                <div className="mt-6 flex justify-between">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-1 rounded-md bg-[#D4AF37] px-3 py-1 font-semibold text-[#29173F] hover:opacity-90"
                                    >
                                        <FaPen /> সম্পাদনা
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
                                        কোরবানি তথ্য সম্পাদনা করুন
                                    </h2>

                                    {/* isQurbani */}
                                    <div>
                                        <label className="mb-1 block text-sm text-[#D4AF37]">
                                            কোরবানি দিচ্ছে কি?
                                        </label>
                                        <select
                                            {...register('isQurbani', {
                                                setValueAs: (v) => v === 'true', // convert to boolean
                                                validate: (v) =>
                                                    v === true || v === false
                                                        ? true
                                                        : 'অবশ্যই নির্বাচন করুন',
                                            })}
                                            className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                                        >
                                            <option value="false">
                                                কোরবানি দিচ্ছে না
                                            </option>
                                            <option value="true">
                                                কোরবানি দিচ্ছে
                                            </option>
                                        </select>
                                    </div>

                                    {isQurbani && (
                                        <div>
                                            <label className="mb-1 block text-sm text-[#D4AF37]">
                                                পশুর ধরন
                                            </label>
                                            <select
                                                {...register('animalType')}
                                                className="min-h-[2.44rem] w-full rounded-md border border-[#D4AF37]/40 bg-[#29173F] px-4 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                                            >
                                                <option value="">
                                                    নির্বাচন করুন
                                                </option>
                                                <option value="cow">গরু</option>
                                                <option value="goat">
                                                    ছাগল
                                                </option>
                                                <option value="sheep">
                                                    ভেড়া
                                                </option>
                                                <option value="camel">
                                                    উট
                                                </option>
                                                <option value="other">
                                                    অন্য কিছু
                                                </option>
                                            </select>
                                            {errors.animalType && (
                                                <p className="mt-1 text-xs text-red-400">
                                                    {errors.animalType.message}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* foreignMember */}
                                    <div>
                                        <label className="mb-1 block text-sm text-[#D4AF37]">
                                            বিদেশি সদস্য সংখ্যা
                                        </label>
                                        <input
                                            type="number"
                                            {...register('foreignMember', {
                                                min: 0,
                                            })}
                                            className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                                        />
                                    </div>

                                    {/* Buttons */}
                                    <div className="mt-4 flex justify-between">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="rounded-md bg-[#D4AF37] px-3 py-1 font-semibold text-[#29173F] hover:opacity-90"
                                        >
                                            {isSubmitting
                                                ? 'সংরক্ষণ হচ্ছে...'
                                                : 'সংরক্ষণ করুন'}
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
                            আপনি কি নিশ্চিত যে এই কোরবানি তথ্য মুছে ফেলতে চান?
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
