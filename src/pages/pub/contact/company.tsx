import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { IconSurface } from '../../../components/core/Icon/IconSurface';
import { Button } from '../../../components/core/Button/Button';
import styles from './company.module.scss';

const IMG = '/images/contact/company';

// 주요 연혁 및 수상 (Figma PC 3503:3141 / MO 3503:3496)
const MILESTONES = [
  { year: '2003', title: '월드버텍 설립', body: '인터넷 솔루션 개발 사업 시작' },
  { year: '2021', title: '지식서비스 유공자 표창', body: '산업통상자원부장관' },
  { year: '2024', title: '웹어워드 대상', body: '공공정보서비스 분야' },
];

// 사업 영역 (Figma PC 3545:3411 / MO 3545:3639)
//
// [예외 처리: 시안의 의도적 줄바꿈 `<br className={styles.fitBr} />`]
// - 에듀테크·시스템 구축·운영 카드 요약과 About 본문(출발해,)은 시안이 자연 줄바꿈과 다른 위치에서 일부러 끊었습니다.
//   (자연 줄바꿈이면 "국내외에"가 윗줄로 올라가고 "유지보수·"에서 끊김) 교육 솔루션 카드는 자연 줄바꿈이 시안과 같아 지정하지 않았습니다.
// - 문구가 놓인 칸이 시안 폭(본문 680 · 카드 요약 336) 이상일 때만 적용되고, 좁아지면 해제되어 자연스럽게 이어집니다(company.module.scss `.fitBr`).
// - 문구를 수정할 때: 자연 줄바꿈과 시안 줄 위치가 달라지는지 다시 확인해 `fitBr`을 추가·삭제하세요.
const BUSINESSES = [
  {
    glyph: 'glyph_layers.svg',
    eyebrow: 'Education',
    title: '교육 솔루션',
    summary: (
      <>
        LMS·LCMS·문제은행 등 교육 플랫폼을 개발하고 학습 운영을 지원합니다.
      </>
    ),
    areas: '학습 플랫폼 · 교육 운영 · 문항·콘텐츠',
  },
  {
    glyph: 'glyph_sparkles.svg',
    eyebrow: 'Edu-tech',
    title: '에듀테크',
    summary: (
      <>
        AI를 활용한 화상교육과 학습 지원 서비스를
                  <br className={styles.fitBr} /> 국내외에 제공합니다.
      </>
    ),
    areas: '화상교육 · AI 학습 지원 · 해외 사업',
  },
  {
    glyph: 'glyph_workflow.svg',
    eyebrow: 'SI & SM',
    title: '시스템 구축·운영',
    summary: (
      <>
        고객 환경에 맞는 시스템 구축부터
                  <br className={styles.fitBr} /> 유지보수·위탁운영까지 지원합니다.
      </>
    ),
    areas: '시스템 구축 · 유지보수 · 위탁운영',
  },
];

