'use client';

import loginAction from '@/server/actions/auth/login';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'sonner';

type LoginFormData = {
    phone: string;
    password: string;
};

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);

        const res = await loginAction(data);

        if (!res.success) {
            toast.error(res.error);
            setLoading(false);
        } else {
            toast.success('লগইন সফল হয়েছে');
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#29173F] p-4 text-[#F5F3F0]">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md rounded-2xl bg-[#3C245A]/50 p-6 shadow-2xl backdrop-blur-sm"
            >
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-[#D4AF37]">
                        লগইন করুন
                    </h1>
                    <p className="text-sm text-[#C4B5A0]">
                        ড্যাশবোর্ডে প্রবেশের জন্য তথ্য দিন
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Phone Number */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-[#E8E6E3]">
                            মোবাইল নাম্বার
                        </label>
                        <input
                            type="tel"
                            placeholder="01000000000"
                            {...register('phone', {
                                required: 'মোবাইল নাম্বার দিন',
                                pattern: {
                                    value: /^01[0-9]{9}$/,
                                    message: 'সঠিক নাম্বার দিন (১১ ডিজিট)',
                                },
                            })}
                            className="w-full rounded-lg border border-[#D4AF37]/30 bg-[#29173F] px-4 py-2 font-roboto font-bold text-[#F5F3F0] placeholder-[#C4B5A0] focus:border-[#D4AF37] focus:outline-none focus:ring-0 focus:ring-[#D4AF37]"
                        />
                        {errors.phone && (
                            <p className="mt-1 text-xs text-red-400">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-[#E8E6E3]">
                            পাসওয়ার্ড
                        </label>
                        <div className="relative">
                            <input
                                inputMode="numeric"
                                pattern="[0-9]*"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="********"
                                {...register('password', {
                                    required: 'পাসওয়ার্ড দিন',
                                    minLength: {
                                        value: 6,
                                        message: 'কমপক্ষে ৬ অক্ষরের হতে হবে',
                                    },
                                })}
                                className="w-full rounded-lg border border-[#D4AF37]/30 bg-[#29173F] px-4 py-2 font-roboto font-bold text-[#F5F3F0] placeholder-[#C4B5A0] focus:border-[#D4AF37] focus:outline-none focus:ring-0 focus:ring-[#D4AF37]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-[#D4AF37] focus:outline-none"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-400">
                                {errors.password.message}
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
                        {loading ? 'লগইন করা হচ্ছে...' : 'লগইন করুন'}
                    </motion.button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-xs text-[#C4B5A0]">
                    <p>
                        ©
                        <span className="font-roboto">
                            {' '}
                            {new Date().getFullYear()}
                        </span>
                        <Link href="/" className="ml-1 hover:text-[#D4AF37]">
                            মনোহরপুর বায়তুন-নূর কেন্দ্রীয় জামে মসজিদ
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
