import { motion } from 'framer-motion';
import Image from 'next/image';
function TowerControlHomeHeader() {
    return (
        <>
            {' '}
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 mb-10 text-center"
            >
                <div className="mb-4 flex justify-center">
                    <div className="relative h-44 w-60 drop-shadow-lg">
                        <Image
                            width={500}
                            height={500}
                            src="/basmalah-gold.png"
                            alt="বিসমিল্লাহ"
                            className="h-full w-full object-contain"
                        />
                    </div>
                </div>

                <h1 className="mb-3 text-2xl font-bold leading-snug text-[#D4AF37] sm:text-3xl">
                    মনোহরপুর বায়তুন-নূর কেন্দ্রীয় জামে মসজিদের
                    <br />
                    অ্যাডমিন ড্যাশবোর্ডে স্বাগতম
                </h1>

                <p className="mx-auto max-w-xl text-sm leading-relaxed text-[#C4B5A0] sm:text-base">
                    এখান থেকে আপনি সকল তথ্য, চাঁদা, কোরবানি, ইফতার তালিকা ও
                    অন্যান্য কনটেন্ট সহজে নিয়ন্ত্রণ করতে পারবেন।
                </p>
            </motion.div>
        </>
    );
}

export default TowerControlHomeHeader;
