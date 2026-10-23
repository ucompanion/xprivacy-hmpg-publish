import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { ProductCta } from './sections/ProductCta';
import styles from './certification.module.scss';

const IMG = '/images/product/certification';

interface PatentMeta {
  country: string;
  regNumber: string;
  regDate: string;
}

interface PatentItem {
  id: string;
  shortTitle: string;
  officialName: string;
  image: string;
  secondaryImage?: string;
  alt: string;
  meta: PatentMeta[];
}

const PATENT_ITEMS: PatentItem[] = [
  {
    id: 'patent-1',
    shortTitle: 'CCTV 영상 객체 비식별화',
    officialName: 'CCTV 영상에서의 인식 객체에 대한 비식별화 시스템',
    image: `${IMG}/patent_kr_10-2691400.jpg`,
    alt: '특허증 · 대한민국 제10-2691400호',
    meta: [
      {
        country: '대한민국',
        regNumber: '제10-2691400호',
        regDate: '2024.07.30',
      },
    ],
  },
  {
    id: 'patent-2',
    shortTitle: '멀티모달 AI 개인정보 인식 · 통합 관리',
    officialName:
      '멀티모달 인공지능 기반 개인정보 인식 및 주체 별 통합 관리 시스템, 그 통합 관리 방법 및 그 방법을 기록한 비일시적 컴퓨터 판독 가능 기록매체',
    image: `${IMG}/patent_kr_10-2974152.jpg`,
    alt: '특허증 · 대한민국 제10-2974152호',
    meta: [
      {
        country: '대한민국',
        regNumber: '제10-2974152호',
        regDate: '2026.06.02',
      },
    ],
  },
  {
    id: 'patent-3',
    shortTitle: '비정형 데이터 개인정보 탐지 · 위험도 측정',
    officialName: '비정형 데이터로부터 개인정보를 탐지하고 노출 위험도를 측정하는 방법',
    image: `${IMG}/patent_kr_10-2533008.jpg`,
    alt: '특허증 · 대한민국 제10-2533008호',
    meta: [
      {
        country: '대한민국',
        regNumber: '제10-2533008호',
        regDate: '2023.05.11',
      },
    ],
  },
  {
    id: 'patent-4',
    shortTitle: 'AI 화상교육 시스템',
    officialName: '인공지능 기술을 활용한 화상교육 시스템 및 학습 지원 방법',
    image: `${IMG}/patent_jp_7106159.jpg`,
    alt: '특허증 · 일본 제7106159호',
    meta: [
      {
        country: '일본',
        regNumber: '제7106159호',
        regDate: '2022.07.15',
      },
    ],
  },
  {
    id: 'patent-5',
    shortTitle: '딥러닝 식물 분류',
    officialName: '딥 러닝을 이용한 식물 분류 시스템 및 그 방법',
    image: `${IMG}/patent_kr_10-2155138.jpg`,
    alt: '특허증 · 대한민국 제10-2155138호',
    meta: [
      {
        country: '대한민국',
        regNumber: '제10-2155138호',
        regDate: '2020.09.07',
      },
    ],
  },
  {
    id: 'patent-6',
    shortTitle: '수학문제 개념유형 예측',
    officialName:
      '신경망 기반 기계번역 및 셈뭉치를 이용한 수학문제 개념유형 예측 서비스 제공 방법',
    image: `${IMG}/patent_kr_10-1986721.jpg`,
    secondaryImage: `${IMG}/patent_jp_6845486.jpg`,
    alt: '특허증 · 대한민국 제10-1986721호 및 일본 제6845486호',
    meta: [
      {
        country: '대한민국',
        regNumber: '제10-1986721호',
        regDate: '2019.05.31',
      },
      {
        country: '일본',
        regNumber: '제6845486호',
        regDate: '2021.03.02',
      },
    ],
  },
];

export default function PubSubProductCertification() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        
        {/* 1. Hero / 인증 및 특허 (Figma PC 2159:14329 / Mobile 2159:14444) */}
        <HeroSection
          heroVariant="compact"
          eyebrow="CERTIFICATION"
          title="인증 및 특허"
          description="개인정보 비식별 기술을 중심으로 월드버텍이 등록한 특허를 소개합니다."
        />

        {/* 2. 특허 목록 (Figma PC 2159:14337 / Mobile 2159:14452) */}
        <BasicSection bg="white" aria-label="특허 목록">
          <div className={styles.patentList}>
            {PATENT_ITEMS.map((item) => (
              <article key={item.id} className={styles.patent}>
                {/* 특허증: 1장은 가운데, 2장은 뒤(해외)·앞(국내) 겹침 */}
                <div className={`${styles.certificate} ${item.secondaryImage ? styles.dual : ''}`}>
                  {item.secondaryImage && (
                    <img src={item.secondaryImage} alt={`${item.alt} (일본)`} className={`${styles.certImg} ${styles.certBack}`} />
                  )}
                  <img src={item.image} alt={item.alt} className={`${styles.certImg} ${item.secondaryImage ? styles.certFront : ''}`} />
                </div>

                <div className={styles.description}>
                  <h3 className={styles.shortTitle}>{item.shortTitle}</h3>
                  <p className={styles.officialName}>{item.officialName}</p>
                  {item.meta.map((m) => (
                    <dl key={m.regNumber} className={styles.registration}>
                      <div className={styles.regRow}>
                        <dt>국가</dt>
                        <dd>{m.country}</dd>
                      </div>
                      <div className={styles.regRow}>
                        <dt>등록번호</dt>
                        <dd>{m.regNumber}</dd>
                      </div>
                      <div className={styles.regRow}>
                        <dt>등록일</dt>
                        <dd>{m.regDate}</dd>
                      </div>
                    </dl>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </BasicSection>

        {/* 3. Section CTA */}
        <ProductCta
          eyebrow="GET STARTED"
          title={
            <>
              업무 환경에 맞는 서비스를<br />
              직접 확인해보세요
            </>
          }
          description="무료 체험으로 제품을 먼저 확인해보고 지금 바로 비즈니스에 맞는 도입 방식을 선택할 수 있습니다."
          solidButtonText="도입 문의하기"
          outlineButtonText="데모 체험하기"
        />

      </div>
    </FrontLayout>
  );
}
