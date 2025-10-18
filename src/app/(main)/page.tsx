import HomeAbout from '@/components/main/home/HomeAbout';

import HomeContent from '@/components/main/home/HomeContent';
import HomeHero from '@/components/main/home/HomeHero';
import HomeNotice from '@/components/main/home/HomeNotice';
import HomeServices from '@/components/main/home/HomeServices';
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
