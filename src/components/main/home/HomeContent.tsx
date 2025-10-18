import Image from 'next/image';

function HomeContent() {
    return (
        <section className="bg-[#29173F] px-6 py-20">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    {/* Image Side */}
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-lg border-2 border-[#D4AF37]">
                            <Image
                                loading="lazy"
                                width={1500}
                                height={500}
                                src="/beautiful-mosque-night-golden-dome.png"
                                alt="মসজিদ"
                                className="h-[500px] w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Content Side */}
                    <div>
                        <h2 className="mb-6 text-4xl font-bold text-[#D4AF37] md:text-5xl">
                            মসজিদের কার্যক্রম এক নজরে
                        </h2>
                        <p className="mb-6 text-lg leading-relaxed text-[#F5F3F0]">
                            <strong>
                                মনোহরপুর বায়তুন-নূর কেন্দ্রীয় জামে মসজিদ
                            </strong>{' '}
                            কেবল একটি নামাজের স্থান নয় — এটি আমাদের সমাজের ঐক্য,
                            সহযোগিতা ও ইসলামী মূল্যবোধের কেন্দ্রস্থল। এখন আপনি
                            এই ওয়েবসাইটের মাধ্যমে মসজিদের বিভিন্ন কার্যক্রম ও
                            তথ্য সহজেই দেখতে পারবেন।
                        </p>
                        <p className="mb-8 text-lg leading-relaxed text-[#C4B5A0]">
                            এই সাইটের মাধ্যমে আপনি জানতে পারবেন মাসিক চাঁদার
                            নির্ধারিত পরিমাণ, কোরবানিতে অংশগ্রহণকারীদের তালিকা,
                            এবং রমজান মাসে প্রতিদিনের ইফতার আয়োজনের তথ্য। সব
                            কিছুই এক জায়গায়, স্বচ্ছভাবে ও সহজে।
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
                                        মাসিক চাঁদা তথ্য
                                    </h4>
                                    <p className="text-[#C4B5A0]">
                                        প্রতি মাসে নির্ধারিত চাঁদার পরিমাণ ও
                                        প্রদানের অবস্থা সহজেই দেখা যাবে।
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
                                        কোরবানি তালিকা
                                    </h4>
                                    <p className="text-[#C4B5A0]">
                                        কারা কারা কোরবানিতে অংশ নিচ্ছেন বা
                                        নিবন্ধিত হয়েছেন — তা এখান থেকে জানা
                                        যাবে।
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
                                        রমজান ইফতার আয়োজন
                                    </h4>
                                    <p className="text-[#C4B5A0]">
                                        প্রতিদিন কারা ইফতারি দিচ্ছেন ও ভবিষ্যতের
                                        আয়োজন কেমন হবে — তা এখান থেকে দেখা যাবে।
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
