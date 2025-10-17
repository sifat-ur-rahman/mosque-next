'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
interface MenuItem {
    id: string;
    label: string;
    link: string;
}

const menuItems: MenuItem[] = [
    { id: '1', label: 'ড্যাশবোর্ড', link: '/dashboard' },
    { id: '3', label: 'মাসিক টাকা আদায়', link: '/dashboard/chanda' },
    { id: '4', label: 'কোরবানির তালিকা', link: '/dashboard/korban' },
    { id: '5', label: 'ইফতারির তালিকা', link: '/dashboard/iftar' },
    { id: '6', label: 'আয়-ব্যয় হিসাব', link: '/dashboard/report' },
    { id: '7', label: 'সকল তথ্য', link: '/dashboard/info' },
    { id: '8', label: 'হোম পেইজ', link: '/' },
];

export function DashboardSidebar({ loginUserRole }: any) {
    console.log({ loginUserRole });
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="fixed left-4 top-4 z-50 rounded-lg bg-[#1f0f2e] p-2 text-white transition-colors hover:bg-[#3a2454] lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-[#4a3464] bg-[#1f0f2e] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-full flex-col">
                    {/* Logo/Header */}
                    <div className="flex h-16 items-center justify-center border-b border-[#4a3464] ps-9 md:ps-0">
                        <h2 className="text-center text-xl font-bold leading-[1.2] text-[#d4af37]">
                            মনোহরপুর বায়তুন-নূর <br />
                            <span className="text-sm">
                                কেন্দ্রীয় জামে মসজিদ
                            </span>
                        </h2>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto px-4 py-2">
                        <ul className="space-y-1">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.link;
                                return (
                                    <li key={item.id}>
                                        <Link
                                            href={item.link}
                                            className={`flex w-full items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                                                isActive
                                                    ? 'bg-[#d4af37] text-[#29173f]'
                                                    : 'text-white hover:bg-[#3a2454]'
                                            }`}
                                            onClick={() => setIsOpen(false)} // Close menu on mobile
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                            {loginUserRole === 'Admin' && (
                                <li>
                                    <Link
                                        href={'/towercontrol'}
                                        className={`flex w-full items-center rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#3a2454]`}
                                        onClick={() => setIsOpen(false)} // Close menu on mobile
                                    >
                                        আডমিন ড্যাশবোর্ড
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="border-t border-[#4a3464] p-4">
                        <div className="flex items-center gap-3 px-4 py-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d4af37] font-semibold text-[#29173f]">
                                U
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-white">
                                    User Name
                                </p>
                                <p className="truncate text-xs text-[#b8b8b8]">
                                    user@example.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
