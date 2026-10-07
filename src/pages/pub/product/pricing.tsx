import React, { useState } from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { Section } from '../../../components/core/Section/Section';
import { HeroSection } from '../../../components/domain/Section';
import { Button } from '../../../components/core/Button/Button';
import styles from './pricing.module.scss';

export default function PubProductPricing() {
  const [billing, setBilling] = useState<'annual' | 'monthly'>('annual');

  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        
        {/* Top Hero Section */}
        <HeroSection
          align="left"
          bgImage="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1920"
          eyebrow="PRODUCT PLANS"
          title={
            <>
              합리적인 요금제를<br />
              선택하세요.
            </>
          }
          description="간단한 비식별 작업부터 전문 업무, 기업/기관 맞춤형 구축까지 단계적으로 확장할 수 있습니다."
        />

        {/* Pricing Section */}
        <Section align="center" className={styles.pricingSection}>
          <div className={styles.billingToggle}>
            <div className={styles.toggleTrack}>
              <button 
                className={billing === 'annual' ? styles.active : ''} 
                onClick={() => setBilling('annual')}
              >
                연간 구독
              </button>
              <button 
                className={billing === 'monthly' ? styles.active : ''} 
                onClick={() => setBilling('monthly')}
              >
                월 결제
              </button>
            </div>
          </div>

          <div className={styles.pricingGrid}>
            {/* Basic Plan */}
            <div className={styles.planCard}>
              <div className={styles.planHeader}>
                <h3>OFF2ON Basic</h3>
                <p>비식별화를 시작하는 가장 쉬운 방법</p>
              </div>
              <div className={styles.planPrice}>
                <h2>10일 무료</h2>
                <p>(1,000 Point)</p>
              </div>
              <div className={styles.planFeatures}>
                <ul>
                  <li><span className={styles.check}>✓</span> 자동화 변환된 마스킹</li>
                  <li><span className={styles.check}>✓</span> 얼굴 모자이크</li>
                  <li><span className={styles.check}>✓</span> 얼굴 블러</li>
                  <li><span className={styles.check}>✓</span> 맞춤 마스킹</li>
                  <li><span className={styles.check}>✓</span> 표준 처리속도</li>
                  <li><span className={styles.check}>✓</span> PNG, MP4 내보내기 지원</li>
                </ul>
              </div>
              <Button size="lg" variant="outline" color="neutral" className={styles.outlineBtn}>무료 체험 시작</Button>
            </div>

            {/* Pro Plan */}
            <div className={`${styles.planCard} ${styles.highlight}`}>
              <div className={styles.planHeader}>
                <h3 style={{ color: 'var(--color-primary-600)' }}>OFF2ON Pro</h3>
                <p>전문가용으로 완벽한 선택</p>
              </div>
              <div className={styles.planPrice}>
                <h2>10,000 Point</h2>
                <p>(1 Point = 10원)</p>
              </div>
              <div className={styles.planFeatures}>
                <ul>
                  <li><span className={styles.check}>✓</span> <strong>Basic 기능 포함</strong></li>
                  <li><span className={styles.check}>✓</span> 전신 모자이크, 블러, 마스킹</li>
                  <li><span className={styles.check}>✓</span> 가상 얼굴 변환 지원</li>
                  <li><span className={styles.check}>✓</span> 고속(우선) 처리속도</li>
                  <li><span className={styles.check}>✓</span> 세부 기술지원</li>
                  <li><span className={styles.check}>✓</span> 다양한 포맷으로 저장</li>
                </ul>
              </div>
              <Button size="lg" color="primary" style={{ width: '100%' }}>영업팀 문의</Button>
            </div>

            {/* Enterprise Plan */}
            <div className={styles.planCard}>
              <div className={styles.planHeader}>
                <h3>OFF2ON Enterprise</h3>
                <p>기업용 솔루션</p>
              </div>
              <div className={styles.planPrice}>
                <h2>맞춤형</h2>
                <p>문의하기</p>
              </div>
              <div className={styles.planFeatures}>
                <ul>
                  <li><span className={styles.check}>✓</span> 무제한 처리</li>
                  <li><span className={styles.check}>✓</span> 온프레미스 배포</li>
                  <li><span className={styles.check}>✓</span> 맞춤 템플릿</li>
                  <li><span className={styles.check}>✓</span> 전담 지원팀</li>
                  <li><span className={styles.check}>✓</span> SLA 보장</li>
                  <li><span className={styles.check}>✓</span> 맞춤 교육</li>
                  <li><span className={styles.check}>✓</span> 워터마크별 옵션</li>
                </ul>
              </div>
              <Button size="lg" variant="outline" color="neutral" className={styles.outlineBtn}>영업팀 문의</Button>
            </div>
          </div>
        </Section>

        {/* Inquiry Section */}
        <Section
          layout="horizontal"
          eyebrow="INQUIRY TYPE"
          title={
            <>
              어떤 도움이<br />
              필요한가요?
            </>
          }
          description="문의 목적을 남겨주시면 용도에 맞춰 빠르게 확인할 수 있습니다."
          className={styles.inquirySection}
        >
          <div className={styles.inquiryList}>
            <div className={styles.inquiryCard}>
              <span className={styles.num}>01</span>
              <div className={styles.text}>
                <h4>제품 도입 상담</h4>
                <p>제품 구성, 구축 방식, 가격 등 전반적인 도입 상담</p>
              </div>
              <span className={styles.arrow}>➔</span>
            </div>
            
            <div className={styles.inquiryCard}>
              <span className={styles.num}>02</span>
              <div className={styles.text}>
                <h4>PoC 신청</h4>
                <p>실제 데이터를 활용한 성능 및 사용성 검증 지원 신청</p>
              </div>
              <span className={styles.arrow}>➔</span>
            </div>
            
            <div className={styles.inquiryCard}>
              <span className={styles.num}>03</span>
              <div className={styles.text}>
                <h4>기술 · API 문의</h4>
                <p>기존 시스템 연동 및 기술적인 적용 가능 범위 문의</p>
              </div>
              <span className={styles.arrow}>➔</span>
            </div>
            
            <div className={styles.inquiryCard}>
              <span className={styles.num}>04</span>
              <div className={styles.text}>
                <h4>기타 문의</h4>
                <p>제휴 요청, 협력, 기타 xPrivacy 관련 문의</p>
              </div>
              <span className={styles.arrow}>➔</span>
            </div>
          </div>
        </Section>
        
      </div>
    </FrontLayout>
  );
}
