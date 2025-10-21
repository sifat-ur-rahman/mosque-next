'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineDollarCircle, AiOutlineHome } from 'react-icons/ai';
import { FaMosque } from 'react-icons/fa';
import { MdDashboard, MdOutlineLocalDining } from 'react-icons/md';
import { TbMoneybag } from 'react-icons/tb';
interface ResponsiveHeaderProps {
    userRole?: 'Admin' | 'Moderator' | 'User' | string | null;
}

const ResponsiveHeader = ({ userRole }: ResponsiveHeaderProps) => {
    const pathname = usePathname();

    const navLinks = [
        { path: '/', label: 'হোম', icon: <AiOutlineHome size={24} /> },
        {
            path: '/donation',
            label: 'মাসিক আদায়',
            icon: <AiOutlineDollarCircle size={24} />,
        },
        {
            path: '/iftar',
            label: 'ইফতারি তালিকা',
            icon: <MdOutlineLocalDining size={24} />,
        },
        {
            path: '/qurbani',
            label: 'কোরবানি তালিকা',
            icon: <FaMosque size={24} />,
        },
        {
            path: '/',
            label: 'আয়-ব্যায়',
            icon: <TbMoneybag size={24} />,
        },
    ];
    const isPrivileged = userRole === 'Admin' || userRole === 'Moderator';
    const isActive = (path: string) => pathname === path;

    return (
        <>
            {/* Desktop Navbar */}
            <header className="top-0 z-[100] w-full border-b border-[#D4AF37] bg-[#29173F] backdrop-blur-md md:sticky md:backdrop-blur-md">
                <section className="container mx-auto">
                    <div className="mx-4 flex items-center justify-between py-2 text-white sm:mx-6 md:py-4">
                        {/* Mosque Name */}
                        <Link href="/" className="flex flex-col leading-tight">
                            <p className="text-sm font-bold text-white sm:text-base">
                                মনোহরপুর বায়তুন - নূর
                            </p>
                            <p className="text-sm text-purple-200 sm:text-base">
                                কেন্দ্রীয় জামে মসজিদ
                            </p>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden items-center space-x-6 font-bangla font-medium sm:flex">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`p-2 ${
                                        isActive(link.path)
                                            ? 'text-[#D4AF37]'
                                            : ''
                                    } transition-colors duration-300 ease-in-out hover:text-purple-300`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {isPrivileged && (
                                <Link
                                    href="/dashboard"
                                    className={`p-2 ${
                                        isActive('/dashboard')
                                            ? 'text-[#D4AF37]'
                                            : ''
                                    } transition-colors duration-300 ease-in-out hover:text-purple-300`}
                                >
                                    ড্যাশবোর্ড
                                </Link>
                            )}
                        </div>
                        <Link
                            href={isPrivileged ? '/dashboard' : '/'}
                            className="md:hidden"
                        >
                            {isPrivileged ? (
                                <MdDashboard size={24} />
                            ) : (
                                <AiOutlineHome size={24} />
                            )}
                        </Link>
                    </div>
                </section>
            </header>

            {/* Mobile Bottom Tabs */}
            <nav className="fixed bottom-0 z-50 w-full border-t border-gray-700 bg-[#29173F] text-white sm:hidden">
                <div className="flex justify-around py-2">
                    {navLinks.splice(1, 5).map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`flex flex-col items-center text-xs ${
                                isActive(link.path)
                                    ? 'text-[#D4AF37]'
                                    : 'text-white'
                            }`}
                        >
                            {link.icon}
                            <span>{link.label}</span>
                        </Link>
                    ))}
                    {/* {(userRole === 'Admin' || userRole === 'Moderator') && (
                        <Link
                            href="/dashboard"
                            className={`flex flex-col items-center text-xs ${
                                isActive('/dashboard')
                                    ? 'text-[#D4AF37]'
                                    : 'text-white'
                            }`}
                        >
                            <AiOutlineHome size={24} />
                            <span>ড্যাশবোর্ড</span>
                        </Link>
                    )} */}
                </div>
            </nav>
        </>
    );
};

export default ResponsiveHeader;
