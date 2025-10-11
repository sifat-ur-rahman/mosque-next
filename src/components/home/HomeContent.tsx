function HomeContent() {
    return (
        <section className="bg-[#29173F] px-6 py-20">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    {/* Image Side */}
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-lg border-4 border-[#D4AF37]">
                            <img
                                src="/beautiful-mosque-night-golden-dome.png"
                                alt="মসজিদ"
                                className="h-[500px] w-full object-cover"
                            />
                        </div>
                        {/* Decorative Pattern */}
                        <div className="absolute -bottom-6 -right-6 h-32 w-32 opacity-20">
                            <img
                                src="/islamic-star-pattern-gold.png"
                                alt="pattern"
                                className="h-full w-full"
                            />
                        </div>
                    </div>

                    {/* Content Side */}
                    <div>
                        <h2 className="mb-6 text-4xl font-bold text-[#D4AF37] md:text-5xl">
                            ইসলামিক জ্ঞান অর্জন করুন
                        </h2>
                        <p className="mb-6 text-lg leading-relaxed text-[#F5F3F0]">
                            ইসলাম একটি পরিপূর্ণ জীবন ব্যবস্থা। কুরআন ও হাদিসের
                            আলোকে জীবন পরিচালনা করুন এবং দুনিয়া ও আখিরাতে সফলতা
                            অর্জন করুন।
                        </p>
                        <p className="mb-8 text-lg leading-relaxed text-[#C4B5A0]">
                            আমাদের সাথে থাকুন এবং প্রতিদিন নতুন কিছু শিখুন।
                            আল্লাহর রহমত ও বরকত আপনার উপর বর্ষিত হোক।
                        </p>

                        {/* Features List */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#D4AF37]">
                                    <span className="font-bold text-[#29173F]">
                                        ✓
                                    </span>
                                </div>
                                <div>
                                    <h4 className="mb-1 text-lg font-semibold text-[#D4AF37]">
                                        দৈনিক ইসলামিক পোস্ট
                                    </h4>
                                    <p className="text-[#C4B5A0]">
                                        প্রতিদিন নতুন ইসলামিক জ্ঞান ও উপদেশ
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#D4AF37]">
                                    <span className="font-bold text-[#29173F]">
                                        ✓
                                    </span>
                                </div>
                                <div>
                                    <h4 className="mb-1 text-lg font-semibold text-[#D4AF37]">
                                        নামাজের সময়সূচী
                                    </h4>
                                    <p className="text-[#C4B5A0]">
                                        আপনার এলাকার সঠিক নামাজের সময়
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#D4AF37]">
                                    <span className="font-bold text-[#29173F]">
                                        ✓
                                    </span>
                                </div>
                                <div>
                                    <h4 className="mb-1 text-lg font-semibold text-[#D4AF37]">
                                        ইসলামিক প্রশ্নোত্তর
                                    </h4>
                                    <p className="text-[#C4B5A0]">
                                        আপনার প্রশ্নের সঠিক উত্তর পান
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeContent;
