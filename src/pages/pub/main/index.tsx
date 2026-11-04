import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './aos.scss';
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
  // 스크롤 시 섹션 안의 컨텐츠(헤더, 본문)가 올라오는 효과 (메인 화면 전용)
  // 섹션 배경은 고정하고 컨텐츠만 움직인다. 첫 섹션(히어로)은 제외한다.
  // 공통 Section 컴포넌트는 헤더·본문 래퍼에 속성을 전달하지 않으므로 마운트 후 부여한다.
  useEffect(() => {
    document
      .querySelectorAll<HTMLElement>('main > section:not(:first-child) > div > *')
      .forEach((el, i) => {
        el.setAttribute('data-aos', 'fade-up');
        if (i % 2 === 1) el.setAttribute('data-aos-delay', '100');
      });

    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      offset: 80,
      once: true,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }, []);

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
