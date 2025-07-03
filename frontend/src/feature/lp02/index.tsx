import ContactSection from "./components/ContactSection";
import HeroSection from "./components/HeroSection";
import StrengthsSection from "./components/StrengthsSection";
import QualityShowcase from "./components/QualityShowcase";
import IntegratedProductSection from "./components/IntegratedProductSection";
import ProcessSection from "./components/ProcessSection";
import HeroSection01 from "./components/HeroSection01";
import HeroSection02 from "./components/HeroSection02";
import HeroSection03 from "./components/HeroSection03";
import HeroSection04 from "./components/HeroSection04";
import HeroSection05 from "./components/HeroSection05";

export default function Index() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HeroSection01 />
      <HeroSection02 />
      <HeroSection03 />
      <HeroSection04 />
      <HeroSection05 />
      <StrengthsSection />
      <QualityShowcase />
      <IntegratedProductSection />
      <ProcessSection />
      <ContactSection />  
    </div>
  );
}