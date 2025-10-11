import Link from 'next/link';

const Footer = () => {
    return (
        <div className="flex-col justify-between justify-items-center bg-[#222] px-5 py-5 text-center md:py-7 lg:flex lg:flex-row lg:px-10">
            <p className="mb-2 text-white md:mb-0">
                Copyright © {new Date().getFullYear()} All Rights Reserved.
            </p>

            <Link
                href="https://sifat-4e9bc.web.app/"
                target="_blank"
                className="hover:text-blue text-white transition-all duration-300"
            >
                Powered by Sifat
            </Link>
        </div>
    );
};

export default Footer;
