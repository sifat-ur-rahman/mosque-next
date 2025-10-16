'use client';

import Link from 'next/link';
import { useState } from 'react';

interface MenuItem {
    id: string;
    label: string;
    link?: string;
    subItems?: { id: string; label: string; link?: string }[];
}

const menuItems: MenuItem[] = [
    {
        id: '1',
        label: 'আডমিন ড্যাশবোর্ড',
        link: '/towercontrol',
    },
    {
        id: '2',
        label: 'সদস্য ব্যবস্থাপনা',
        subItems: [
            {
                id: '2.1',
                label: 'সদস্য তালিকা',
                link: '/towercontrol/members',
            },
            {
                id: '2.2',
                label: 'নতুন সদস্য যোগ',
                link: '/towercontrol/members/add',
            },
        ],
    },
    {
        id: '3',
        label: 'মাসিক টাকা আদায়',
        subItems: [
            {
                id: '3.1',
                label: 'দাতার তালিকা',
                link: '/towercontrol/chanda',
            },
            {
                id: '3.2',
                label: 'নতুন দাতা যোগ করুন',
                link: '/towercontrol/chanda/add',
            },
        ],
    },
    {
        id: '4',
        label: 'কোরবানি ব্যবস্থাপনা',
        subItems: [
            {
                id: '4.1',
                label: 'কোরবানি তালিকা',
                link: '/towercontrol/qurbani',
            },
            {
                id: '4.2',
                label: 'নতুন কোরবানি যোগ করুন',
                link: '/towercontrol/qurbani/add',
            },
        ],
    },
    {
        id: '5',
        label: 'ইফতার ব্যবস্থাপনা',
        subItems: [
            {
                id: '5.1',
                label: 'ইফতার তালিকা',
                link: '/towercontrol/iftar',
            },
            {
                id: '5.2',
                label: 'নতুন ইফতার যুক্ত করুন',
                link: '/towercontrol/iftar/add',
            },
        ],
    },
    {
        id: '6',
        label: 'আয়-ব্যয় রিপোর্ট',
        subItems: [
            {
                id: '6.1',
                label: 'রিপোর্ট দেখুন',
                link: '/towercontrol/reports',
            },
            {
                id: '6.2',
                label: 'নতুন তথ্য যোগ করুন',
                link: '/towercontrol/reports/add',
            },
        ],
    },
    {
        id: '7',
        label: 'সকল তথ্য',
        subItems: [
            {
                id: '7.1',
                label: 'সমস্ত ডাটা দেখুন',
                link: '/towercontrol/all-data',
            },
            {
                id: '7.2',
                label: 'ডাটা আপডেট করুন',
                link: '/towercontrol/all-data/edit',
            },
        ],
    },
    {
        id: '8',
        label: 'ড্যাশবোর্ড',
        link: '/dashboard',
    },
];

export function TowerControlSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [activeItem, setActiveItem] = useState('');

    const toggleExpanded = (itemId: string) => {
        setExpandedItems((prev) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId],
        );
    };

    const handleItemClick = (itemId: string, hasSubItems: boolean) => {
        setActiveItem(itemId);
        if (hasSubItems) toggleExpanded(itemId);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="fixed left-4 top-4 z-50 rounded-lg bg-[#1f0f2e] p-2 text-white transition-colors hover:bg-[#3a2454] lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                )}
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
                        <Link
                            href="/"
                            className="text-xl font-bold leading-[1.2] text-[#d4af37]"
                        >
                            মনোহরপুর বায়তুন-নূর <br />
                            <span className="text-sm">
                                কেন্দ্রীয় জামে মসজিদ
                            </span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="hide-scrollbar flex-1 overflow-y-auto px-4 py-2">
                        <ul className="space-y-1">
                            {menuItems.map((item) => {
                                const ItemContent = (
                                    <div
                                        className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                                            activeItem === item.id
                                                ? 'bg-[#d4af37] text-[#29173f]'
                                                : 'text-white hover:bg-[#3a2454]'
                                        }`}
                                        onClick={() =>
                                            handleItemClick(
                                                item.id,
                                                !!item.subItems,
                                            )
                                        }
                                    >
                                        <span>{item.label}</span>
                                        {item.subItems && (
                                            <svg
                                                className={`h-4 w-4 transition-transform ${
                                                    expandedItems.includes(
                                                        item.id,
                                                    )
                                                        ? 'rotate-90'
                                                        : ''
                                                }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                );

                                return (
                                    <li key={item.id}>
                                        {item.link ? (
                                            <Link href={item.link}>
                                                {ItemContent}
                                            </Link>
                                        ) : (
                                            ItemContent
                                        )}

                                        {/* Sub Items */}
                                        {item.subItems &&
                                            expandedItems.includes(item.id) && (
                                                <ul className="ml-1 mt-1 space-y-1">
                                                    {item.subItems.map(
                                                        (subItem) => (
                                                            <li
                                                                key={subItem.id}
                                                            >
                                                                {subItem.link ? (
                                                                    <Link
                                                                        href={
                                                                            subItem.link
                                                                        }
                                                                    >
                                                                        <div
                                                                            className={`flex w-full cursor-pointer items-center rounded-lg px-4 py-2 text-sm transition-colors ${
                                                                                activeItem ===
                                                                                subItem.id
                                                                                    ? 'bg-[#3a2454] font-medium text-[#d4af37]'
                                                                                    : 'text-[#b8b8b8] hover:bg-[#3a2454]/50 hover:text-white'
                                                                            }`}
                                                                            onClick={() =>
                                                                                setActiveItem(
                                                                                    subItem.id,
                                                                                )
                                                                            }
                                                                        >
                                                                            <span className="ml-1">
                                                                                {
                                                                                    subItem.label
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </Link>
                                                                ) : (
                                                                    <div className="px-4 py-2 text-sm text-[#b8b8b8]">
                                                                        {
                                                                            subItem.label
                                                                        }
                                                                    </div>
                                                                )}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            )}
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}
