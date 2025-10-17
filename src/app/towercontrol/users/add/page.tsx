'use client';

import addUserAction from '@/server/actions/users/addUserAction';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RxArrowLeft, RxCross2 } from 'react-icons/rx';
import { toast } from 'sonner';

type FormData = {
    name: string;
    phone: string;
    password: string;
    role: 'Admin' | 'Moderator' | 'User';
};

export default function AddUserForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>();
    const router = useRouter();
    const [successMsg, setSuccessMsg] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [userInfo, setUserInfo] = useState<{
        phone: string;
        password: string;
    } | null>(null);

    const onSubmit = async (data: FormData) => {
        try {
            setSuccessMsg('');
            // Example: after successful add
            const res = await addUserAction(data);

            if (res.success) {
                setUserInfo({ phone: data.phone, password: data.password });
                setShowModal(true);
                toast.success('User added successfully!');
                setSuccessMsg('✅ User added successfully!');
                reset();
            } else {
                setSuccessMsg('❌ Failed to add user!');
                toast.error('Failed to add user!');
            }
        } catch (error) {
            console.error(error);
            setSuccessMsg('❌ Server error!');
            toast.error('Server error!');
        }
    };

    const handleCopy = () => {
        if (!userInfo) return;
        const textToCopy = `URL: https://${window.location.host}/dashboard\nPhone: ${userInfo.phone}\nPassword: ${userInfo.password}`;
        navigator.clipboard.writeText(textToCopy);
        toast.success('Copied to clipboard!');
        setShowModal(false);
    };
    const handleReset = () => {
        setShowModal(false);
        setUserInfo(null);
        reset();
        setSuccessMsg('');
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#29173F] p-4 font-roboto">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative w-full max-w-md space-y-4 rounded-2xl bg-[#3C245A] p-6 text-[#F5F3F0] shadow-xl"
            >
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="absolute left-4 top-4 flex items-center gap-1 text-[#D4AF37] hover:opacity-80"
                >
                    <RxArrowLeft /> Back
                </button>
                <h2 className="mb-4 text-center text-2xl font-bold text-[#D4AF37]">
                    Add New User
                </h2>

                {/* Name */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-[#C4B5A0]">
                        Name
                    </label>
                    <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        placeholder="ইউজার নাম"
                        className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 font-bangla placeholder-[#AFA8B8] focus:border-[#D4AF37] focus:outline-none"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-400">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-[#C4B5A0]">
                        Phone Number
                    </label>
                    <input
                        {...register('phone', {
                            required: 'Phone number is required',
                            pattern: {
                                value: /^01[0-9]{9}$/,
                                message: 'Enter a valid 11-digit phone number',
                            },
                        })}
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter phone number"
                        className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 placeholder-[#AFA8B8] focus:border-[#D4AF37] focus:outline-none"
                    />
                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-400">
                            {errors.phone.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-[#C4B5A0]">
                        Password
                    </label>
                    <input
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message:
                                    'Password must be at least 6 characters',
                            },
                        })}
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter password"
                        className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 placeholder-[#AFA8B8] focus:border-[#D4AF37] focus:outline-none"
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-400">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Role */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-[#C4B5A0]">
                        Role
                    </label>
                    <select
                        {...register('role', { required: 'Select a role' })}
                        className="w-full rounded-lg border border-[#D4AF37]/40 bg-[#29173F] px-3 py-2 text-[#F5F3F0] focus:border-[#D4AF37] focus:outline-none"
                    >
                        <option value="">Select a role</option>
                        <option value="Admin">Admin</option>
                        <option value="Moderator">Moderator</option>
                        <option value="User">User</option>
                    </select>
                    {errors.role && (
                        <p className="mt-1 text-sm text-red-400">
                            {errors.role.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B6902E] py-2 font-semibold text-[#29173F] transition-all duration-300 hover:opacity-90"
                >
                    {isSubmitting ? 'Adding...' : 'Add User'}
                </button>

                {successMsg && (
                    <div className="flex items-center justify-between rounded border border-[#D4AF37]/40 p-2">
                        <p className="text-center text-sm text-[#D4AF37]">
                            {successMsg}
                        </p>
                        <span
                            onClick={handleReset}
                            className="transition-colors duration-300 hover:text-red-400"
                        >
                            <RxCross2 />
                        </span>
                    </div>
                )}
            </form>

            {/* ✅ Success Modal */}
            {showModal && userInfo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 md:ps-[270px]">
                    <div className="w-80 rounded-lg bg-[#3C245A] p-6 text-[#F5F3F0] shadow-lg">
                        <h3 className="mb-4 text-center text-lg font-semibold text-[#D4AF37]">
                            User Info
                        </h3>
                        <p>
                            <strong>URL:</strong>{' '}
                            {`https://${window.location.host}/dashboard`}
                        </p>
                        <p>
                            <strong className="">Phone:</strong>{' '}
                            {userInfo.phone}
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
        </div>
    );
}
