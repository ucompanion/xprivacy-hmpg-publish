import FrontLayout from '../layouts/FrontLayout';
import { HeroSection } from './sections/HeroSection';
import { ComparisonSection } from './sections/ComparisonSection';
import { ProcessSection } from './sections/ProcessSection';
import { FeatureSection } from './sections/FeatureSection';
import { UseCaseSection } from './sections/UseCaseSection';
import { PricingSection } from './sections/PricingSection';
import { FaqSection } from './sections/FaqSection';
import { MainCtaSection } from './sections/CtaSection';

export default function PubFrontMain() {
  return (
    <FrontLayout>
      <HeroSection />
      <ComparisonSection />
      <ProcessSection />
      <FeatureSection />
      <UseCaseSection />
      <PricingSection />
      <FaqSection />
      <MainCtaSection />
    </FrontLayout>
  );
}
