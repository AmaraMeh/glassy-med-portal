import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import YearSelector from "@/components/sections/YearSelector";
import LatestAnnouncements from "@/components/sections/LatestAnnouncements";
import Footer from "@/components/sections/Footer";
import { useFaculty } from "@/lib/faculty-context";

const FacultyHome = () => {
  // This page reuses the main sections but with faculty context injected
  const { faculty } = useFaculty();
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

export default FacultyHome;

