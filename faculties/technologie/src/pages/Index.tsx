import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import YearSelector from "@/components/sections/YearSelector";
import LatestAnnouncements from "@/components/sections/LatestAnnouncements";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <YearSelector />
        <LatestAnnouncements />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
