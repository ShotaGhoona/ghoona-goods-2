
import HeroSection from "./components/HeroSection";
import StrengthsSection from "./components/StrengthsSection";
import QualityShowcase from "./components/QualityShowcase";
import IntegratedProductSection from "./components/IntegratedProductSection";
import ProductComparisonSection from "./components/ProductComparisonSection";
import ProductGallerySection from "./components/ProductGallerySection";
import TestimonialsSection from "./components/TestimonialsSection";
import ProcessSection from "./components/ProcessSection";
import NewsSection from "./components/NewsSection";

export default function Index() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StrengthsSection />
      <QualityShowcase />
      <IntegratedProductSection />
      <ProductComparisonSection />
      <ProductGallerySection />
      <TestimonialsSection />
      <ProcessSection />
      <NewsSection />
    </div>
  );
}