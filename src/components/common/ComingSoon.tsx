'use client';
import { motion } from 'framer-motion';
import { IoMoonSharp } from 'react-icons/io5';

const ComingSoon = ({ title }: { title?: string }) => {
    return (
        <section className="flex min-h-screen items-center justify-center bg-[#29173F] px-6 text-center">
            <div className="max-w-2xl">
                {/* Glowing Moon Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#EFD88B] shadow-[0_0_40px_#D4AF37]"
                >
                    <span className="text-4xl font-bold text-[#29173F]">
                        <IoMoonSharp />
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="mb-4 text-4xl font-bold text-[#D4AF37] md:text-5xl"
                >
                    {title ? `${title}` : 'শীঘ্রই আসছে'}
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mb-8 text-lg leading-relaxed text-[#E8E6E3] md:text-xl"
                >
                    আমাদের সাথে থাকুন ইনশাআল্লাহ 🌸
                </motion.p>

                {/* Decorative Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mx-auto h-1 w-32 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#EFD88B]"
                ></motion.div>

                {/* Footer Text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="mt-8 text-[#C4B5A0]"
                >
                    আল্লাহ আমাদের সকল কাজ কবুল করুন 🤲
                </motion.p>
            </div>
        </section>
    );
};

export default ComingSoon;
