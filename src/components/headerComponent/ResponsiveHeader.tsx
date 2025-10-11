'use client';

import { Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';

// Translation object
const translations = {
    en: {
        home: 'Home',
        services: 'Services',
        clients: 'Clients',
        contact: 'Contact',
    },
    es: {
        home: 'Inicio',
        services: 'Servicios',
        clients: 'Clientes',
        contact: 'Contacto',
    },
};

type Language = 'en' | 'es';

const ResponsiveHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [language, setLanguage] = useState<Language>('en');
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const pathname = usePathname();

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const langFromQuery = searchParams.get('lang');
        if (langFromQuery === 'en' || langFromQuery === 'es') {
            setLanguage(langFromQuery);
        }
    }, [searchParams]); // <-- Add searchParams here

    // Get navigation links with translations
    const getNavLinks = (lang: Language) => [
        { path: `/?lang=${lang}`, label: translations[lang].home },
        { path: `/?lang=${lang}#services`, label: translations[lang].services },
        { path: `/?lang=${lang}#clients`, label: translations[lang].clients },
        { path: `/?lang=${lang}#contact`, label: translations[lang].contact },
    ];

    const navLinks = getNavLinks(language);

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
            if (
                langDropdownOpen &&
                !target.closest('.language-dropdown') &&
                !target.closest('.language-button')
            ) {
                setLangDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen, langDropdownOpen]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleLanguageDropdown = () => {
        setLangDropdownOpen(!langDropdownOpen);
    };

    const changeLanguage = (lang: Language) => {
        setLanguage(lang);
        setLangDropdownOpen(false);

        // Construct new URL with correct query string
        const hash = window.location.hash || '';
        const [hashPath] = hash.split('?'); // get just '#services'
        const newUrl = `${window.location.pathname}?lang=${lang}${hashPath}`;
        router.replace(newUrl, { scroll: false });
    };

    const isActive = (path: string) => pathname === path;

    return (
        <header className="w-full duration-300 md:sticky md:top-0 md:z-50 md:bg-white/50 md:backdrop-blur-md md:transition-all md:ease-in-out">
            <section className="container mx-auto">
                {/* Header Section */}
                <div className="">
                    <div className="mx-4 flex items-center justify-between py-4 text-black sm:mx-6">
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
                        <div className="font-bangla hidden items-center space-x-6 font-medium sm:flex">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`p-2 ${
                                        isActive(link.path)
                                            ? 'text-black/90'
                                            : ''
                                    } transition-colors duration-300 ease-in-out hover:text-black/80`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Desktop Language Selector */}
                            <div className="relative">
                                <button
                                    className="language-button flex items-center space-x-1 rounded-md p-2 transition-colors duration-300 ease-in-out"
                                    onClick={toggleLanguageDropdown}
                                >
                                    <Globe className="h-4 w-4" />
                                    <span className="text-sm font-medium capitalize">
                                        {language === 'es'
                                            ? 'Spanish'
                                            : 'English'}
                                    </span>
                                </button>

                                {langDropdownOpen && (
                                    <div className="language-dropdown absolute right-0 top-full mt-1 w-20 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div className="py-1">
                                            <button
                                                onClick={() =>
                                                    changeLanguage('en')
                                                }
                                                className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100 ${
                                                    language === 'en'
                                                        ? 'bg-gray-100 font-medium text-gray-600'
                                                        : ''
                                                }`}
                                            >
                                                English
                                            </button>
                                            <button
                                                onClick={() =>
                                                    changeLanguage('es')
                                                }
                                                className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100 ${
                                                    language === 'es'
                                                        ? 'bg-gray-100 font-medium text-gray-600'
                                                        : ''
                                                }`}
                                            >
                                                Spanish
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="menu-button block text-xl text-black sm:hidden"
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
                                className={`hover:text-purple-300 ${isActive(link.path) ? 'text-purple-300' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Mobile Language Selector */}
                        <div className="mt-6 border-t border-gray-700 pt-4">
                            <div className="mb-2 flex items-center space-x-2 text-sm text-gray-300">
                                <Globe className="h-4 w-4" />
                                <span>Language</span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={`rounded px-3 py-1 text-sm transition-colors ${
                                        language === 'en'
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => changeLanguage('es')}
                                    className={`rounded px-3 py-1 text-sm transition-colors ${
                                        language === 'es'
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                                >
                                    Spanish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </header>
    );
};

export default ResponsiveHeader;
