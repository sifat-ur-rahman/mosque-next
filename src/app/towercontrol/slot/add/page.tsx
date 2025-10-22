'use client';

import { useForm } from 'react-hook-form';

import addSlotAction from '@/server/actions/slots/addSlotAction';
import { ISlot } from '@/server/model/slots/slotType';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';
import { toast } from 'sonner';

export default function AddSlotForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Partial<ISlot>>();
    const router = useRouter();

    const onSubmit = async (data: Partial<ISlot>) => {
        const res = await addSlotAction(data);
        if (res.success) {
            toast.success('স্লট সফলভাবে যোগ করা হয়েছে');
            reset();
        } else {
            toast.error('স্লট যোগ করতে ব্যর্থ হয়েছে');
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
                {' '}
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="absolute left-4 top-4 flex items-center gap-1 text-[#D4AF37] hover:opacity-80"
                >
                    <IoArrowBack size={26} />
                </button>
                <h2 className="my-6 text-center text-2xl font-bold text-[#D4AF37]">
                    নতুন স্লট যোগ করুন
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 text-sm"
                >
                    {/* Title */}
                    <div>
                        <label className="mb-1 block text-sm text-[#D4AF37]">
                            স্লটের নাম
                        </label>
                        <input
                            {...register('title', { required: true })}
                            className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                            placeholder="যেমনঃ ৪০ তম ইফতারির তালিকা "
                        />
                        {errors.title && (
                            <p className="mt-1 text-xs text-red-400">
                                স্লটের নাম আবশ্যক
                            </p>
                        )}
                    </div>

                    {/* Type */}
                    <div>
                        <label className="mb-1 block text-sm text-[#D4AF37]">
                            ধরন
                        </label>
                        <select
                            {...register('type', { required: true })}
                            className="min-h-[2.44rem] w-full appearance-none rounded-md border border-[#D4AF37]/40 bg-[#29173F] px-4 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                        >
                            <option value="">ধরন নির্বাচন করুন</option>
                            <option value="Iftar">ইফতার</option>
                            <option value="Qurbani">কুরবানী</option>
                            <option value="General">সাধারণ</option>
                        </select>
                        {errors.type && (
                            <p className="mt-1 text-xs text-red-400">
                                ধরন নির্বাচন করতে হবে
                            </p>
                        )}
                    </div>

                    {/* Time */}
                    <div>
                        <label className="mb-1 block text-sm text-[#D4AF37]">
                            সময়
                        </label>
                        <input
                            {...register('time', { required: true })}
                            className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                            placeholder="যেমনঃ জানুয়ারি-ফেব্রুয়ারি ২০২৬"
                        />
                        {errors.time && (
                            <p className="mt-1 text-xs text-red-400">
                                সময় প্রদান করতে হবে
                            </p>
                        )}
                    </div>

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
                                স্লট নম্বর প্রদান করতে হবে
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-3 pt-4">
                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C09828] px-4 py-2 text-sm font-semibold text-[#29173F] transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                        >
                            {isSubmitting
                                ? 'যোগ করা হচ্ছে...'
                                : 'স্লট যোগ করুন'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </section>
    );
}
