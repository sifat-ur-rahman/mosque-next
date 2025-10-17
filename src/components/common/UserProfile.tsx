'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaClock, FaPhoneAlt, FaShieldAlt, FaUser } from 'react-icons/fa';

interface UserProfileProps {
    user: {
        name: string;
        phone: string;
        role: string;
        loginTimeStamp?: string[];
        createdAt: string;
    };
}

export default function UserProfile({ user }: UserProfileProps) {
    const lastLogin = user.loginTimeStamp?.length
        ? new Date(
              user.loginTimeStamp[user.loginTimeStamp.length - 1],
          ).toLocaleString('bn-BD')
        : 'কখনো লগইন করেননি';

    return (
        <section className="flex min-h-screen items-center justify-center bg-[#29173F] px-5 py-10 text-[#F5F3F0]">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-md rounded-3xl border border-[#D4AF37]/20 bg-[#3C245A] p-8 shadow-2xl backdrop-blur-md md:max-w-lg md:p-10"
            >
                {/* Profile Image */}
                <div className="mb-6 flex justify-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative h-28 w-28 md:h-32 md:w-32"
                    >
                        <Image
                            src="/profile-avatar.png"
                            alt="Profile Avatar"
                            fill
                            className="rounded-full border-4 border-[#D4AF37] object-cover shadow-md"
                        />
                    </motion.div>
                </div>

                {/* Name & Role */}
                <div className="text-center">
                    <h2 className="mb-1 text-3xl font-extrabold tracking-wide text-[#D4AF37]">
                        {user.name}
                    </h2>
                    <p className="text-sm text-[#C4B5A0] md:text-base">
                        {user.role === 'Admin'
                            ? 'অ্যাডমিন'
                            : user.role === 'Moderator'
                              ? 'মডারেটর'
                              : 'সাধারণ ইউজার'}
                    </p>
                </div>

                {/* Info Cards */}
                <div className="mt-8 space-y-4">
                    {[
                        {
                            icon: <FaUser className="text-[#D4AF37]" />,
                            label: 'নাম',
                            value: user.name,
                        },
                        {
                            icon: <FaPhoneAlt className="text-[#D4AF37]" />,
                            label: 'ফোন নম্বর',
                            value: user.phone,
                        },
                        {
                            icon: <FaShieldAlt className="text-[#D4AF37]" />,
                            label: 'ভূমিকা',
                            value:
                                user.role === 'Admin'
                                    ? 'অ্যাডমিন'
                                    : user.role === 'Moderator'
                                      ? 'মডারেটর'
                                      : 'ইউজার',
                        },
                        {
                            icon: <FaClock className="text-[#D4AF37]" />,
                            label: 'সর্বশেষ লগইন',
                            value: lastLogin,
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-4 rounded-xl border border-[#D4AF37]/30 bg-[#29173F]/60 p-4 transition-all duration-300 hover:bg-[#3C245A]/80"
                        >
                            <div className="text-xl">{item.icon}</div>
                            <div>
                                <p className="text-xs text-[#C4B5A0]">
                                    {item.label}
                                </p>
                                <p className="text-base font-medium">
                                    {item.value}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Account Created Date */}
                <div className="mt-8 border-t border-[#D4AF37]/20 pt-4 text-center text-xs text-[#A7937C]">
                    একাউন্ট তৈরি:{' '}
                    {new Date(user.createdAt).toLocaleDateString('bn-BD')}
                </div>
            </motion.div>
        </section>
    );
}
