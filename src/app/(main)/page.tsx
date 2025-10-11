import HomeContact from '@/components/home/HomeContact';
import HomeContent from '@/components/home/HomeContent';
import HomeHero from '@/components/home/HomeHero';
import HomeServices from '@/components/home/HomeServices';

const Home = async () => {
    return (
        <div className="min-h-screen bg-[#29173F]">
            <HomeHero />
            <HomeServices />
            <HomeContent />
            <HomeContact />
        </div>
    );
};

export default Home;
