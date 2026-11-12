import FrontLayout from '../layouts/FrontLayout';
import { HeroSection } from './sections/HeroSection';
import { ComparisonSection } from './sections/ComparisonSection';
import { ProcessSection } from './sections/ProcessSection';
import { FeatureSection } from './sections/FeatureSection';
import { UseCaseSection } from './sections/UseCaseSection';
import { PricingSection } from './sections/PricingSection';
import { FaqSection } from './sections/FaqSection';
import { CtaSection } from '../../../components/domain/Section';

/**
 * 메인 (Figma PC 1928:484 · MO 1928:997 · 메인 비주얼 슬라이드 1785:218)
 */
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
      <CtaSection
        eyebrow="GET STARTED"
        title={
          <>
            업무 환경에 맞는 서비스를
            <br />
            직접 확인해보세요
          </>
        }
        description="무료 체험으로 제품을 먼저 확인하거나 기관·기업 환경에 맞는 도입 방식을 상담할 수 있습니다."
        primaryLabel="도입 문의하기"
        secondaryLabel="데모 체험하기"
        primaryHref="/pub/contact/inquiry"
        secondaryHref="/pub/demo/demo"
      />
    </FrontLayout>
  );
}
