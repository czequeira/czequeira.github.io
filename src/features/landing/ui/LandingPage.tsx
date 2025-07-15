import { ContactSection } from "./ContactSection";
import { FeatureSection } from "./FeatureSection";
import { HeroSection } from "./HeroSection";
import { LandingHeader } from "./LandingHeader";

export function LandingPage() {
  return (
    <>
      <LandingHeader />
      <HeroSection />
      <FeatureSection />
      <ContactSection />
    </>
  )
}