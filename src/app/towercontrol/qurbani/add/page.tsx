'use client';

import { getFamilyCountAction } from '@/server/actions/family/getFamiliesAction';
import { addFamilyWithQurbaniAction } from '@/server/actions/qurbani/addQurbaniAction';
import { getActiveSlotByType } from '@/server/actions/slots/getSoltAction';
import { FamilyQurbaniInput } from '@/server/model/qurbani/QurbaniType';
import { ISlot } from '@/server/model/slots/slotType';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RxArrowLeft } from 'react-icons/rx';
import { toast } from 'sonner';

export default function AddQurbaniPage() {
    const router = useRouter();
    const [familyCount, setFamilyCount] = useState<number>(0);
    const [slots, setSlots] = useState<ISlot | null>(null);
    const [loading, setLoading] = useState(true);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FamilyQurbaniInput>({
        defaultValues: {
            foreignMember: 0,
            members: 1,
        },
    });

    const numbering = watch('numbering');
    const isQurbani = watch('isQurbani');

    useEffect(() => {
        const fetchFamilyCount = async () => {
            try {
                const count = await getFamilyCountAction();
                const activeSlots = await getActiveSlotByType('Qurbani');
                setFamilyCount(count || 0);
                setValue('numbering', (count || 0) + 1);
                setSlots(activeSlots as ISlot);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFamilyCount();
    }, [setValue]);

    const onSubmit = async (data: FamilyQurbaniInput) => {
        data.slotId = slots?._id || '';
        try {
            const res = await addFamilyWithQurbaniAction(data);
            if (res.success) {
                toast.success(res.message || 'কোরবানি সফলভাবে যুক্ত হয়েছে!');
                reset();
                router.push('/towercontrol/qurbani');
            } else {
                toast.error(res.message || 'কিছু ভুল হয়েছে!');
            }
        } catch {
            toast.error('সার্ভার ত্রুটি! অনুগ্রহ করে আবার চেষ্টা করুন।');
        }
    };
    if (loading)
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-[#3C245A] border-t-[#D4AF37]"></div>
            </div>
        );

    if (!slots)
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="p-5 text-white">
                    কোনো সক্রিয় ইফতার স্লট পাওয়া যায়নি। দয়া করে প্রথমে স্লট
                    যোগ করুন।
                </p>
            </div>
        );
    return (
        <section className="min-h-screen bg-[#29173F] px-5 py-10 text-[#F5F3F0]">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative mx-auto max-w-4xl rounded-2xl bg-[#3C245A] p-8 shadow-xl"
            >
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="absolute left-6 top-6 flex items-center gap-1 text-[#D4AF37] hover:opacity-80"
                >
                    <RxArrowLeft /> ফিরে যান
                </button>

                <h2 className="my-8 text-center text-2xl font-bold text-[#D4AF37]">
                    নতুন কোরবানি ও পরিবারের তথ্য যোগ করুন
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 font-bangla"
                >
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {/* পরিবারের নাম */}
                        <div>
                            <label className="mb-1 block text-sm text-[#D4AF37]">
                                পরিবার প্রধানের নাম
                            </label>
                            <input
                                type="text"
                                {...register('name', {
                                    required: 'নাম দিতে হবে',
                                })}
                                placeholder="পরিবারের নাম লিখুন"
                                className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                            />
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        {/* ফোন নম্বর */}
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
                                placeholder="017XXXXXXXX"
                                className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 font-roboto text-sm text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
                            />
                            {errors.phone && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors.phone.message}
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
                                        message:
                                            'সদস্য সংখ্যা কমপক্ষে ১ হতে হবে',
                                    },
                                })}
                                placeholder="পরিবারের সদস্য সংখ্যা লিখুন"
                                className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 font-roboto text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                            />
                            {errors.members && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors.members.message}
                                </p>
                            )}
                        </div>

                        {/* বিদেশি সদস্য সংখ্যা */}
                        <div>
                            <label className="mb-1 block text-sm text-[#D4AF37]">
                                বিদেশি সদস্য সংখ্যা
                            </label>
                            <input
                                type="number"
                                {...register('foreignMember', {
                                    min: {
                                        value: 0,
                                        message: '০ বা তার বেশি দিন',
                                    },
                                })}
                                placeholder="বিদেশি সদস্য সংখ্যা"
                                className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 font-roboto text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                            />
                            {errors.foreignMember && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors.foreignMember.message}
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
                                })}
                                value={numbering || familyCount + 1}
                                onChange={(e) =>
                                    setValue('numbering', +e.target.value)
                                }
                                className="min-h-[2.44rem] w-full rounded-md border border-[#D4AF37]/40 bg-[#29173F] px-4 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                            >
                                <option value="">
                                    সিরিয়াল নাম্বার নির্বাচন করুন
                                </option>
                                {Array.from(
                                    { length: familyCount + 1 },
                                    (_, i) => {
                                        const number = i + 1;
                                        const isRecommended =
                                            number === familyCount + 1;
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
                        {/* কুরবানি দিচ্ছে কি না */}
                        <div>
                            <label className="mb-1 block text-sm text-[#D4AF37]">
                                কুরবানি দিচ্ছে কি না
                            </label>
                            <select
                                {...register('isQurbani', {
                                    setValueAs: (v) => v === 'true', // convert to boolean
                                    validate: (v) =>
                                        v === true || v === false
                                            ? true
                                            : 'অবশ্যই নির্বাচন করুন',
                                })}
                                className="min-h-[2.44rem] w-full rounded-md border border-[#D4AF37]/40 bg-[#29173F] px-4 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                            >
                                <option value="">নির্বাচন করুন</option>
                                <option value="true">কুরবানি দিচ্ছে</option>
                                <option value="false">কুরবানি দিচ্ছে না</option>
                            </select>
                            {errors.isQurbani && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors.isQurbani.message}
                                </p>
                            )}
                        </div>

                        {/* পশুর ধরন */}
                        {isQurbani && (
                            <div>
                                <label className="mb-1 block text-sm text-[#D4AF37]">
                                    পশুর ধরন
                                </label>
                                <select
                                    {...register('animalType')}
                                    className="min-h-[2.44rem] w-full rounded-md border border-[#D4AF37]/40 bg-[#29173F] px-4 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                                >
                                    <option value="">নির্বাচন করুন</option>
                                    <option value="cow">গরু</option>
                                    <option value="goat">ছাগল</option>
                                    <option value="sheep">ভেড়া</option>
                                    <option value="camel">উট</option>
                                    <option value="other">অন্য কিছু</option>
                                </select>
                                {errors.animalType && (
                                    <p className="mt-1 text-xs text-red-400">
                                        {errors.animalType.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex justify-center pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C09828] px-6 py-3 text-sm font-semibold text-[#29173F] transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                        >
                            {isSubmitting
                                ? 'যোগ হচ্ছে...'
                                : 'কোরবানি ও পরিবার সংরক্ষণ করুন'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </section>
    );
}
