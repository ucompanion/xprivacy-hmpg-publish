import React from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection } from '../../../components/domain/Section';
import { ProductCta } from './sections/ProductCta';
import styles from './certification.module.scss';

const PATENT_LIST = [
  {
    num: '01',
    title: 'CCTV 영상에서의 인식 개체에 대한 비식별화 시스템',
  },
  {
    num: '02',
    title: '멀티모달 인공지능 기반 개인정보 인식 및 주체 별 통합 관리 시스템, 그 통합 관리 방법 및 그 방법을 기록한 비일시적 컴퓨터 판독 가능 기록매체',
  },
  {
    num: '03',
    title: '비정형 데이터로부터 개인정보를 탐지하고 노출 위험도를 측정하는 방법',
  },
  {
    num: '04',
    title: '인공지능 기술을 활용한 화상교육 시스템 및 학습 지원 방법',
  },
  {
    num: '05',
    title: '딥 러닝을 이용한 식물 분류 시스템 및 그 방법',
  },
  {
    num: '06',
    title: '신경망 기반 기계번역 및 샘플치를 이용한 수학문제 개념유형 예측 서비스 제공 방법',
  },
];

export default function PubSubProductCertification() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        
        {/* Top Hero Section */}
        <HeroSection
          className={styles.certHero}
          align="left"
          bgImage="/images/pub/product/cert_hero_bg.jpg"
          eyebrow="CERTIFICATION"
          title="인증 및 특허"
          description={
            <>
              탐지 누락(FN)은 곧 개인정보 유출입니다.<br className="mobile-only" />
              {' '}재현율을 최우선으로 튜닝했습니다.
            </>
          }
        />

        {/* Content Section (Certificates + Patents) */}
        <section className={styles.contentSection}>
          <div className={styles.container}>
            
            {/* 1. Certificates Gallery Card */}
            <div className={styles.certGalleryCard}>
              <div className={styles.galleryInner}>
                <div className={styles.galleryRowTop}>
                  <div className={styles.certItem}>
                    <img src="/images/pub/product/cert_1.png" alt="특허증 1" />
                  </div>
                  <div className={styles.certItem}>
                    <img src="/images/pub/product/cert_2.png" alt="특허증 2" />
                  </div>
                  <div className={styles.certItem}>
                    <img src="/images/pub/product/cert_3.png" alt="특허증 3" />
                  </div>
                  <div className={styles.certItem}>
                    <img src="/images/pub/product/cert_4.png" alt="특허증 4" />
                  </div>
                </div>
                <div className={styles.galleryRowBottom}>
                  <div className={styles.certItem}>
                    <img src="/images/pub/product/cert_5.png" alt="특허증 5" />
                  </div>
                  <div className={styles.certItem}>
                    <img src="/images/pub/product/cert_6.png" alt="특허증 6" />
                  </div>
                  <div className={styles.certItem}>
                    <img src="/images/pub/product/cert_7.png" alt="특허증 7" />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Patents Grid / List */}
            <div className={styles.patentGrid}>
              {PATENT_LIST.map((item) => (
                <div key={item.num} className={styles.patentCard}>
                  <span className={styles.num}>{item.num}</span>
                  <h4>{item.title}</h4>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Bottom CTA Section */}
        <ProductCta
          eyebrow="GET STARTED"
          title={
            <>
              업무 환경에 맞는 xPrivacy를<br />
              직접 확인해보세요
            </>
          }
          description="무료 체험으로 제품을 먼저 확인하거나 기관·기업 환경에 맞는 도입 방식을 상담할 수 있습니다."
          solidButtonText="무료 체험 시작"
          outlineButtonText="도입 문의"
        />
        
      </div>
    </FrontLayout>
  );
}
