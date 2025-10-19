'use client';

import deleteUserAction from '@/server/actions/users/deleteUserAction';
import updateUserAction from '@/server/actions/users/updateUserAction';
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
    password: string;
};

export default function UserModal({ user, isOpen, onClose }: UserModalProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userInfo, setUserInfo] = useState<{
        phone: string;
        password: string;
    } | null>(null);

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
            const res = await updateUserAction({
                id: user._id,
                name: data.name,
                phone: data.phone,
                role: data.role,
                password: data.password, // only hashed if provided
            });

            if (!res.success) {
                toast.error(res.error || 'Failed to update user!');
                return;
            }

            toast.success(res.message || 'User updated successfully!');
            setIsEditing(false);

            // If user changed password → show modal with new info
            if (data.password && data.password.trim() !== '') {
                setUserInfo({ phone: data.phone, password: data.password });
                setShowModal(true);
            } else {
                // Otherwise close modal and refresh page
                setIsEditing(false);
                onClose();
            }
        } catch (err) {
            toast.error('Failed to update user!');
        }
    };

    const handleCopy = async () => {
        if (!userInfo) return;
        const text = `Phone: ${userInfo.phone}\nPassword: ${userInfo.password}\nURL: https://${window.location.host}/dashboard`;
        await navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
        setShowModal(false);
        setIsEditing(false);
        onClose();
    };

    const handleDelete = async () => {
        try {
            const res = await deleteUserAction(user._id);
            if (!res.success) {
                toast.error(res.error || 'Failed to delete user!');
                return;
            }
            toast.success(res.message || 'User deleted successfully!');
            setShowDeleteModal(false);
            onClose();
        } catch {
            toast.error('Error deleting user!');
        }
    };
    const handleRemoveDelete = async () => {
        try {
            const res = await deleteUserAction(user._id, false);
            if (!res.success) {
                toast.error(
                    res.error || 'ব্যবহারকারী পুনরুদ্ধার করতে ব্যর্থ হয়েছে।',
                );
                return;
            }
            toast.success(
                res.message || 'ব্যবহারকারী সফলভাবে পুনরুদ্ধার হয়েছে।',
            );
            setShowDeleteModal(false);
            onClose();
        } catch {
            toast.error('ত্রুটি ঘটেছে! অনুগ্রহ করে আবার চেষ্টা করুন।');
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
                                        লগইন ইতিহাস:{' '}
                                        <span className="font-roboto font-bold">
                                            ({user.loginTimeStamp.length})
                                        </span>
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
                                    {user.isDeleted ? (
                                        <button
                                            onClick={handleRemoveDelete}
                                            className="flex items-center gap-1 rounded-md bg-green-500 px-3 py-1 font-semibold text-black hover:opacity-90"
                                        >
                                            পুনরুদ্ধার করুন {/* Restore */}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                setShowDeleteModal(true)
                                            }
                                            className="flex items-center gap-1 rounded-md bg-red-500 px-3 py-1 font-semibold text-white hover:opacity-90"
                                        >
                                            <FaRegTrashAlt size={14} /> Delete
                                        </button>
                                    )}
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
                                        pattern: {
                                            value: /^01[0-9]{9}$/,
                                            message:
                                                'সঠিক নাম্বার দিন (১১ ডিজিট)',
                                        },
                                    })}
                                    inputMode="numeric"
                                    className="w-full rounded-lg bg-[#29173F] px-3 py-2 font-roboto text-[#F5F3F0]"
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
                                <input
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    {...register('password', {
                                        minLength: {
                                            value: 6,
                                            message:
                                                'কমপক্ষে ৬ অক্ষরের হতে হবে',
                                        },
                                    })}
                                    className="w-full rounded-lg bg-[#29173F] px-3 py-2 font-roboto text-[#F5F3F0]"
                                    placeholder="Password (leave blank if not changing)"
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-400">
                                        {errors.password.message}
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
            {/* ✅ Success Modal (only when password updated) */}
            {showModal && userInfo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="w-80 rounded-lg bg-[#3C245A] p-6 text-[#F5F3F0] shadow-lg">
                        <h3 className="mb-4 text-center text-lg font-semibold text-[#D4AF37]">
                            User Info
                        </h3>
                        <p>
                            <strong>URL:</strong>{' '}
                            {`https://${window.location.host}/dashboard`}
                        </p>
                        <p>
                            <strong>Phone:</strong> {userInfo.phone}
                        </p>
                        <p>
                            <strong>Password:</strong> {userInfo.password}
                        </p>

                        <div className="mt-5 flex justify-between">
                            <button
                                onClick={handleCopy}
                                className="rounded-md bg-[#D4AF37] px-3 py-1 font-semibold text-[#29173F] hover:opacity-90"
                            >
                                Copy Info
                            </button>
                            <button
                                onClick={handleCopy}
                                className="rounded-md bg-red-500 px-3 py-1 font-semibold text-white hover:opacity-90"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ⚠️ Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="w-80 rounded-lg bg-[#3C245A] p-6 text-[#F5F3F0] shadow-lg">
                        <p className="mb-4 text-center">
                            আপনি কি নিশ্চিত আপনি{' '}
                            <strong className="text-[#D4AF37]">
                                {user.name}
                            </strong>{' '}
                            কে মুছে ফেলতে চান?
                        </p>

                        <div className="flex justify-between">
                            <button
                                onClick={handleDelete}
                                className="rounded-md bg-red-500 px-3 py-1 font-semibold text-white hover:opacity-90"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="rounded-md bg-[#D4AF37] px-3 py-1 font-semibold text-black hover:opacity-90"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
