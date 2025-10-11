'use client';

import Image from 'next/image';
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

    const navLinks = [
        { path: '/', label: 'হোম' },
        { path: '/#', label: 'সার্ভিস' },
        { path: '/#', label: 'ক্লায়েন্ট' },
        { path: '/#', label: 'যোগাযোগ' },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <header className="w-full bg-[#29173F] duration-300 md:sticky md:top-0 md:z-50 md:backdrop-blur-md md:transition-all md:ease-in-out">
            <section className="container mx-auto">
                {/* Header Section */}
                <div className="">
                    <div className="mx-4 flex items-center justify-between py-4 text-white sm:mx-6">
                        <Link href={'/'} className="flex items-center">
                            <div>
                                <Image
                                    alt="logo"
                                    src={'/logo/logo01.png'}
                                    width={1000}
                                    height={700}
                                    className="w-[40px] sm:w-[55px]"
                                />
                            </div>
                        </Link>

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
                    <div className="fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-brightness-50 transition-all duration-500"></div>
                )}

                {/* Right Sliding Menu */}
                <div
                    className={`slider-menu fixed right-0 top-0 z-50 h-full w-[60%] max-w-xs transform bg-gray-950 bg-opacity-90 pt-5 text-white shadow-lg transition-transform duration-700 ease-in-out md:hidden ${
                        menuOpen ? 'translate-x-0' : 'translate-x-full'
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
