'use client';

import { IUser } from '@/server/model/users/userType'; // adjust path
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import UserModal from './UserModal';

interface AllUsersProps {
    users: IUser[];
}

export default function AllUsersComponent({ users }: AllUsersProps) {
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    return (
        <div className="min-h-screen bg-[#29173F] p-6 text-white">
            <div className="mb-6 flex items-center justify-between">
                {' '}
                <h1 className="font-roboto text-3xl font-bold">All Users</h1>
                <Link
                    className="rounded-lg border border-[#D4AF37]/50 p-2 text-center font-roboto font-semibold text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#29173F]"
                    href="/towercontrol/users/add"
                >
                    Add New User
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {users.map((user, index) => (
                    <motion.div
                        key={user._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        onClick={() => setSelectedUser(user)}
                        className={`no-select flex cursor-pointer flex-col gap-3 rounded-2xl bg-[#3C245A] p-4 shadow-lg transition-transform hover:scale-105 ${user.isDeleted ? 'border border-red-200' : ''}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37] text-lg font-bold text-[#29173F]">
                                <AiOutlineUser scale={24} />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">
                                    {user.name || 'নাম পাওয়া যায়নি'}
                                </h2>
                                <p className="font-roboto text-sm">
                                    {user.role}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 text-sm">
                            <p>
                                ফোন:
                                <span className="font-roboto font-bold">
                                    {' '}
                                    {user.phone}
                                </span>
                            </p>
                            <p>
                                একাউন্ট তৈরি:{' '}
                                {new Date(user.createdAt).toLocaleDateString(
                                    'bn-BD',
                                )}
                            </p>
                            <p>
                                সর্বশেষ লগইন:{' '}
                                {new Date(
                                    user.loginTimeStamp[0],
                                ).toLocaleString('bn-BD')}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
            {selectedUser && (
                <UserModal
                    user={selectedUser}
                    isOpen={!!selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
}
