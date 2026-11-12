import { useState } from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection, CtaSection } from '../../../components/domain/Section';
import { Button } from '../../../components/core/Button/Button';
import { Icon } from '../../../components/core/Icon/Icon';
import styles from './brochure.module.scss';

// 브로셔 슬라이더 13페이지 (Figma Brochure Slider / PC 3750:66165 · 슬라이드 16:9)
const PAGE_COUNT = 13;
const PAGES = Array.from({ length: PAGE_COUNT }, (_, i) => ({
  src: `/images/contact/brochure/page_${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `xPrivacy 브로셔 ${i + 1}페이지`,
}));

const pad = (n: number) => String(n).padStart(2, '0');

export default function PubContactBrochure() {
  const [current, setCurrent] = useState(0);
  const isFirst = current === 0;
  const isLast = current === PAGE_COUNT - 1;

  const goPrev = () => setCurrent((prev) => Math.max(prev - 1, 0));
  const goNext = () => setCurrent((prev) => Math.min(prev + 1, PAGE_COUNT - 1));

  return (
    <FrontLayout>
      <div className={styles.brochurePage}>
        {/* 1. Hero (Figma PC 3680:4 / Mobile 3680:873 · contact 공통 히어로) */}
        <HeroSection
          category="contact"
          heroVariant="compact"
          align="center"
          eyebrow="Contact"
          title="xPrivacy 브로셔"
          description="xPrivacy의 주요 기능과 도입 방식을 브로셔로 확인하세요."
        />

        {/* 2. PDF 다운로드 소개 (Figma PC 3680:11 / Mobile 3680:880) */}
        <BasicSection
          bg="white"
          layout="horizontal"
          align="left"
          className={styles.introSection}
          headerClassName={styles.introHeader}
          contentClassName={styles.introLayout}
          eyebrowClassName={styles.introEyebrow}
          titleClassName={styles.introTitle}
          descriptionClassName={styles.introDescription}
          eyebrow="Brochure"
          title={
            <>
              xPrivacy 브로셔
              <br className="splitBr" />
              다운로드
            </>
          }
          description={
            <>
              주요 기능, 적용 기술, 도입 방식과 가격 정책을
              <br className="splitBr" />
              브로셔 한 권으로 확인하세요.
            </>
          }
          headerExtra={
            <div className={styles.pdfAction}>
              <Button variant="solid" color="primary" size="xl" className={styles.pdfButton}>
                PDF 다운로드
              </Button>
            </div>
          }
        >
          <picture className={styles.coverPicture}>
            <source media="(max-width: 768px)" srcSet="/images/contact/brochure/cover_preview_mo.png" />
            <img
              src="/images/contact/brochure/cover_preview.png"
              alt="xPrivacy 브로셔 표지와 주요 내용 미리보기"
              className={styles.coverImage}
            />
          </picture>
        </BasicSection>

        {/* 모바일 열람 안내 (Figma Mobile 3680:1013 · 모바일 전용) */}
        <div className={styles.mobileNotice}>
          <p className={styles.mobileNoticeText}>
            작은 글씨와 표는 PDF를 다운로드해
            <br />
            확대해서 확인할 수 있습니다.
          </p>
        </div>

        {/* 3. 브로셔 슬라이더 · 13 pages (Figma PC 3680:1924 / Mobile 3680:2019) */}
        <section className={styles.sliderSection} aria-roledescription="carousel" aria-label="xPrivacy 브로셔 미리보기">
          <div className={styles.slider}>
            <div className={styles.stage}>
              <button
                type="button"
                className={`${styles.arrow} ${styles.arrowPrev}`}
                onClick={goPrev}
                disabled={isFirst}
                aria-label="이전 페이지"
              >
                <Icon name="chevron-left" size={24} />
              </button>

              <div className={styles.viewport}>
                <ul className={styles.track} style={{ transform: `translateX(-${current * 100}%)` }}>
                  {PAGES.map((page, i) => (
                    <li
                      key={page.src}
                      className={styles.slide}
                      aria-hidden={i !== current}
                      aria-roledescription="slide"
                      aria-label={`${i + 1} / ${PAGE_COUNT}`}
                    >
                      <img src={page.src} alt={page.alt} className={styles.slideImage} loading={i === 0 ? 'eager' : 'lazy'} />
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className={`${styles.arrow} ${styles.arrowNext}`}
                onClick={goNext}
                disabled={isLast}
                aria-label="다음 페이지"
              >
                <Icon name="chevron-right" size={24} />
              </button>
            </div>

            <div className={styles.controls}>
              <div className={styles.dots} role="group" aria-label="페이지 선택">
                {PAGES.map((page, i) => (
                  <button
                    key={page.src}
                    type="button"
                    className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                    onClick={() => setCurrent(i)}
                    aria-label={`${i + 1}페이지로 이동`}
                    aria-current={i === current ? 'true' : undefined}
                  />
                ))}
              </div>
              <span className={styles.counter} aria-live="polite">
                {pad(current + 1)} / {PAGE_COUNT}
              </span>
            </div>
          </div>
        </section>

        {/* 4. CTA (Figma PC 3689:28054 / Mobile 3689:28075) */}
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
          primaryHref="/pub/contact/inquiry"
          secondaryLabel="데모 체험하기"
          secondaryHref="/pub/demo/image"
        />
      </div>
    </FrontLayout>
  );
}
