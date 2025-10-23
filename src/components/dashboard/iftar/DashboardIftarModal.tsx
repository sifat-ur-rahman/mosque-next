'use client';

import { updateIftarAction } from '@/server/actions/iftar/updateIftar';
import { IIftar } from '@/server/model/iftar/IftarType';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { FaPen } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'sonner';

interface IftarModalProps {
    iftar: IIftar;
    isOpen: boolean;
    onClose: () => void;
}

export default function DashboardIftarModal({
    iftar,
    isOpen,
    onClose,
}: IftarModalProps) {
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IIftar>({
        defaultValues: {
            names: iftar.names,
        },
    });

    const { fields, append, remove } = useFieldArray<any>({
        control,
        name: 'names',
    });

    const onSubmit = async (data: IIftar) => {
        try {
            const res = await updateIftarAction(iftar._id, {
                names: data.names,
            });
            if (res.success) {
                toast.success('নাম তালিকা সফলভাবে আপডেট হয়েছে!');
                setIsEditing(false);
                onClose();
            } else {
                toast.error('আপডেট ব্যর্থ হয়েছে!');
            }
        } catch {
            toast.error('আপডেট ব্যর্থ হয়েছে!');
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-[420px] rounded-2xl bg-[#3C245A] p-6 text-white shadow-lg"
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 text-[#D4AF37] hover:text-red-400"
                        >
                            <RxCross2 size={20} />
                        </button>

                        {!isEditing ? (
                            <>
                                <h2 className="mb-4 text-center text-xl font-bold text-[#D4AF37]">
                                    ইফতার বিবরণ
                                </h2>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <p>
                                            <strong>নম্বর:</strong>{' '}
                                            {iftar.numbering}
                                        </p>
                                        <p>
                                            <strong>তারিখ:</strong>{' '}
                                            {new Date(
                                                iftar.date,
                                            ).toLocaleDateString('bn-BD')}
                                        </p>
                                    </div>
                                    <p>
                                        <strong>বার:</strong> {iftar.day}
                                    </p>

                                    <div>
                                        <strong>নাম তালিকা:</strong>
                                        {iftar.names.length > 0 ? (
                                            <ul className="mt-1 grid list-inside list-disc grid-cols-2 gap-2 text-sm">
                                                {iftar.names.map(
                                                    (name, idx) => (
                                                        <li key={idx}>
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

                                <div className="mt-6 flex justify-center">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-1 rounded-md bg-[#D4AF37] px-3 py-1 font-semibold text-[#29173F] hover:opacity-90"
                                    >
                                        <FaPen size={14} /> Edit Names
                                    </button>
                                </div>
                            </>
                        ) : (
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col gap-3"
                            >
                                <h2 className="mb-4 text-center text-xl font-bold text-[#D4AF37]">
                                    নাম তালিকা আপডেট করুন
                                </h2>

                                <div>
                                    <label className="mb-1 flex items-center justify-between text-sm text-[#D4AF37]">
                                        নামসমূহ
                                        <button
                                            type="button"
                                            disabled={fields.length >= 10}
                                            onClick={() => append('')}
                                            className={`text-green-400 hover:text-green-300 ${
                                                fields.length >= 10
                                                    ? 'cursor-not-allowed opacity-50'
                                                    : ''
                                            }`}
                                        >
                                            <AiOutlinePlus />
                                        </button>
                                    </label>

                                    {fields.map((field, index) => (
                                        <div
                                            key={field.id}
                                            className="mb-2 flex items-center gap-2"
                                        >
                                            <input
                                                {...register(
                                                    `names.${index}` as const,
                                                    { required: true },
                                                )}
                                                className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                                                placeholder={`নাম ${index + 1}`}
                                            />
                                            {fields.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    <AiOutlineClose />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    {errors.names && (
                                        <p className="mt-1 text-xs text-red-400">
                                            অন্তত একটি নাম দিতে হবে
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
        </AnimatePresence>
    );
}
