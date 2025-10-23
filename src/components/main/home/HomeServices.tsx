import Image from 'next/image';

function HomeServices() {
    return (
        <section id="services" className="bg-[#1A0F2E] px-6 py-20">
            <div className="mx-auto max-w-7xl">
                <h2 className="mb-4 text-center text-4xl font-bold text-[#D4AF37] md:text-5xl">
                    আমাদের সেবা সমূহ
                </h2>
                <p className="mb-16 text-center text-lg text-[#C4B5A0]">
                    মনোহরপুর বায়তুন-নূর কেন্দ্রীয় জামে মসজিদের তথ্য ও সেবাসমূহ
                    এক নজরে
                </p>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Service 1 */}
                    <div className="rounded-lg border border-[#4A3366] bg-[#29173F] p-8 transition-all duration-300 hover:border-[#D4AF37]">
                        <div className="mb-6">
                            <Image
                                loading="lazy"
                                width={500}
                                height={500}
                                src="/mosque-donation-box.png"
                                alt="মাসিক চাঁদার তথ্য"
                                className="h-48 w-full rounded-lg object-cover"
                            />
                        </div>
                        <h3 className="mb-4 text-2xl font-bold text-[#D4AF37]">
                            মাসিক চাঁদার তথ্য
                        </h3>
                        <p className="leading-relaxed text-[#F5F3F0]">
                            প্রতি মাসে নির্ধারিত চাঁদার পরিমাণ ও প্রদানের অবস্থা
                            সহজেই দেখা যাবে। চাঁদা ব্যবস্থাপনায় স্বচ্ছতা ও
                            দায়িত্ববোধ বৃদ্ধির জন্য এই ব্যবস্থা করা হয়েছে।
                        </p>
                    </div>

                    {/* Service 2 */}
                    <div className="rounded-lg border border-[#4A3366] bg-[#29173F] p-8 transition-all duration-300 hover:border-[#D4AF37]">
                        <div className="mb-6">
                            <Image
                                loading="lazy"
                                width={500}
                                height={500}
                                src="/qurbani.png"
                                alt="নামাজ শিক্ষা"
                                className="h-48 w-full rounded-lg object-cover"
                            />
                        </div>
                        <h3 className="mb-4 text-2xl font-bold text-[#D4AF37]">
                            কোরবানির তালিকা
                        </h3>
                        <p className="leading-relaxed text-[#F5F3F0]">
                            কোরবানিতে কারা অংশগ্রহণ করছেন এবং কত অংশ নিয়েছেন —
                            সেই তথ্য এখানে পাওয়া যাবে, যাতে কোরবানির প্রস্তুতি
                            আরও সহজ হয়।
                        </p>
                    </div>

                    {/* Service 3 */}
                    <div className="rounded-lg border border-[#4A3366] bg-[#29173F] p-8 transition-all duration-300 hover:border-[#D4AF37]">
                        <div className="mb-6">
                            <Image
                                loading="lazy"
                                width={500}
                                height={500}
                                src="/iftar-arrangement.png"
                                alt="ইফতার আয়োজন"
                                className="h-48 w-full rounded-lg object-cover"
                            />
                        </div>
                        <h3 className="mb-4 text-2xl font-bold text-[#D4AF37]">
                            রমজান ইফতার আয়োজন
                        </h3>
                        <p className="leading-relaxed text-[#F5F3F0]">
                            রমজান মাসে প্রতিদিন কারা ইফতার দিচ্ছেন এবং কোন
                            তারিখে কে আয়োজন করেছেন — তার পূর্ণ তালিকা দেখা যাবে
                            এই সেকশনে।
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeServices;
