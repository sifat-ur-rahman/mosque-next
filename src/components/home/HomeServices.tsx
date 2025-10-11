function HomeServices() {
    return (
        <section id="services" className="bg-[#1A0F2E] px-6 py-20">
            <div className="mx-auto max-w-7xl">
                <h2 className="mb-4 text-center text-4xl font-bold text-[#D4AF37] md:text-5xl">
                    আমাদের সেবাসমূহ
                </h2>
                <p className="mb-16 text-center text-lg text-[#C4B5A0]">
                    ইসলামিক শিক্ষা ও জ্ঞান অর্জনের জন্য বিভিন্ন সেবা
                </p>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Service 1 */}
                    <div className="rounded-lg border border-[#4A3366] bg-[#29173F] p-8 transition-all duration-300 hover:border-[#D4AF37]">
                        <div className="mb-6">
                            <img
                                src="/quran-book-islamic-art.png"
                                alt="কুরআন শিক্ষা"
                                className="h-48 w-full rounded-lg object-cover"
                            />
                        </div>
                        <h3 className="mb-4 text-2xl font-bold text-[#D4AF37]">
                            কুরআন শিক্ষা
                        </h3>
                        <p className="leading-relaxed text-[#F5F3F0]">
                            সহজ ও সঠিক পদ্ধতিতে কুরআন তিলাওয়াত শিখুন। তাজবীদসহ
                            সম্পূর্ণ কুরআন শিক্ষার ব্যবস্থা।
                        </p>
                    </div>

                    {/* Service 2 */}
                    <div className="rounded-lg border border-[#4A3366] bg-[#29173F] p-8 transition-all duration-300 hover:border-[#D4AF37]">
                        <div className="mb-6">
                            <img
                                src="/islamic-prayer-mosque-interior.png"
                                alt="নামাজ শিক্ষা"
                                className="h-48 w-full rounded-lg object-cover"
                            />
                        </div>
                        <h3 className="mb-4 text-2xl font-bold text-[#D4AF37]">
                            নামাজ শিক্ষা
                        </h3>
                        <p className="leading-relaxed text-[#F5F3F0]">
                            নামাজের সঠিক নিয়ম ও পদ্ধতি শিখুন। প্রতিটি রাকাতের
                            বিস্তারিত ব্যাখ্যা সহ।
                        </p>
                    </div>

                    {/* Service 3 */}
                    <div className="rounded-lg border border-[#4A3366] bg-[#29173F] p-8 transition-all duration-300 hover:border-[#D4AF37]">
                        <div className="mb-6">
                            <img
                                src="/islamic-knowledge-books-library.png"
                                alt="হাদিস শিক্ষা"
                                className="h-48 w-full rounded-lg object-cover"
                            />
                        </div>
                        <h3 className="mb-4 text-2xl font-bold text-[#D4AF37]">
                            হাদিস শিক্ষা
                        </h3>
                        <p className="leading-relaxed text-[#F5F3F0]">
                            রাসূল (সা.) এর হাদিস থেকে জীবন পরিচালনার
                            দিকনির্দেশনা। সহীহ হাদিসের সংকলন।
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeServices;
