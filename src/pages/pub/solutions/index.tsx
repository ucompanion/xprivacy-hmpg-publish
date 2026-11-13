import { useNavigate } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection, CtaSection } from '../../../components/domain/Section';
import { Button } from '../../../components/core/Button/Button';
import styles from './index.module.scss';

const IMG = '/images/solutions';

interface Solution {
  /** 푸터 메뉴 앵커 (/pub/solutions#id) */
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  useCases: string[];
  /** 처리 대상 · 권장 방식 · 관련 기능 (+ 도입 방식) */
  meta: { key: string; value: string }[];
  button: string;
  image: string;
  alt: string;
}

// 산업군별 솔루션 8종 (Figma PC 3839:43 ~ 3839:210 · 홀수 이미지 왼쪽 / 짝수 이미지 오른쪽)
//
// [예외 처리: 시안의 의도적 줄바꿈 `<br className="splitPcBr" />` / 제목 `<br className="splitBr" />`]
// - 설명 문구는 시안이 한 줄 폭(560)에 여유가 있는데도 일부러 짧게 나눠 3줄 안팎으로 균형을 잡았습니다.
//   자연 줄바꿈에 맡기면 줄 위치와 섹션 높이(866/894/930)가 시안과 달라지므로 줄바꿈을 직접 지정합니다.
// - 2단 구조 공통 정책: 이 줄바꿈은 시안 폭(PC 1280 이상)에서만 적용되고, 열이 줄어드는 1280 미만부터는 해제되어
//   keep-all 자연 줄바꿈으로 이어집니다. (`src/assets/scss/_utilities.scss`의 `.splitBr` · `.splitPcBr`)
// - 문구를 수정할 때: 줄바꿈 위치를 함께 확인하세요. 시안이 줄바꿈 없이 바뀌면 해당 `<br>`만 지우면 됩니다.
const SOLUTIONS: Solution[] = [
  {
    id: 'broadcasting',
    eyebrow: 'BROADCAST',
    title: (
      <>
        개인정보 보호 때문에
        <br className="splitBr" />
        영상의 가치를 포기하지 마세요
      </>
    ),
    description: (
      <>
        예능·다큐멘터리·뉴스 등 촬영 과정에서 포함된 인물과
        <br className="splitPcBr" /> 개인정보를 선택적으로 처리해 후반 작업 부담을 줄일 수 있습니다.
      </>
    ),
    useCases: [
      '거리 인터뷰·현장 취재 영상의 일반인 얼굴 처리',
      '출연자는 남기고 배경 속 인물만 비식별',
      '방송 송출 전 번호판·간판 등 노출 정보 정리',
    ],
    meta: [
      { key: '처리 대상', value: '얼굴, 전신, 번호판' },
      { key: '권장 방식', value: '블러, 선택 인물 해제, 구간 추적' },
      { key: '관련 기능', value: '영상 비식별 · 스마트 추적 · Smart Editor' },
    ],
    button: '방송 영상 비식별하기',
    image: 'broadcast.jpg',
    alt: '방송 영상 비식별 편집 화면',
  },
  {
    id: 'cctv',
    eyebrow: 'CCTV',
    title: (
      <>
        CCTV 열람과 영상 반출 업무를
        <br className="splitBr" />
        더 안전하고 효율적으로
      </>
    ),
    description: (
      <>
        건물·매장·아파트·물류센터 등 시설 CCTV 영상을 열람하거나
        <br className="splitPcBr" /> 외부에 제공할 때, 화면에 함께 찍힌 제3자의 개인정보를
        <br className="splitPcBr" /> 빠르게 찾아 처리합니다.
      </>
    ),
    useCases: ['사건·사고 영상 열람 요청 대응', '보험·분쟁 처리를 위한 영상 제공', '시설 보안 점검 영상의 외부 공유'],
    meta: [
      { key: '처리 대상', value: '얼굴, 전신, 번호판' },
      { key: '권장 방식', value: '모자이크, 마스킹' },
      { key: '관련 기능', value: '영상 비식별 · 대량·병렬 처리 · 스마트 추적' },
    ],
    button: 'CCTV 영상 비식별하기',
    image: 'cctv.jpg',
    alt: 'CCTV 영상 모자이크 처리 예시',
  },
  {
    id: 'smart-city',
    eyebrow: 'SMART CITY',
    title: (
      <>
        도시 영상 데이터를
        <br className="splitBr" />
        안전하게 분석하고 공유하세요
      </>
    ),
    description: (
      <>
        교통·안전·도시 운영에 쓰이는 영상에서 시민의 얼굴과
        <br className="splitPcBr" /> 차량 번호판을 비식별해, 개인정보 노출 걱정 없이
        <br className="splitPcBr" /> 데이터를 분석하고 기관 간에 공유할 수 있습니다.
      </>
    ),
    useCases: [
      '교통 흐름·보행 분석용 영상 데이터 정리',
      '도시 안전 모니터링 영상의 기관 간 공유',
      '모빌리티·주행 데이터의 연구 활용',
    ],
    meta: [
      { key: '처리 대상', value: '얼굴, 전신, 번호판' },
      { key: '권장 방식', value: '블러, 가상 얼굴' },
      { key: '관련 기능', value: '영상 비식별 · 대량·병렬 처리 · Virtual Face' },
    ],
    button: '도시 영상 비식별하기',
    image: 'smart-city.jpg',
    alt: '도시 영상 블러 처리 예시',
  },
  {
    id: 'public-institutions',
    eyebrow: 'PUBLIC SECTOR',
    title: (
      <>
        정보공개청구·수사협조·민원 대응
        <br className="splitBr" />
        영상을 빠르게 처리하세요
      </>
    ),
    description: (
      <>
        정보공개청구, 민원 대응, 수사 협조 등으로 영상 반출 수요가
        <br className="splitPcBr" /> 증가하는 환경에서 반복적인 비식별 작업과 검수 부담을
        <br className="splitPcBr" /> 줄일 수 있습니다.
      </>
    ),
    useCases: [
      '정보공개청구 영상의 제3자 개인정보 처리',
      '수사기관 협조 요청 영상 반출',
      '관제센터 CCTV 영상 반출·이력 관리',
    ],
    meta: [
      { key: '처리 대상', value: '얼굴, 전신, 번호판' },
      { key: '권장 방식', value: '모자이크, 마스킹, 검수 후 반출' },
      { key: '관련 기능', value: '영상 비식별 · 스마트 추적 · Security' },
      { key: '도입 방식', value: '내부망 On-Premise 구축' },
    ],
    button: '반출 영상 비식별하기',
    image: 'public-sector.jpg',
    alt: '공공기관 영상 비식별 작업 공간',
  },
  {
    id: 'ai-data',
    eyebrow: 'AI DATA',
    title: (
      <>
        개인정보는 보호하고
        <br className="splitBr" />
        데이터의 활용 가능성은 높입니다
      </>
    ),
    description: (
      <>
        AI 학습 데이터에 포함된 개인정보를 탐지하고 비식별해
        <br className="splitPcBr" /> 안전한 데이터 활용과 재사용을 지원합니다.
      </>
    ),
    useCases: [
      '비전 AI 학습용 이미지·영상 데이터셋 구축',
      '외부 기관·협력사와의 데이터 공유',
      '수집 데이터의 재가공·재사용',
    ],
    meta: [
      { key: '처리 대상', value: '얼굴, 전신, 번호판' },
      { key: '권장 방식', value: '가상 얼굴, 대량 처리' },
      { key: '관련 기능', value: 'Virtual Face · 대량·병렬 처리 · 이미지 비식별' },
    ],
    button: '학습 데이터 비식별하기',
    image: 'ai-data.jpg',
    alt: 'AI 학습 데이터 개인정보 탐지 예시',
  },
  {
    id: 'finance',
    eyebrow: 'FINANCE',
    title: (
      <>
        영업점 CCTV 영상,
        <br className="splitBr" />
        고객 정보까지 안전하게
      </>
    ),
    description: (
      <>
        영업점과 ATM에서 촬영된 영상을 제공하거나 검토할 때,
        <br className="splitPcBr" /> 다른 고객의 얼굴과 화면에 비친 정보를 비식별해
        <br className="splitPcBr" /> 안전하게 활용할 수 있습니다.
      </>
    ),
    useCases: [
      '고객 민원·분쟁 처리를 위한 영상 제공',
      '금융사고 조사 영상의 외부 기관 제출',
      '내부 감사·보안 점검 영상 검토',
    ],
    meta: [
      { key: '처리 대상', value: '얼굴, 전신' },
      { key: '권장 방식', value: '모자이크, 마스킹' },
      { key: '관련 기능', value: '영상 비식별 · 이미지 비식별 · Security' },
      { key: '도입 방식', value: '내부망 On-Premise 구축' },
    ],
    button: '영업점 영상 비식별하기',
    image: 'finance.jpg',
    alt: '금융 영업점 영상 모자이크 처리 예시',
  },
  {
    id: 'manufacturing',
    eyebrow: 'MANUFACTURING',
    title: (
      <>
        현장 영상을 작업자 개인정보
        <br className="splitBr" />
        걱정 없이 활용하세요
      </>
    ),
    description: (
      <>
        생산 라인과 작업 현장에서 촬영된 영상을 안전 교육,
        <br className="splitPcBr" /> 공정 분석, 비전 AI 개발에 활용할 때 작업자의 얼굴을
        <br className="splitPcBr" /> 비식별해 활용 범위를 넓힙니다.
      </>
    ),
    useCases: ['안전 교육·사고 분석 영상 제작', '공정 개선을 위한 현장 영상 분석', '비전 AI 학습 데이터 구축과 협력사 공유'],
    meta: [
      { key: '처리 대상', value: '얼굴, 전신' },
      { key: '권장 방식', value: '블러, 가상 얼굴' },
      { key: '관련 기능', value: '영상 비식별 · Virtual Face · 대량·병렬 처리' },
    ],
    button: '현장 영상 비식별하기',
    image: 'manufacturing.jpg',
    alt: '제조 현장 영상 블러 처리 예시',
  },
  {
    id: 'medical',
    eyebrow: 'HEALTHCARE',
    title: (
      <>
        환자와 방문객의 얼굴을 보호하며
        <br className="splitBr" />
        의료 영상을 활용하세요
      </>
    ),
    description: (
      <>
        병원 CCTV, 진료·교육 영상, 의료 AI 연구 데이터에 포함된
        <br className="splitPcBr" /> 환자와 방문객의 얼굴을 비식별해 내부 공유와
        <br className="splitPcBr" /> 연구 활용을 지원합니다.
      </>
    ),
    useCases: ['병원 시설 CCTV 영상 열람·제공', '의료진 교육용 영상 제작', '의료 AI 연구용 이미지·영상 데이터 구축'],
    meta: [
      { key: '처리 대상', value: '얼굴, 전신' },
      { key: '권장 방식', value: '블러, 가상 얼굴' },
      { key: '관련 기능', value: '이미지 비식별 · 영상 비식별 · Virtual Face' },
      { key: '도입 방식', value: '내부망 On-Premise 구축' },
    ],
    button: '의료 영상 비식별하기',
    image: 'healthcare.jpg',
    alt: '의료 영상 블러 처리 예시',
  },
];

