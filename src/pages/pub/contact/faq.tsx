import { useNavigate } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { IconSurface } from '../../../components/core/Icon/IconSurface';
import { FaqAccordion } from '../../../components/domain/Faq';
import { FAQ_CATEGORIES } from '../../../components/domain/Faq/faqData';
import styles from './faq.module.scss';
import { Button } from '../../../components/core/Button/Button';

export default function PubContactFaq() {
  const navigate = useNavigate();
  return (
    <FrontLayout>
      <div className={styles.faqPage}>
        {/* 1. Hero (Figma PC 2408:1774 / Mobile 2408:2460 · 가운데 정렬 Compact) */}
        <HeroSection
          category="contact"
          heroVariant="compact"
          align="center"
          eyebrow="FAQ"
          title="자주 묻는 질문"
          description="xPrivacy의 도입 방식, 비식별 기능, 결과 검수와 이용 방법을 확인해 보세요."
        />

        {/* 2. FAQ 목록 (Figma PC 2408:1433 / Mobile 2408:2194) */}
        <BasicSection bg="white" layout="vertical" align="left">
          <div className={styles.faqGroups}>
            {FAQ_CATEGORIES.map((cat, catIndex) => (
              <section key={cat.title} className={styles.faqGroup}>
                <div className={styles.groupHead}>
                  <IconSurface src={cat.glyph} size={48} sizeMo={40} glyphFit="fill" />
                  <h2 className={styles.groupTitle}>{cat.title}</h2>
                  <span className={styles.groupCount}>질문 {cat.items.length}개</span>
                </div>

                <FaqAccordion items={cat.items} defaultOpenIds={catIndex === 0 ? [cat.items[0].id] : []} />
              </section>
            ))}
          </div>
        </BasicSection>

        {/* 3. 관련 정보·다음 행동 (Figma PC 2409:1679 / Mobile 2409:1684) */}
        <BasicSection bg="white" layout="vertical" align="left" className={styles.nextSection}>
          <div className={styles.nextBox}>
            <p className={styles.nextTitle}>원하는 답을 찾지 못했나요?</p>
            <Button
              variant="outline"
              color="neutral"
              size="xl"
              className={styles.nextButton}
              onClick={() => void navigate('/pub/contact/inquiry')}
            >
              문의하기
            </Button>
          </div>
        </BasicSection>
      </div>
    </FrontLayout>
  );
}
