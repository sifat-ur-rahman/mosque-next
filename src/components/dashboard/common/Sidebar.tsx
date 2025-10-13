'use client';

import { useState } from 'react';

interface MenuItem {
    id: string;
    label: string;
    subItems?: { id: string; label: string }[];
}

const menuItems: MenuItem[] = [
    {
        id: 'item1',
        label: 'Item 1',
        subItems: [
            { id: 'subitem1.1', label: 'Subitem 1.1' },
            { id: 'subitem1.2', label: 'Subitem 1.2' },
        ],
    },
    {
        id: 'item2',
        label: 'Item 2',
    },
    {
        id: 'item3',
        label: 'Item 3',
        subItems: [
            { id: 'subitem3.1', label: 'Subitem 3.1' },
            { id: 'subitem3.2', label: 'Subitem 3.2' },
        ],
    },
];

export function DashboardSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<string[]>(['item1']);
    const [activeItem, setActiveItem] = useState('item1');

    const toggleExpanded = (itemId: string) => {
        setExpandedItems((prev) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId],
        );
    };

    const handleItemClick = (itemId: string, hasSubItems: boolean) => {
        setActiveItem(itemId);
        if (hasSubItems) {
            toggleExpanded(itemId);
        }
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
                    <div className="flex h-16 items-center justify-center border-b border-[#4a3464]">
                        <h1 className="text-xl font-bold text-[#d4af37]">
                            Dashboard
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="space-y-2">
                            {menuItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() =>
                                            handleItemClick(
                                                item.id,
                                                !!item.subItems,
                                            )
                                        }
                                        className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                                            activeItem === item.id
                                                ? 'bg-[#d4af37] text-[#29173f]'
                                                : 'text-white hover:bg-[#3a2454]'
                                        }`}
                                    >
                                        <span>{item.label}</span>
                                        {item.subItems && (
                                            <svg
                                                className={`h-4 w-4 transition-transform ${expandedItems.includes(item.id) ? 'rotate-90' : ''}`}
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
                                    </button>

                                    {/* Sub Items */}
                                    {item.subItems &&
                                        expandedItems.includes(item.id) && (
                                            <ul className="ml-4 mt-1 space-y-1">
                                                {item.subItems.map(
                                                    (subItem) => (
                                                        <li key={subItem.id}>
                                                            <button
                                                                onClick={() =>
                                                                    setActiveItem(
                                                                        subItem.id,
                                                                    )
                                                                }
                                                                className={`flex w-full items-center rounded-lg px-4 py-2 text-sm transition-colors ${
                                                                    activeItem ===
                                                                    subItem.id
                                                                        ? 'bg-[#3a2454] font-medium text-[#d4af37]'
                                                                        : 'text-[#b8b8b8] hover:bg-[#3a2454]/50 hover:text-white'
                                                                }`}
                                                            >
                                                                <span className="ml-8">
                                                                    {
                                                                        subItem.label
                                                                    }
                                                                </span>
                                                            </button>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        )}
                                </li>
                            ))}
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