export default function PubSolutions() {
  const navigate = useNavigate();

  return (
    <FrontLayout>
      <div className={styles.solutionsPage}>
        {/* 1. Hero (Figma PC 3839:4) */}
        <HeroSection
          category="solutions"
          heroVariant="compact"
          align="center"
          className={styles.hero}
          eyebrow="SOLUTIONS"
          title={
            <>
              다양한 업무 환경에서
              <br />
              개인정보를 안전하게 활용하세요
            </>
          }
          description={
            <>
              영상과 이미지가 활용되는 다양한 업무 환경에서 개인정보 보호와 데이터 활용을
        <br className={styles.fitBr} /> 함께 고려할 수 있도록 xPrivacy가 비식별 업무를 지원합니다.
            </>
          }
        />

        {/* 2. Overview · 상단 CTA (Figma PC 3846:233) */}
        <BasicSection bg="white" layout="vertical" align="left" className={styles.overviewSection}>
          <div className={styles.overview}>
            <div className={styles.overviewCopy}>
              <p className={styles.eyebrow}>SOLUTION OVERVIEW</p>
              <h2 className={styles.heading}>업무는 달라도 개인정보 보호의 문제는 같습니다</h2>
              <p className={styles.note}>보호가 필요한 영역을 정확하게 찾아 안전하게 처리하세요.</p>
            </div>
            <div className={styles.overviewButtons}>
              <Button type="button" variant="solid" color="primary" size="xl" className={styles.overviewPrimary} onClick={() => void navigate('/pub/product/intro')}>
                무료 체험 시작
              </Button>
              <Button type="button" variant="subtle" bordered size="xl" className={styles.overviewSecondary} onClick={() => void navigate('/pub/contact/inquiry')}>
                Enterprise 도입 문의
              </Button>
            </div>
          </div>
        </BasicSection>

        {/* 3. 산업군별 솔루션 8종 */}
        {SOLUTIONS.map((item, index) => (
          <BasicSection
            key={item.id}
            id={item.id}
            bg={index % 2 === 0 ? 'gray' : 'white'}
            layout="vertical"
            align="left"
            className={`${styles.solutionSection} ${index % 2 === 1 ? styles.reverse : ''}`}
          >
            <div className={styles.solution}>
              <div className={styles.solutionImage}>
                <img src={`${IMG}/${item.image}`} alt={item.alt} loading="lazy" />
              </div>

              <div className={styles.solutionText}>
                <div className={styles.head}>
                  <p className={styles.eyebrow}>{item.eyebrow}</p>
                  <h2 className={styles.heading}>{item.title}</h2>
                  <p className={styles.description}>{item.description}</p>
                </div>

                <div className={styles.useCases}>
                  <p className={styles.useLabel}>이런 업무에 씁니다</p>
                  <ul className={styles.useList}>
                    {item.useCases.map((text) => (
                      <li key={text}>· {text}</li>
                    ))}
                  </ul>
                </div>

                <dl className={styles.meta}>
                  {item.meta.map((row) => (
                    <div key={row.key} className={styles.metaRow}>
                      <dt>{row.key}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <Button type="button" variant="solid" color="primary" size="xl" className={styles.solutionButton} onClick={() => void navigate('/pub/product/intro')}>
                  {item.button}
                </Button>
              </div>
            </div>
          </BasicSection>
        ))}

        {/* 4. CTA (Figma PC 3839:278) */}
        <CtaSection
          eyebrow="GET STARTED"
          title={
            <>
              업무 환경에 맞는 xPrivacy를
              <br />
              직접 확인해보세요
            </>
          }
          description="간단한 기능 체험부터 기업·기관 맞춤형 도입 상담까지 필요한 방식으로 시작할 수 있습니다."
          primaryLabel="무료 체험 시작"
          primaryHref="/pub/product/intro"
          secondaryLabel="Enterprise 도입 문의"
          secondaryHref="/pub/contact/inquiry"
        />
      </div>
    </FrontLayout>
  );
}
