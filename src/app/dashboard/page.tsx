'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
    FaCalendarAlt,
    FaDonate,
    FaList,
    FaMosque,
    FaUsers,
} from 'react-icons/fa';

function DashboardHome() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1E0E33] to-[#29173F] px-5 pb-8 text-[#F5F3F0] md:px-10">
            {/* Decorative Glow Circles */}
            <div className="absolute left-[-50px] top-10 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />
            <div className="absolute bottom-0 right-[-60px] h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-3xl" />

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 mb-10 text-center"
            >
                <div className="mb-4 flex justify-center">
                    <div className="relative h-44 w-60 drop-shadow-lg">
                        <Image
                            width={500}
                            height={500}
                            src="/basmalah-gold.png"
                            alt="বিসমিল্লাহ"
                            className="h-full w-full object-contain"
                        />
                    </div>
                </div>

                <h1 className="mb-3 text-2xl font-bold leading-snug text-[#D4AF37] sm:text-3xl">
                    মনোহরপুর বায়তুন-নূর কেন্দ্রীয় জামে মসজিদের
                    <br />
                    ড্যাশবোর্ডে স্বাগতম
                </h1>

                <p className="mx-auto max-w-xl text-sm leading-relaxed text-[#C4B5A0] sm:text-base">
                    এখান থেকে আপনি সকল তথ্য, চাঁদা, কোরবানি, ইফতার তালিকা ও
                    অন্যান্য কনটেন্ট সহজে নিয়ন্ত্রণ করতে পারবেন।
                </p>
            </motion.div>

            {/* Quick Actions Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative z-10 rounded-2xl border border-[#D4AF37]/20 bg-[#3C245A]/80 p-5 shadow-lg backdrop-blur-sm"
            >
                <h2 className="mb-5 text-center text-xl font-semibold tracking-wide text-[#D4AF37]">
                    দ্রুত কাজের অপশন সমূহ
                </h2>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {/* Card */}
                    <ActionCard
                        href="/admin/members"
                        icon={<FaUsers />}
                        title="আয়-ব্যয়"
                    />
                    <ActionCard
                        href="/admin/chanda"
                        icon={<FaDonate />}
                        title="মাসিক চাঁদা"
                    />
                    <ActionCard
                        href="/admin/qurbani"
                        icon={<FaMosque />}
                        title="কোরবানির তালিকা"
                    />
                    <ActionCard
                        href="/admin/iftar"
                        icon={<FaCalendarAlt />}
                        title="ইফতারির তালিকা"
                    />
                    <ActionCard
                        href="/admin/all-data"
                        icon={<FaList />}
                        title="সকল তথ্য"
                    />
                </div>
            </motion.div>

            {/* Footer */}
            <p className="mt-10 text-center text-xs text-[#BBA985]">
                এই ড্যাশবোর্ডের মাধ্যমে সকল তথ্য রিয়েল-টাইমে আপডেট ও নিয়ন্ত্রণ
                করা যাবে।
            </p>
        </section>
    );
}

export default DashboardHome;

// 🔹 Reusable Quick Action Card
const ActionCard = ({
    href,
    icon,
    title,
}: {
    href: string;
    icon: React.ReactNode;
    title: string;
}) => (
    <Link
        href={href}
        className="hover:shadow-[0_0_15px_#D4AF37]/40 group flex flex-col items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#29173F]/80 py-5 transition-all duration-300 hover:bg-[#3C245A]/90"
    >
        <div className="mb-2 text-3xl text-[#D4AF37] transition-transform duration-300 group-hover:scale-110">
            {icon}
        </div>
        <span className="text-sm font-medium text-[#E8E6E3] group-hover:text-[#FFF9E6]">
            {title}
        </span>
    </Link>
);
