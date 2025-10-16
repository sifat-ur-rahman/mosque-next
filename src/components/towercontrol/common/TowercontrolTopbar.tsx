'use client';

import LogoutAction from '@/server/actions/auth/logoutActions';
import { useEffect, useRef, useState } from 'react';

export function TowerControlTopBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-30 w-full border-b border-[#4a3464] bg-[#3a2454]/95 backdrop-blur">
            <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
                {/* Spacer for mobile menu button */}
                <div className="w-10 lg:hidden" />

                {/* Title or empty space */}
                <div className="flex-1">
                    <h2 className="text-base font-semibold text-white md:hidden">
                        মনোহরপুর বায়তুন-নূর <br />
                        <span className="text-sm"> কেন্দ্রীয় জামে মসজিদ</span>
                    </h2>
                </div>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37] font-semibold text-[#29173f] transition-colors hover:bg-[#d4af37]/90"
                    >
                        U
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border border-[#4a3464] bg-[#3a2454] shadow-lg">
                            <button
                                onClick={() => {
                                    console.log('Profile clicked');
                                    setIsDropdownOpen(false);
                                }}
                                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white transition-colors hover:bg-[#4a3464]"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                Profile
                            </button>
                            <button
                                onClick={() => {
                                    // console.log('Logout clicked');
                                    setIsDropdownOpen(false);
                                    LogoutAction();
                                }}
                                className="flex w-full items-center gap-3 border-t border-[#4a3464] px-4 py-3 text-left text-sm text-white transition-colors hover:bg-[#4a3464]"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
