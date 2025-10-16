'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type ForgotFormData = {
    phone: string;
};

export default function ForgotPasswordPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotFormData>();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data: ForgotFormData) => {
        setLoading(true);
        console.log('রিকভার ডাটা:', data);

        // Simulate request
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1500);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#29173F] p-4 text-[#F5F3F0]">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md rounded-2xl bg-[#3C245A] p-6 shadow-2xl"
            >
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-[#D4AF37]">
                        পাসওয়ার্ড ভুলে গেছেন?
                    </h1>
                    <p className="text-sm text-[#C4B5A0]">
                        নিচে আপনার নিবন্ধিত মোবাইল নাম্বার দিন, আমরা রিসেট লিংক
                        পাঠাবো।
                    </p>
                </div>

                {/* Form */}
                {!success ? (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#E8E6E3]">
                                মোবাইল নাম্বার
                            </label>
                            <input
                                type="tel"
                                placeholder="০১XXXXXXXXX"
                                {...register('phone', {
                                    required: 'মোবাইল নাম্বার দিন',
                                    pattern: {
                                        value: /^01[0-9]{9}$/,
                                        message: 'সঠিক নাম্বার দিন (১১ ডিজিট)',
                                    },
                                })}
                                className="w-full rounded-lg border border-[#D4AF37]/30 bg-[#29173F] px-4 py-2 text-[#F5F3F0] placeholder-[#C4B5A0] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                            />
                            {errors.phone && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            disabled={loading}
                            type="submit"
                            className={`w-full rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B6902E] py-2 font-semibold text-[#29173F] transition-all duration-300 ${
                                loading
                                    ? 'cursor-not-allowed opacity-70'
                                    : 'hover:opacity-90'
                            }`}
                        >
                            {loading ? 'প্রক্রিয়াধীন...' : 'রিসেট লিংক পাঠান'}
                        </motion.button>
                    </form>
                ) : (
                    <div className="space-y-4 text-center">
                        <h2 className="text-lg font-semibold text-[#D4AF37]">
                            ✅ পাসওয়ার্ড রিসেট অনুরোধ পাঠানো হয়েছে!
                        </h2>
                        <p className="text-sm text-[#C4B5A0]">
                            অনুগ্রহ করে আপনার মোবাইল SMS বা ইমেইল চেক করুন রিসেট
                            নির্দেশনার জন্য।
                        </p>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-[#C4B5A0]">
                    <p className="mb-2">
                        মনে পড়েছে?{' '}
                        <Link
                            href="/login"
                            className="text-[#D4AF37] hover:underline"
                        >
                            লগইন করুন
                        </Link>
                    </p>
                    <p>
                        © {new Date().getFullYear()} মনোহরপুর বায়তুন-নূর
                        কেন্দ্রীয় জামে মসজিদ
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
