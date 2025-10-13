import Link from 'next/link';

export const ActionCard = ({
    href,
    icon,
    title,
}: {
    href: string;
    icon: React.ReactNode;
    title: string;
}) => (
    <Link
        href={href}
        className="hover:shadow-[0_0_15px_#D4AF37]/40 group flex flex-col items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#29173F]/80 py-5 transition-all duration-300 hover:bg-[#3C245A]/90"
    >
        <div className="mb-2 text-3xl text-[#D4AF37] transition-transform duration-300 group-hover:scale-110">
            {icon}
        </div>
        <span className="text-sm font-medium text-[#E8E6E3] group-hover:text-[#FFF9E6]">
            {title}
        </span>
    </Link>
);
