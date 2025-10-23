'use client';

import { addFamilyAction } from '@/server/actions/family/addFamilyAction';
import { getFamilyCountAction } from '@/server/actions/family/getFamiliesAction';
import { IFamily } from '@/server/model/family/FamilyType';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RxArrowLeft } from 'react-icons/rx';
import { toast } from 'sonner';

export default function AddFamilyForm() {
    const router = useRouter();
    const [familyCount, setFamilyCount] = useState<number>(0);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<IFamily>({
        defaultValues: {
            numbering: undefined,
            members: 1,
        },
    });

    const numbering = watch('numbering');

    useEffect(() => {
        const fetchFamilyCount = async () => {
            try {
                const count = await getFamilyCountAction();
                setFamilyCount(count || 0);
                setValue('numbering', (count || 0) + 1);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFamilyCount();
    }, [setValue]);

    const onSubmit = async (data: IFamily) => {
        const resData = {
            name: data.name,
            members: +data.members,
            phone: data.phone,
            numbering: +data.numbering,
        };

        try {
            const res = await addFamilyAction(resData);
            if (res.success) {
                toast.success('পরিবারের তথ্য সফলভাবে যুক্ত হয়েছে!');
                reset();
                router.push('/towercontrol/family');
            } else {
                toast.error(res.message || 'কিছু ভুল হয়েছে!');
            }
        } catch {
            toast.error('সার্ভার ত্রুটি! অনুগ্রহ করে আবার চেষ্টা করুন।');
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
                    নতুন পরিবারের তথ্য যোগ করুন
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 font-bangla"
                >
                    {/* নাম */}
                    <div>
                        <label className="mb-1 block text-sm text-[#D4AF37]">
                            পরিবারের নাম
                        </label>
                        <input
                            type="text"
                            {...register('name', { required: 'নাম দিতে হবে' })}
                            placeholder="পরিবারের নাম লিখুন"
                            className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-400">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* সদস্য সংখ্যা */}
                    <div>
                        <label className="mb-1 block text-sm text-[#D4AF37]">
                            সদস্য সংখ্যা
                        </label>
                        <input
                            type="number"
                            {...register('members', {
                                required: 'সদস্য সংখ্যা দিতে হবে',
                                min: {
                                    value: 1,
                                    message: 'সদস্য সংখ্যা কমপক্ষে ১ হতে হবে',
                                },
                            })}
                            className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                        />
                        {errors.members && (
                            <p className="mt-1 text-xs text-red-400">
                                {errors.members.message}
                            </p>
                        )}
                    </div>

                    {/* ফোন */}
                    <div>
                        <label className="mb-1 block text-sm text-[#D4AF37]">
                            ফোন নম্বর
                        </label>
                        <input
                            type="text"
                            {...register('phone', {
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'শুধু সংখ্যা দিন',
                                },
                            })}
                            placeholder="যেমন: 017XXXXXXXX"
                            className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                        />
                        {errors.phone && (
                            <p className="mt-1 text-xs text-red-400">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    {/* সিরিয়াল নাম্বার */}
                    <div>
                        <label className="mb-1 block text-sm text-[#D4AF37]">
                            সিরিয়াল নাম্বার
                        </label>
                        <select
                            {...register('numbering', {
                                required: 'সিরিয়াল নাম্বার দিন',
                                valueAsNumber: true,
                            })}
                            value={numbering || familyCount + 1}
                            onChange={(e) =>
                                setValue('numbering', +e.target.value)
                            }
                            className="min-h-[2.44rem] w-full appearance-none rounded-md border border-[#D4AF37]/40 bg-[#29173F] px-4 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                        >
                            <option value="">
                                সিরিয়াল নাম্বার নির্বাচন করুন
                            </option>
                            {Array.from({ length: familyCount + 1 }, (_, i) => {
                                const number = i + 1;
                                const isRecommended =
                                    number === familyCount + 1;
                                return (
                                    <option key={number} value={number}>
                                        {number}{' '}
                                        {isRecommended ? '(প্রস্তাবিত)' : ''}
                                    </option>
                                );
                            })}
                        </select>
                        {errors.numbering && (
                            <p className="mt-1 text-xs text-red-400">
                                {errors.numbering.message}
                            </p>
                        )}
                    </div>

                    {/* Submit button */}
                    <div className="flex flex-col gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C09828] px-4 py-2 text-sm font-semibold text-[#29173F] transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                        >
                            {isSubmitting
                                ? 'যোগ হচ্ছে...'
                                : 'পরিবারের তথ্য সংরক্ষণ করুন'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </section>
    );
}
