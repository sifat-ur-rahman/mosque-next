'use client';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

const Footer = () => {
    const year = new Date().getFullYear();
    const headingVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });
    return (
        <div ref={sectionRef} className="bg-black">
            <div className="container mx-auto">
                <div className="mx-4 grid grid-cols-1 items-center justify-center py-16 text-white sm:flex-row md:mx-14 md:grid-cols-3 md:py-36 lg:items-start">
                    {/* Left Column */}
                    <div className="flex items-center justify-center pb-16 pt-8 text-white md:col-span-2 md:justify-start md:pb-28 md:pt-24 lg:me-16 lg:pt-0">
                        <Link href={'/'} className="flex items-center">
                            <div>
                                <Image
                                    alt="logo"
                                    src={'/logo.png'}
                                    width={100}
                                    height={100}
                                    className="w-[40px] sm:w-[45px]"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-[1.1] sm:text-[17px] lg:ml-1">
                                    HIHUB GLOBAL <br /> TECHNOLOGIES
                                </p>
                            </div>
                        </Link>
                    </div>
                    {/* Right Column */}
                    <div className="col-span-1">
                        <div className="flex items-center justify-center lg:justify-start">
                            <div className="ml-2 text-center md:text-start">
                                <a
                                    href="mailto:hihubtrade@outlook.com"
                                    className="block text-lg font-bold leading-[1.2] sm:text-[20px]"
                                >
                                    hihubtrade@outlook.com
                                </a>

                                <a
                                    href="tel:+8618958020517"
                                    className="block text-lg font-bold leading-[1.3] sm:text-[20px]"
                                >
                                    +86 18958020517
                                </a>
                            </div>
                        </div>
                        {/* <div className="mx-3 mt-5 flex items-center justify-center space-x-7 text-2xl lg:justify-start">
                            <a
                                href="https://www.linkedin.com/company/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-all duration-500 hover:text-indigo-300"
                            >
                                <FaLinkedinIn />
                            </a>
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-all duration-500 hover:text-indigo-300"
                            >
                                <FaFacebookF />
                            </a>
                            <a
                                href="https://x.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-all duration-500 hover:text-indigo-300"
                            >
                                <FaXTwitter />
                            </a>
                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-all duration-500 hover:text-indigo-300"
                            >
                                <FaInstagram />
                            </a>
                        </div> */}
                        <p className="m-3 text-center text-base md:text-start">
                            Room 206, Building 288, Lane 1588, Zhuguang Road,
                            Qingpu District, Shanghai, China
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
