function HomeHero() {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url('/islamic-geometric-pattern-gold.png')`,
                        backgroundSize: '400px 400px',
                        backgroundRepeat: 'repeat',
                    }}
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 text-center">
                {/* Islamic Calligraphy Image */}
                <div className="mb-12 flex justify-center">
                    <div className="relative h-32 w-32 md:h-40 md:w-40">
                        <img
                            src="/bismillah-calligraphy-gold.png"
                            alt="বিসমিল্লাহ"
                            className="h-full w-full object-contain"
                        />
                    </div>
                </div>

                {/* Main Heading */}
                <h1 className="mb-6 text-5xl font-bold leading-tight text-[#D4AF37] md:text-7xl">
                    মনোহরপুর বায়তুন-নূর কেন্দ্রীয় জামে মসজিদে আপনাকে স্বাগতম
                </h1>

                <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-[#F5F3F0] md:text-2xl">
                    আমাদের এই ওয়েবসাইটের মাধ্যমে আপনি প্রতি মাসের নির্ধারিত
                    চাঁদার পরিমাণ জানতে পারবেন, কোরবানিতে অংশগ্রহণকারীদের তালিকা
                    দেখতে পারবেন এবং রমজান মাসে প্রতিদিনের ইফতার আয়োজনের সময়সূচি
                    জানতে পারবেন। মসজিদের কার্যক্রমে স্বচ্ছতা ও একতার পথে এটি
                    একটি ছোট উদ্যোগ।
                </p>

                {/* CTA Buttons */}
                {/* <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                        href="#services"
                        className="rounded-lg bg-[#D4AF37] px-8 py-4 font-semibold text-[#29173F] transition-colors duration-300 hover:bg-[#C4A037]"
                    >
                        আরও জানুন
                    </a>
                    <a
                        href="#contact"
                        className="rounded-lg border-2 border-[#D4AF37] px-8 py-4 font-semibold text-[#D4AF37] transition-colors duration-300 hover:bg-[#D4AF37] hover:text-[#29173F]"
                    >
                        যোগাযোগ করুন
                    </a>
                </div> */}
            </div>

            {/* Decorative Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full"
                >
                    <path
                        d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                        fill="#1A0F2E"
                    />
                </svg>
            </div>
        </section>
    );
}

export default HomeHero;
