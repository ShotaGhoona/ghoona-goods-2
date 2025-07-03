import ContactSection from "./components/ContactSection";
import StrengthsSection from "./components/StrengthsSection";
import QualityShowcase from "./components/QualityShowcase";
import IntegratedProductSection from "./components/IntegratedProductSection";
import ProcessSection from "./components/ProcessSection";
import HeroSection from "./components/HeroSection";

export default function Index() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StrengthsSection />
      <QualityShowcase />
      <IntegratedProductSection />
      <ProcessSection />
      <ContactSection />  
    </div>
  );
}