'use client';

import LogoutAction from '@/server/actions/auth/logoutActions';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AccessDenied() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#29173F] px-4 text-[#F5F3F0]">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md rounded-2xl bg-[#3C245A] p-6 text-center shadow-2xl"
            >
                <motion.h1
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    className="mb-4 text-3xl font-bold text-[#D4AF37]"
                >
                    ⚠️ প্রবেশ নিষিদ্ধ
                </motion.h1>

                <p className="mb-8 leading-relaxed text-[#C4B5A0]">
                    আপনার বর্তমান ভূমিকা অনুযায়ী আপনি এই ড্যাশবোর্ডে প্রবেশের
                    অনুমতি পাচ্ছেন না। অনুগ্রহ করে হোম পেইজে ফিরে যান অথবা
                    পুনরায় লগইন করুন।
                </p>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={LogoutAction}
                        className="w-full rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B6902E] py-2 font-semibold text-[#29173F] transition-all duration-300 hover:opacity-90"
                    >
                        লগআউট করুন
                    </button>

                    <Link
                        href="/"
                        className="block w-full rounded-lg border border-[#D4AF37]/50 py-2 text-center font-semibold text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#29173F]"
                    >
                        হোম পেইজে যান
                    </Link>
                </div>

                <p className="mt-6 text-xs text-[#AFA8B8]">
                    © {new Date().getFullYear()} মনোহরপুর বায়তুন-নূর কেন্দ্রীয়
                    জামে মসজিদ
                </p>
            </motion.div>
        </div>
    );
}
