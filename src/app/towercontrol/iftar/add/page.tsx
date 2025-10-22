'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { IoArrowBack } from 'react-icons/io5';

import { addIftarAction } from '@/server/actions/iftar/addIftarAction';
import { getActiveSlotsByType } from '@/server/actions/slots/getSoltAction';
import { ISlot } from '@/server/model/slots/slotType';
import mongoose from 'mongoose';
import { toast } from 'sonner';

interface IftarFormValues {
    numbering: string;
    slotId: mongoose.Types.ObjectId;
    names: string[];
    date: string;
    day: string;
}

export default function AddIftarForm() {
    const router = useRouter();
    const [slots, setSlots] = useState<ISlot | null>(null);
    const [loading, setLoading] = useState(true);

    const {
        register,
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<IftarFormValues>({
        defaultValues: {
            numbering: '',
            slotId: new mongoose.Types.ObjectId(),
            names: [''],
            date: '',
            day: '',
        },
    });

    const { fields, append, remove } = useFieldArray<any>({
        control,
        name: 'names',
    });

    const watchNames = watch('names');

    useEffect(() => {
        async function fetchSlots() {
            const activeSlots = await getActiveSlotsByType('Iftar');
            setSlots(activeSlots as ISlot);
            setLoading(false);
        }
        fetchSlots();
    }, []);

    if (loading) return <div className="p-5 text-white">লোড হচ্ছে...</div>;
    if (!slots)
        return (
            <div className="p-5 text-white">
                কোনো সক্রিয় ইফতার স্লট পাওয়া যায়নি। দয়া করে প্রথমে স্লট যোগ
                করুন।
            </div>
        );

    const onSubmit = async (data: IftarFormValues) => {
        try {
            const reqData: IftarFormValues = {
                numbering: data.numbering,
                slotId: new mongoose.Types.ObjectId(slots._id),
                names: data.names.filter((n) => n.trim() !== ''),
                date: data.date,
                day: data.day,
            };

            if (reqData.names.length === 0) {
                toast.error('কমপক্ষে একটি নাম দিতে হবে');
                return;
            }

            await addIftarAction(reqData);

            toast.success('ইফতার সফলভাবে যোগ করা হয়েছে');
            reset();
            router.push('/towercontrol/iftar');
        } catch (err) {
            console.error(err);
            toast.error('ইফতার যোগ করতে ব্যর্থ হয়েছে');
        }
    };

    return (
        <section className="min-h-screen bg-[#29173F] px-5 py-10 text-[#F5F3F0]">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative mx-auto max-w-md rounded-2xl bg-[#3C245A] p-6 shadow-xl"
            >
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="absolute left-4 top-4 flex items-center gap-1 text-[#D4AF37] hover:opacity-80"
                >
                    <IoArrowBack size={26} />
                </button>

                <h2 className="my-6 text-center text-2xl font-bold text-[#D4AF37]">
                    নতুন ইফতার যোগ করুন
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 text-sm"
                >
                    {/* Numbering */}
                    <div>
                        <label className="mb-1 block text-sm text-[#D4AF37]">
                            নম্বর
                        </label>
                        <input
                            type="number"
                            {...register('numbering', { required: true })}
                            className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                            placeholder="যেমনঃ ৪০"
                        />
                        {errors.numbering && (
                            <p className="mt-1 text-xs text-red-400">
                                নম্বর প্রদান করতে হবে
                            </p>
                        )}
                    </div>

                    {/* Names */}
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
                                    {...register(`names.${index}` as const, {
                                        required: true,
                                    })}
                                    className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                                    placeholder={`নাম ${index + 1}`}
                                />
                                {fields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
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

                    {/* Date */}
                    <div>
                        <label className="mb-1 block text-sm text-[#D4AF37]">
                            তারিখ
                        </label>
                        <input
                            type="date"
                            {...register('date', { required: true })}
                            className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                        />
                        {errors.date && (
                            <p className="mt-1 text-xs text-red-400">
                                তারিখ প্রদান করতে হবে
                            </p>
                        )}
                    </div>

                    {/* Day */}
                    <div>
                        <label className="mb-1 block text-sm text-[#D4AF37]">
                            দিন
                        </label>
                        <select
                            {...register('day', { required: true })}
                            className="min-h-[2.44rem] w-full appearance-none rounded-md border border-[#D4AF37]/40 bg-[#29173F] px-4 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                        >
                            <option value="">দিন নির্বাচন করুন</option>
                            <option value="রবিবার">রবিবার</option>
                            <option value="সোমবার">সোমবার</option>
                            <option value="মঙ্গলবার">মঙ্গলবার</option>
                            <option value="বুধবার">বুধবার</option>
                            <option value="বৃহস্পতিবার">বৃহস্পতিবার</option>
                            <option value="শুক্রবার">শুক্রবার</option>
                            <option value="শনিবার">শনিবার</option>
                        </select>
                        {errors.day && (
                            <p className="mt-1 text-xs text-red-400">
                                দিন নির্বাচন করতে হবে
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex flex-col gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C09828] px-4 py-2 text-sm font-semibold text-[#29173F] transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                        >
                            {isSubmitting
                                ? 'যোগ করা হচ্ছে...'
                                : 'ইফতার যোগ করুন'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </section>
    );
}
