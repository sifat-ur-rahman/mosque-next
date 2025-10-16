import HomeAbout from '@/components/home/HomeAbout';

import HomeContent from '@/components/home/HomeContent';
import HomeHero from '@/components/home/HomeHero';
import HomeNotice from '@/components/home/HomeNotice';
import HomeServices from '@/components/home/HomeServices';
import connectMongo from '@/server/utils/connection';

const Home = async () => {
    await connectMongo();
    return (
        <div className="min-h-screen bg-[#29173F]">
            <HomeHero />
            <HomeServices />
            <HomeAbout />
            <HomeContent />
            <HomeNotice />
        </div>
    );
};

export default Home;
