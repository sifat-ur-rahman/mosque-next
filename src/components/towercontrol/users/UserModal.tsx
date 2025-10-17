'use client';

import { IUser } from '@/server/model/users/userType';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPen, FaRegTrashAlt } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'sonner';

interface UserModalProps {
    user: IUser;
    isOpen: boolean;
    onClose: () => void;
}

type FormData = {
    name: string;
    phone: string;
    role: 'Admin' | 'Moderator' | 'User';
};

export default function UserModal({ user, isOpen, onClose }: UserModalProps) {
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        defaultValues: {
            name: user.name,
            phone: user.phone,
            role: user.role,
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            // call server action to update user here
            console.log('Updated data:', data);
            toast.success('User updated successfully!');
            setIsEditing(false);
        } catch (err) {
            toast.error('Failed to update user!');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="relative w-96 rounded-2xl bg-[#3C245A] p-6 text-[#F5F3F0] shadow-lg"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 text-[#D4AF37] hover:text-red-400"
                        >
                            <RxCross2 size={20} />
                        </button>

                        {!isEditing ? (
                            // === View Mode ===
                            <>
                                <h2 className="mb-4 text-center text-xl font-bold text-[#D4AF37]">
                                    {user.name || 'নাম পাওয়া যায়নি'}
                                </h2>

                                <p>
                                    ফোন:{' '}
                                    <span className="font-roboto font-bold">
                                        {user.phone}
                                    </span>
                                </p>
                                <p className="font-roboto">Role: {user.role}</p>
                                <p>
                                    একাউন্ট তৈরি:{' '}
                                    {new Date(
                                        user.createdAt,
                                    ).toLocaleDateString('bn-BD')}
                                </p>
                                <div className="mt-2">
                                    <p className="font-semibold">
                                        লগইন ইতিহাস:
                                    </p>
                                    {user.loginTimeStamp.length > 0 ? (
                                        <ul className="hide-scrollbar ml-2 max-h-[60px] list-disc overflow-y-auto text-sm">
                                            {user.loginTimeStamp.map(
                                                (time, idx) => (
                                                    <li key={idx}>
                                                        {new Date(
                                                            time,
                                                        ).toLocaleString(
                                                            'bn-BD',
                                                        )}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    ) : (
                                        <p className="text-sm">কোনো লগইন নেই</p>
                                    )}
                                </div>

                                <div className="mt-6 flex justify-between">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-1 rounded-md bg-[#D4AF37] px-3 py-1 font-semibold text-[#29173F] hover:opacity-90"
                                    >
                                        <FaPen /> Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            alert('Delete functionality')
                                        }
                                        className="flex items-center gap-1 rounded-md bg-red-500 px-3 py-1 font-semibold text-white hover:opacity-90"
                                    >
                                        <FaRegTrashAlt size={14} /> Delete
                                    </button>
                                </div>
                            </>
                        ) : (
                            // === Edit Mode ===
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col gap-3"
                            >
                                <h2 className="mb-4 text-center text-xl font-bold text-[#D4AF37]">
                                    Edit User
                                </h2>

                                <input
                                    {...register('name', {
                                        required: 'Name is required',
                                    })}
                                    className="w-full rounded-lg bg-[#29173F] px-3 py-2 text-[#F5F3F0]"
                                    placeholder="Name"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-400">
                                        {errors.name.message}
                                    </p>
                                )}

                                <input
                                    {...register('phone', {
                                        required: 'Phone is required',
                                    })}
                                    className="w-full rounded-lg bg-[#29173F] px-3 py-2 text-[#F5F3F0]"
                                    placeholder="Phone"
                                />
                                {errors.phone && (
                                    <p className="text-sm text-red-400">
                                        {errors.phone.message}
                                    </p>
                                )}

                                <select
                                    {...register('role', {
                                        required: 'Select role',
                                    })}
                                    className="w-full rounded-lg bg-[#29173F] px-3 py-2 text-[#F5F3F0]"
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="Moderator">Moderator</option>
                                    <option value="User">User</option>
                                </select>
                                {errors.role && (
                                    <p className="text-sm text-red-400">
                                        {errors.role.message}
                                    </p>
                                )}

                                <div className="mt-4 flex justify-between">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="rounded-md bg-[#D4AF37] px-3 py-1 font-semibold text-[#29173F] hover:opacity-90"
                                    >
                                        {isSubmitting
                                            ? 'Updating...'
                                            : 'Update'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="rounded-md bg-red-500 px-3 py-1 font-semibold text-white hover:opacity-90"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
