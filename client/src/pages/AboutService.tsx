import { CTASection } from "@/components/about/CTASection";
import { ExtraFeatureSection } from "@/components/about/ExtraFeatureSection.tsx";
import { FeatureSection } from "@/components/about/FeatureSection";
import { Footer } from "@/components/about/Footer.tsx";
import { HeroSection } from "@/components/about/HeroSection";

import { useScrollProgress } from "@/hooks/common/useScrollProgress";

export default function AboutService() {
  const scrollProgress = useScrollProgress();

  return (
    <div className="min-h-screen bg-white">
      <div
        className="fixed top-0 left-0 h-1 bg-green-600 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      <HeroSection />
      <FeatureSection />
      <ExtraFeatureSection />
      <CTASection />
      <Footer />
    </div>
  );
}
