'use client';

import TowerControlHomeHeader from '@/components/towercontrol/home/TowerControlHomeHeader';
import TowerControlQuickActions from '@/components/towercontrol/home/TowerControlQuickActions';

function TowerControlHome() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1E0E33] to-[#29173F] px-5 pb-8 text-[#F5F3F0] md:px-10">
            {/* Decorative Glow Circles */}
            <div className="absolute left-[-50px] top-10 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />
            <div className="absolute bottom-0 right-[-60px] h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-3xl" />

            <TowerControlHomeHeader />

            {/* Quick Actions Section */}
            <TowerControlQuickActions />

            {/* Footer */}
            <p className="mt-10 text-center text-xs text-[#BBA985]">
                এই ড্যাশবোর্ডের মাধ্যমে সকল তথ্য রিয়েল-টাইমে আপডেট ও নিয়ন্ত্রণ
                করা যাবে।
            </p>
        </section>
    );
}

export default TowerControlHome;

// 🔹 Reusable Quick Action Card
