import { motion } from 'framer-motion';
import {
    FaCalendarAlt,
    FaDonate,
    FaList,
    FaMosque,
    FaUsers,
} from 'react-icons/fa';
import { TowerControlActionCard } from './TowerControlActionCard';

function TowerControlQuickActions() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative z-10 rounded-2xl border border-[#D4AF37]/20 bg-[#3C245A]/80 p-5 shadow-lg backdrop-blur-sm"
        >
            <h2 className="mb-5 text-center text-xl font-semibold tracking-wide text-[#D4AF37]">
                দ্রুত কাজের অপশন সমূহ
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {/* Card */}
                <TowerControlActionCard
                    href="/towercontrol/members"
                    icon={<FaUsers />}
                    title="আয়-ব্যয়"
                />
                <TowerControlActionCard
                    href="/towercontrol/chanda"
                    icon={<FaDonate />}
                    title="মাসিক চাঁদা"
                />
                <TowerControlActionCard
                    href="/towercontrol/qurbani"
                    icon={<FaMosque />}
                    title="কোরবানির তালিকা"
                />
                <TowerControlActionCard
                    href="/towercontrol/iftar"
                    icon={<FaCalendarAlt />}
                    title="ইফতারির তালিকা"
                />
                <TowerControlActionCard
                    href="/towercontrol/all-data"
                    icon={<FaList />}
                    title="সকল তথ্য"
                />
            </div>
        </motion.div>
    );
}

export default TowerControlQuickActions;
