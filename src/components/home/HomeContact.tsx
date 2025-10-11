function HomeContact() {
    return (
        <section id="contact" className="bg-[#1A0F2E] px-6 py-20">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="mb-6 text-4xl font-bold text-[#D4AF37] md:text-5xl">
                    যোগাযোগ করুন
                </h2>
                <p className="mb-12 text-lg text-[#C4B5A0]">
                    আমাদের সাথে যোগাযোগ করতে নিচের তথ্য ব্যবহার করুন
                </p>

                <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Email */}
                    <div className="rounded-lg border border-[#4A3366] bg-[#29173F] p-6 transition-all duration-300 hover:border-[#D4AF37]">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]">
                            <svg
                                className="h-8 w-8 text-[#29173F]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-[#D4AF37]">
                            ইমেইল
                        </h3>
                        <p className="text-[#F5F3F0]">info@islamic.com</p>
                    </div>

                    {/* Phone */}
                    <div className="rounded-lg border border-[#4A3366] bg-[#29173F] p-6 transition-all duration-300 hover:border-[#D4AF37]">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]">
                            <svg
                                className="h-8 w-8 text-[#29173F]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-[#D4AF37]">
                            ফোন
                        </h3>
                        <p className="text-[#F5F3F0]">+880 1234-567890</p>
                    </div>

                    {/* Location */}
                    <div className="rounded-lg border border-[#4A3366] bg-[#29173F] p-6 transition-all duration-300 hover:border-[#D4AF37]">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]">
                            <svg
                                className="h-8 w-8 text-[#29173F]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-[#D4AF37]">
                            ঠিকানা
                        </h3>
                        <p className="text-[#F5F3F0]">ঢাকা, বাংলাদেশ</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeContact;
