function HomeAbout() {
    return (
        <section className="bg-[#29173F] px-6 py-20">
            <div className="mx-auto max-w-7xl">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-4xl font-bold text-[#D4AF37] md:text-5xl">
                        আমাদের সম্পর্কে
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#C4B5A0]">
                        <strong>
                            মনোহরপুর বায়তুন-নূর কেন্দ্রীয় জামে মসজিদ
                        </strong>{' '}
                        আমাদের সমাজের আধ্যাত্মিক, সামাজিক ও ঐক্যের
                        কেন্দ্রবিন্দু। আধুনিক প্রযুক্তির সহায়তায় এখন মসজিদের
                        কার্যক্রম আরও স্বচ্ছ ও সহজভাবে পরিচালিত হচ্ছে।
                    </p>
                </div>

                <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    {/* Content Side */}
                    <div>
                        <h3 className="mb-6 text-3xl font-bold text-[#D4AF37]">
                            আমাদের উদ্দেশ্য
                        </h3>
                        <p className="mb-6 text-lg leading-relaxed text-[#F5F3F0]">
                            মসজিদ পরিচালনা ও বিভিন্ন সামাজিক কার্যক্রমকে
                            প্রযুক্তির মাধ্যমে আরও সহজ, স্বচ্ছ ও অংশগ্রহণমূলক
                            করা আমাদের প্রধান উদ্দেশ্য।
                        </p>
                        <p className="mb-8 text-lg leading-relaxed text-[#C4B5A0]">
                            মাসিক চাঁদা, কোরবানি, ও রমজানের ইফতার আয়োজন —
                            প্রতিটি বিষয়কে অনলাইন ডেটার মাধ্যমে সবাইকে অবহিত
                            রাখাই আমাদের এই প্ল্যাটফর্মের লক্ষ্য।
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]">
                                    <svg
                                        className="h-6 w-6 text-[#29173F]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-[#D4AF37]">
                                        স্বচ্ছ ব্যবস্থাপনা
                                    </h4>
                                    <p className="text-[#C4B5A0]">
                                        চাঁদা ও কোরবানির তথ্য সহজে দেখার সুবিধা
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]">
                                    <svg
                                        className="h-6 w-6 text-[#29173F]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-[#D4AF37]">
                                        একতার প্রচেষ্টা
                                    </h4>
                                    <p className="text-[#C4B5A0]">
                                        মসজিদের কার্যক্রমে সকল মুসল্লির অংশগ্রহণ
                                        নিশ্চিত করা
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]">
                                    <svg
                                        className="h-6 w-6 text-[#29173F]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-[#D4AF37]">
                                        সমাজে স্বচ্ছতা
                                    </h4>
                                    <p className="text-[#C4B5A0]">
                                        মসজিদের সব তথ্য সবার কাছে উন্মুক্ত রাখা
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Side */}
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-lg border-4 border-[#D4AF37] shadow-2xl">
                            <img
                                src="/mosque-inside-view.png"
                                alt="মনোহরপুর মসজিদ"
                                className="h-[500px] w-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Mission Cards */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="rounded-lg border border-[#4A3366] bg-[#1A0F2E] p-8 text-center transition-all duration-300 hover:border-[#D4AF37]">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#D4AF37]">
                            <svg
                                className="h-10 w-10 text-[#29173F]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-4 text-2xl font-bold text-[#D4AF37]">
                            স্বচ্ছতা
                        </h3>
                        <p className="leading-relaxed text-[#F5F3F0]">
                            মসজিদের আর্থিক ও সামাজিক কার্যক্রমের স্বচ্ছতা
                            নিশ্চিত করা।
                        </p>
                    </div>

                    <div className="rounded-lg border border-[#4A3366] bg-[#1A0F2E] p-8 text-center transition-all duration-300 hover:border-[#D4AF37]">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#D4AF37]">
                            <svg
                                className="h-10 w-10 text-[#29173F]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-4 text-2xl font-bold text-[#D4AF37]">
                            একতা
                        </h3>
                        <p className="leading-relaxed text-[#F5F3F0]">
                            সমাজে মুসল্লিদের মধ্যে পারস্পরিক ভালোবাসা ও সহযোগিতা
                            বৃদ্ধি করা।
                        </p>
                    </div>

                    <div className="rounded-lg border border-[#4A3366] bg-[#1A0F2E] p-8 text-center transition-all duration-300 hover:border-[#D4AF37]">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#D4AF37]">
                            <svg
                                className="h-10 w-10 text-[#29173F]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-4 text-2xl font-bold text-[#D4AF37]">
                            উন্নয়ন
                        </h3>
                        <p className="leading-relaxed text-[#F5F3F0]">
                            মসজিদ ও সমাজের উন্নয়নে সক্রিয় ভূমিকা রাখা, আল্লাহর
                            সন্তুষ্টির উদ্দেশ্যে।
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeAbout;
