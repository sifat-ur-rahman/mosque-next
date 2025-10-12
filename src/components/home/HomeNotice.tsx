function HomeNotice() {
    return (
        <section className="relative overflow-hidden bg-[#1F1232] px-6 py-20">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 bg-[url('/islamic-star-pattern-gold.jpg')] bg-repeat opacity-10"></div>

            <div className="relative mx-auto max-w-7xl text-center">
                {/* Section Title */}
                <h2 className="mb-4 text-4xl font-bold tracking-wide text-[#D4AF37] md:text-5xl">
                    মসজিদের নোটিশ বোর্ড
                </h2>
                <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-[#C4B5A0]">
                    এখানে মসজিদের গুরুত্বপূর্ণ ঘোষণা, সভা, ধর্মীয় অনুষ্ঠান, ও
                    সমাজকল্যাণমূলক কার্যক্রমের আপডেট নিয়মিত প্রকাশ করা হয়।
                </p>

                {/* Notice Cards */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Notice 1 */}
                    <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-[#29173F] p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[#D4AF37]/30">
                        <div className="absolute left-0 top-0 h-[4px] w-full bg-gradient-to-r from-[#D4AF37] via-[#C4B56A] to-[#D4AF37]" />
                        <h3 className="mb-3 text-2xl font-semibold text-[#D4AF37]">
                            জুম’আ নামাজের সময় পরিবর্তন
                        </h3>
                        <p className="leading-relaxed text-[#F5F3F0]">
                            আসন্ন শীতকালকে সামনে রেখে জুম’আ নামাজের সময় দুপুর
                            ১:৩০ থেকে ১:৪৫ মিনিটে পরিবর্তন করা হয়েছে। অনুগ্রহ
                            করে সময়মতো উপস্থিত থাকবেন।
                        </p>
                    </div>

                    {/* Notice 2 */}
                    <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-[#29173F] p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[#D4AF37]/30">
                        <div className="absolute left-0 top-0 h-[4px] w-full bg-gradient-to-r from-[#D4AF37] via-[#C4B56A] to-[#D4AF37]" />
                        <h3 className="mb-3 text-2xl font-semibold text-[#D4AF37]">
                            রমজান ইফতার আয়োজন তালিকা প্রকাশ
                        </h3>
                        <p className="leading-relaxed text-[#F5F3F0]">
                            আগামী রমজানের ইফতার আয়োজনের পূর্ণ তালিকা প্রকাশিত
                            হয়েছে। আপনি কারা কারা দিন নির্ধারণ করেছেন তা
                            ওয়েবসাইটের “ইফতার সেকশন”-এ দেখতে পারবেন।
                        </p>
                    </div>

                    {/* Notice 3 */}
                    <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-[#29173F] p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[#D4AF37]/30">
                        <div className="absolute left-0 top-0 h-[4px] w-full bg-gradient-to-r from-[#D4AF37] via-[#C4B56A] to-[#D4AF37]" />
                        <h3 className="mb-3 text-2xl font-semibold text-[#D4AF37]">
                            মাসিক চাঁদা সংগ্রহ অভিযান
                        </h3>
                        <p className="leading-relaxed text-[#F5F3F0]">
                            মসজিদের রক্ষণাবেক্ষণ ও উন্নয়ন কাজে সহায়তার জন্য
                            মাসিক চাঁদা সংগ্রহ চলছে। নির্ধারিত চাঁদা ও প্রদানের
                            অবস্থা জানতে চাঁদা সেকশনটি দেখুন।
                        </p>
                    </div>
                </div>

                {/* Button */}
                <div className="mt-12">
                    <a
                        href="#"
                        className="inline-block rounded-full bg-[#D4AF37] px-8 py-3 text-lg font-semibold text-[#29173F] shadow-lg transition-all duration-300 hover:bg-[#b8972d]"
                    >
                        সব নোটিশ দেখুন
                    </a>
                </div>
            </div>
        </section>
    );
}

export default HomeNotice;
