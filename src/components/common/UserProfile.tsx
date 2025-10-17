'use client';

import { IUser } from '@/server/model/users/userType';
import { motion } from 'framer-motion';
import { FaClock, FaPhoneAlt, FaShieldAlt, FaUser } from 'react-icons/fa';

interface UserProfileProps {
    user: IUser | null;
}

export default function UserProfile({ user }: UserProfileProps) {
    if (!user)
        return (
            <div className="flex h-screen items-center justify-center bg-[#29173F] text-red-400">
                <p>ইউজারের তথ্য পাওয়া যায়নি!</p>
            </div>
        );

    const lastLogin = user.loginTimeStamp?.length
        ? new Date(
              user.loginTimeStamp[user.loginTimeStamp.length - 1],
          ).toLocaleString('bn-BD')
        : 'কখনো লগইন করেননি';

    // const loginList =
    //     user.loginTimeStamp?.length && user.loginTimeStamp.length > 0
    //         ? user.loginTimeStamp.map((time, index) => ({
    //               id: index + 1,
    //               time: new Date(time).toLocaleString('bn-BD'),
    //           }))
    //         : [];

    return (
        <section className="flex min-h-screen items-center justify-center bg-[#29173F] px-5 py-10 text-[#F5F3F0]">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-md rounded-3xl border border-[#D4AF37]/20 bg-[#3C245A] p-8 shadow-2xl backdrop-blur-md md:max-w-lg md:p-10"
            >
                {/* Name & Role */}
                <div className="text-center">
                    <h2 className="mb-1 text-3xl font-extrabold tracking-wide text-[#D4AF37]">
                        {user.name || 'নাম পাওয়া যায়নি!'}
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
                            value: user.name || 'নাম পাওয়া যায়নি!',
                            isPhone: false,
                        },
                        {
                            icon: <FaPhoneAlt className="text-[#D4AF37]" />,
                            label: 'ফোন নম্বর',
                            value: user.phone,
                            isPhone: true,
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
                            isPhone: false,
                        },
                        {
                            icon: <FaClock className="text-[#D4AF37]" />,
                            label: 'সর্বশেষ লগইন',
                            value: lastLogin,
                            isPhone: false,
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-4 rounded-xl border border-[#D4AF37]/30 bg-[#29173F]/60 p-4 transition-all duration-300 hover:bg-[#3C245A]/80"
                        >
                            <div className="text-xl">{item.icon}</div>
                            <div>
                                <p className="font-bangla text-xs text-[#C4B5A0]">
                                    {item.label}
                                </p>
                                <p
                                    className={`text-base font-medium ${
                                        item.isPhone
                                            ? 'font-roboto'
                                            : 'font-bangla'
                                    }`}
                                >
                                    {item.value}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {/* Login History */}
                    {/* <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-xl border border-[#D4AF37]/30 bg-[#29173F]/60 p-4 transition-all duration-300 hover:bg-[#3C245A]/80"
                    >
                        <div className="mb-3 flex items-center gap-3">
                            <FaClock className="text-xl text-[#D4AF37]" />
                            <p className="text-sm text-[#C4B5A0]">
                                লগইন ইতিহাস
                            </p>
                        </div>

                        {loginList.length > 0 ? (
                            <div className="scrollbar-thin hide-scrollbar scrollbar-thumb-[#D4AF37]/30 scrollbar-track-[#3C245A]/50 max-h-40 overflow-y-auto pr-2">
                                <ul className="space-y-2 text-sm">
                                    {loginList
                                        .slice()
                                        .reverse()
                                        .map((login) => (
                                            <li
                                                key={login.id}
                                                className="flex justify-between border-b border-[#D4AF37]/10 pb-1 text-[#F5F3F0]"
                                            >
                                                <span className="font-roboto">
                                                    #{login.id}
                                                </span>
                                                <span>{login.time}</span>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-sm text-[#C4B5A0]">
                                কোনো লগইন তথ্য নেই
                            </p>
                        )}
                    </motion.div> */}
                </div>

                {/* Account Created Date */}
                <div className="mt-8 border-t border-[#D4AF37]/20 pt-4 text-center text-xs text-[#A7937C]">
                    একাউন্ট তৈরি:{' '}
                    {new Date(user.createdAt).toLocaleDateString('bn-BD') ||
                        'তারিখ পাওয়া যায়নি!'}
                </div>
            </motion.div>
        </section>
    );
}
