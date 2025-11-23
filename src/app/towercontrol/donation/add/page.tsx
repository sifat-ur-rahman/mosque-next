'use client';

import addDonationAction from '@/server/actions/donations/addDonationsAction';
import { getDonationCount } from '@/server/actions/donations/gatDonations';
import { IDonation } from '@/server/model/donations/donationType';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RxArrowLeft } from 'react-icons/rx';
import { toast } from 'sonner';

export default function AddDonationForm() {
    const router = useRouter();
    const [donationCount, setDonationCount] = useState<number>(0);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        setValue,
        watch,
    } = useForm<IDonation>({
        defaultValues: {
            numbering: undefined,
        },
    });

    const numbering = watch('numbering');

    useEffect(() => {
        const fetchDonationCount = async () => {
            try {
                const count = await getDonationCount();
                setDonationCount(count);
                const nextNumber = count + 1;
                setValue('numbering', nextNumber);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDonationCount();
    }, [setValue]);

    const onSubmit = async (data: IDonation) => {
        const resData = {
            name: data.name,
            amount: +data.amount,
            numbering: +data.numbering,
            type: data.type || 'monthly',
        };

        try {
            const res = await addDonationAction(resData);

            if (res.success) {
                toast.success('দান সফলভাবে যুক্ত হয়েছে!');
                reset();
                router.push('/towercontrol/donation');
            } else {
                toast.error(res.message || 'কিছু ভুল হয়েছে!');
            }
        } catch {
            toast.error('সার্ভার ত্রুটি হয়েছে! অনুগ্রহ করে আবার চেষ্টা করুন।');
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
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="absolute left-4 top-4 flex items-center gap-1 text-[#D4AF37] hover:opacity-80"
                >
                    <RxArrowLeft /> ফিরে যান
                </button>

                <h2 className="my-6 text-center text-2xl font-bold text-[#D4AF37]">
                    নতুন দাতার নাম যোগ করুন
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 font-bangla"
                >
                    {/* নাম */}
                    <div>
                        <label className="mb-1 block text-sm text-[#D4AF37]">
                            দাতার নাম
                        </label>
                        <input
                            type="text"
                            {...register('name', { required: 'নাম দিতে হবে' })}
                            placeholder="দাতার নাম লিখুন"
                            className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-400">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* পরিমাণ */}
                    <div>
                        <label className="mb-1 block text-sm text-[#D4AF37]">
                            দানের পরিমাণ (টাকা)
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="যেমন: ৫০০"
                            {...register('amount', {
                                required: 'পরিমাণ দিতে হবে',
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'শুধু সংখ্যা দিন (০-৯)',
                                },
                                // valueAsNumber: true,
                            })}
                            onInput={(e) => {
                                // Remove any non-numeric characters live
                                e.currentTarget.value =
                                    e.currentTarget.value.replace(
                                        /[^0-9]/g,
                                        '',
                                    );
                            }}
                            className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 font-roboto text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                        />
                        {errors.amount && (
                            <p className="mt-1 text-xs text-red-400">
                                {errors.amount.message}
                            </p>
                        )}
                    </div>
                    {/* দানের ধরন */}
                    <div>
                        <label className="mb-1 block text-sm text-[#D4AF37]">
                            দানের ধরন
                        </label>

                        <select
                            {...register('type', {
                                required: 'দানের ধরন নির্বাচন করুন',
                            })}
                            defaultValue="monthly"
                            className="min-h-[2.44rem] w-full appearance-none rounded-md border border-[#D4AF37]/40 bg-[#29173F] px-4 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                        >
                            <option value="monthly">মাসিক</option>
                            <option value="one-time">এককালীন</option>
                            <option value="yearly">বাৎসরিক</option>
                            <option value="other">অন্যান্য</option>
                        </select>

                        {errors.type && (
                            <p className="mt-1 text-xs text-red-400">
                                {errors.type.message}
                            </p>
                        )}
                    </div>

                    {/* সিরিয়াল নাম্বার */}
                    <div>
                        <label className="mb-1 block text-sm text-[#D4AF37]">
                            সিরিয়াল নাম্বার
                        </label>
                        <select
                            {...register('numbering', {
                                required: 'সিরিয়াল নাম্বার দিন',
                                valueAsNumber: true,
                            })}
                            value={numbering || donationCount + 1} // default last + 1
                            onChange={(e) =>
                                setValue('numbering', +e.target.value)
                            }
                            className="min-h-[2.44rem] w-full appearance-none rounded-md border border-[#D4AF37]/40 bg-[#29173F] px-4 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                        >
                            <option value="">
                                সিরিয়াল নাম্বার নির্বাচন করুন
                            </option>
                            {Array.from(
                                { length: donationCount + 1 },
                                (_, i) => {
                                    const number = i + 1;
                                    const isRecommended =
                                        number === donationCount + 1;
                                    return (
                                        <option key={number} value={number}>
                                            {number}{' '}
                                            {isRecommended
                                                ? '(প্রস্তাবিত)'
                                                : ''}
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

                    {/* বোতাম */}
                    <div className="flex flex-col gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C09828] px-4 py-2 text-sm font-semibold text-[#29173F] transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                        >
                            {isSubmitting
                                ? 'যোগ হচ্ছে...'
                                : 'দাতার তথ্য সংরক্ষণ করুন'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </section>
    );
}