export default function PubContactCompany() {
  return (
    <FrontLayout>
      <div className={styles.companyPage}>
        {/* 1. Hero (Figma PC 3503:3065 / MO 3503:3390 · 스타일은 contact 카테고리 공통) */}
        <HeroSection
          category="contact"
          heroVariant="compact"
          align="center"
          eyebrow="Company · World Vertex"
          title={
            <>
              사람에 가치를
              <br className="heroMoBr" /> 더하다, 월드버텍
            </>
          }
          description={
            <>
              월드버텍은 사물과 인간에 대한
              <br className="heroMoBr" /> 깊이 있는 생각으로 세상을 바꿉니다.
            </>
          }
        />

        {/* 2. About (Figma PC 3503:3072 / MO 3503:3397) */}
        <BasicSection bg="white" layout="vertical" align="left" className={styles.aboutSection}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>About</p>
            <h2 className={styles.heading}>월드버텍 소개</h2>
          </div>

          <div className={styles.profile}>
            <div className={styles.keyMessage}>
              <p className={styles.eyebrow}>Overview</p>
              <p className={styles.statement}>
                고객과 소통하며,
                <br />
                새로운 가치를 만듭니다.
              </p>
              <p className={styles.expertise}>시스템 구축·운영 전문 기업</p>
            </div>

            <div className={styles.story}>
              <h3 className={styles.storyName}>World Vertex</h3>
              <div className={styles.storyBody}>
                <p>
                  월드버텍은 2003년 인터넷 솔루션 개발
                  <br className="heroMoBr" /> 전문 기업으로 출발해,
                  <br className={styles.fitBr} /> 다양한 개발 경험을
                  <br className="heroMoBr" /> 바탕으로 시스템 구축·운영 전문 기업으로
                  <br className="heroMoBr" /> 성장해 왔습니다.
                </p>
                <p>
                  축적한 기술과 경험으로 고객과 소통하며
                  <br className="heroMoBr" /> 새로운 가치를 만들어 갑니다.
                  <br />
                  개인정보 비식별화·관리 서비스 xPrivacy를
                  <br className="heroMoBr" /> 개발·제공하고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </BasicSection>

        {/* 3. History & Awards (Figma PC 3503:3135 / MO 3503:3490) */}
        <BasicSection bg="white" layout="vertical" align="left" className={styles.historySection}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>History &amp; Awards</p>
            <h2 className={styles.heading}>주요 연혁 및 수상</h2>
          </div>

          <ol className={styles.milestones}>
            {MILESTONES.map((item) => (
              <li key={item.year} className={styles.milestone}>
                <span className={styles.point} aria-hidden="true" />
                <p className={styles.year}>{item.year}</p>
                <div className={styles.milestoneDetail}>
                  <p className={styles.milestoneTitle}>{item.title}</p>
                  <p className={styles.milestoneBody}>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </BasicSection>

        {/* 4. Business Portfolio (Figma PC 3541:3409 / MO 3541:3414) */}
        <BasicSection bg="gray" layout="vertical" align="left" className={styles.businessSection}>
          <div className={`${styles.intro} ${styles.introWide}`}>
            <p className={styles.eyebrow}>Business Portfolio</p>
            <h2 className={styles.heading}>월드버텍의 사업 영역</h2>
            <p className={styles.note}>교육 솔루션과 에듀테크, 시스템 구축·운영 서비스를 제공합니다.</p>
          </div>

          <ul className={styles.businessList}>
            {BUSINESSES.map((biz) => (
              <li key={biz.title} className={styles.businessCard}>
                <div className={styles.businessHead}>
                  <IconSurface src={`${IMG}/${biz.glyph}`} size={64} sizeMo={48} glyphFit="fill" />
                  <div className={styles.businessCopy}>
                    <p className={styles.businessEyebrow}>{biz.eyebrow}</p>
                    <h3 className={styles.businessTitle}>{biz.title}</h3>
                  </div>
                </div>
                <div className={styles.businessContent}>
                  <p className={styles.businessSummary}>{biz.summary}</p>
                  <p className={styles.businessAreas}>{biz.areas}</p>
                </div>
              </li>
            ))}
          </ul>
        </BasicSection>

        {/* 5. Explore World Vertex (Figma PC 3537:3525 / MO 3537:3538) */}
        <BasicSection bg="transparent" layout="vertical" align="left" className={styles.exploreSection}>
          <div className={styles.explore}>
            <div className={styles.exploreCopy}>
              <p className={styles.eyebrow}>EXPLORE WORLD VERTEX</p>
              <h2 className={styles.heading}>
                월드버텍에 대해
                <br className="heroMoBr" /> 더 알아보세요
              </h2>
              <p className={styles.note}>
                회사소개서와 기업 홈페이지에서
                <br className="heroMoBr" /> 사업과 주요 이력을 확인할 수 있습니다.
              </p>
            </div>
            <div className={styles.exploreLinks}>
              <Button type="button" variant="solid" color="primary" size="xl" className={styles.exploreButton}>
                회사소개서(PDF) ↗
              </Button>
              <Button type="button" variant="subtle" bordered size="xl" className={styles.exploreButton}>
                기업 홈페이지 ↗
              </Button>
            </div>
          </div>
        </BasicSection>
      </div>
    </FrontLayout>
  );
}
