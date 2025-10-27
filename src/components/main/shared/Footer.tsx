import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="relative overflow-hidden border-t border-[#D4AF37]/20 bg-[#1A0F2E] px-6 pb-10 pt-16 text-[#F5F3F0]">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 bg-[url('https://d13mnxosmylakr.cloudfront.net/contents/products/6508abef-8e16-4dfa-b639-a5c19fcf3c09/1761540899134_islamic-geometric-pattern-gold.png')] bg-repeat opacity-10"></div>

            <div className="relative mx-auto max-w-5xl text-center">
                {/* Mosque Name */}
                <h2 className="mb-4 text-3xl font-bold text-[#D4AF37] md:text-4xl">
                    মনোহরপুর বায়তুন-নূর কেন্দ্রীয় জামে মসজিদ
                </h2>

                {/* Short Description */}
                <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-[#C4B5A0]">
                    এই ওয়েবসাইটের মাধ্যমে আপনি মসজিদের মাসিক চাঁদা সম্পর্কিত
                    তথ্য, রমজানে ইফতার আয়োজন, কোরবানি তালিকা ও অন্যান্য ধর্মীয়
                    কার্যক্রমের আপডেট দেখতে পারবেন। আল্লাহ আমাদের সবাইকে একতা ও
                    নেক আমলের তৌফিক দান করুন।
                </p>

                {/* Decorative Divider */}
                <div className="mx-auto mb-6 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>

                {/* Dua / Blessing */}
                <p className="mb-10 text-lg italic text-[#F5F3F0]">
                    “আল্লাহ আমাদের আমল কবুল করুন এবং এই মসজিদকে কল্যাণ ও শান্তির
                    কেন্দ্র বানিয়ে দিন।”
                </p>

                {/* Copyright + Credit */}
                <div className="border-t border-[#D4AF37]/20 pb-12 pt-6 md:pb-0">
                    <p className="mb-2 text-sm text-[#C4B5A0]">
                        ©{' '}
                        <span className="font-roboto">
                            {new Date().getFullYear()}
                        </span>{' '}
                        মনোহরপুর বায়তুন-নূর কেন্দ্রীয় জামে মসজিদ — সর্বস্বত্ব
                        সংরক্ষিত।
                    </p>
                    <p>
                        <Link
                            href="https://sifat-4e9bc.web.app/"
                            target="_blank"
                            className="font-roboto font-medium text-[#F5F3F0] transition-all duration-300 hover:text-[#D4AF37]"
                        >
                            Powered by Sifat
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
