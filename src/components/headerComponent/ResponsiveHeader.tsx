'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';

const ResponsiveHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (
                menuOpen &&
                !target.closest('.slider-menu') &&
                !target.closest('.menu-button')
            ) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    useEffect(() => {
        if (menuOpen) {
            // Lock scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Unlock scroll
            document.body.style.overflow = '';
        }

        // Cleanup in case component unmounts
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    const navLinks = [
        { path: '/', label: 'হোম' },

        { path: '/#donation', label: 'মাসিক চাঁদা' },
        { path: '/#qurbani', label: 'কোরবানি তালিকা' },
        { path: '/#iftar', label: 'ইফতারি তালিকা' },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#D4AF37] bg-[#29173F] backdrop-blur duration-300 md:backdrop-blur-md md:transition-all md:ease-in-out">
            <section className="container mx-auto">
                {/* Header Section */}
                <div className="">
                    <div className="mx-4 flex items-center justify-between py-4 text-white sm:mx-6">
                        {/* Mosque Name (Two Lines) */}
                        <div className="flex flex-col leading-tight">
                            <p className="text-sm font-bold text-white sm:text-base">
                                মনোহরপুর বায়তুন - নূর
                            </p>
                            <p className="text-sm text-purple-200 sm:text-base">
                                কেন্দ্রীয় জামে মসজিদ
                            </p>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden items-center space-x-6 font-bangla font-medium sm:flex">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`p-2 ${
                                        isActive(link.path)
                                            ? 'text-white/80'
                                            : ''
                                    } transition-colors duration-300 ease-in-out hover:text-white/80`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="menu-button block text-xl text-white sm:hidden"
                            onClick={toggleMenu}
                        >
                            {!menuOpen && (
                                <AiOutlineMenu className="text-2xl" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Backdrop Blur Effect */}
                {menuOpen && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-brightness-50 transition-all duration-500"></div>
                )}

                {/* Right Sliding Menu */}
                <div
                    className={`slider-menu fixed right-0 top-0 z-50 h-screen w-[60%] max-w-xs transform bg-[#2A1A45] bg-opacity-95 pt-5 text-white shadow-lg transition-transform duration-700 ease-in-out md:hidden ${
                        menuOpen ? 'translate-x-0' : 'hidden translate-x-full'
                    }`}
                >
                    <button
                        className="absolute right-5 text-xl font-bold text-white"
                        onClick={toggleMenu}
                    >
                        <RxCross2 color="white" />
                    </button>

                    <div className="z-[100] flex flex-col items-start space-y-4 px-8 pt-5 text-lg">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                onClick={() => setMenuOpen(false)}
                                className={`hover:text-purple-300 ${
                                    isActive(link.path) ? 'text-purple-300' : ''
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </header>
    );
};

export default ResponsiveHeader;
