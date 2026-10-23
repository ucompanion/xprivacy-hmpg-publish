import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { BasicSection } from '../../../components/domain/Section';
import { Button } from '../../../components/core/Button/Button';
import styles from './pseudonymization-guide.module.scss';

interface SourceLink {
  label: string;
  href: string;
}

const DEFINITION_SOURCES: SourceLink[] = [
  { label: '개인정보 보호법 제2조', href: 'https://law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=900040612' },
  { label: '제28조의2', href: 'https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1029334921' },
];

const PROCESS_SOURCES: SourceLink[] = [
  { label: '개인정보보호위원회 가명정보 안내', href: 'https://pipc.go.kr/np/default/page.do?mCode=D040010000' },
  { label: '2026년 가이드라인 개정 안내', href: 'https://www.privacy.go.kr/front/bbs/bbsView.do?bbsNo=BBSMSTR_000000000049&bbscttNo=20877' },
];

const XPRIVACY_SOURCES: SourceLink[] = [{ label: 'xPrivacy 제품 소개', href: 'https://xprivacy.io/' }];

// 처리 전에 확인할 세 가지 (Figma PC 1218:15069)
const CHECK_CARDS = [
  { num: '01', title: '왜 활용하나요?', desc: '자료를 사용하는 목적과 필요한 범위를 먼저 정합니다.' },
  {
    num: '02',
    title: <>누가, 어떤 환경에서<br />사용하나요?</>,
    desc: <>내부 활용인지 외부 제공인지,<br />이용 환경을 함께 검토합니다.</>,
  },
  {
    num: '03',
    title: <>무엇으로 사람을<br />알아볼 수 있나요?</>,
    desc: <>얼굴 외에도 복장, 주변 장면, 화면 속<br />문자 등 자료에 남은 단서를 살펴봅니다.</>,
  },
];

// 가명처리 다섯 단계 (Figma PC 1218:15076)
const PROCESS_STEPS = [
  { num: '01', title: '사전준비' },
  { num: '02', title: '위험성 검토' },
  { num: '03', title: '가명처리' },
  { num: '04', title: '적정성 검토' },
  { num: '05', title: '안전한 관리' },
];

/** 출처 표시: "출처"(primary) → 8 → 링크들(· 구분) */
function SourceLabel({ links }: { links: SourceLink[] }) {
  return (
    <p className={styles.source}>
      <span className={styles.sourceLabel}>출처</span>
      <span>
        {links.map((link, idx) => (
          <Fragment key={link.href}>
            {idx > 0 && ' · '}
            <a href={link.href} target="_blank" rel="noreferrer" className={styles.sourceLink}>
              {link.label}
            </a>
          </Fragment>
        ))}
      </span>
    </p>
  );
}

export default function PubContactPseudonymizationGuide() {
  const navigate = useNavigate();

  return (
    <FrontLayout>
      <div className={styles.guidePage}>
        {/* 1. Hero Section */}
        <BasicSection
          bg="gray"
          theme="light"
          layout="vertical"
          align="left"
          eyebrow={<span className={styles.heroEyebrow}>PSEUDONYMIZATION GUIDE</span>}
          title="영상·이미지 가명처리, 시작 전 확인할 것"
          description={
            <>
              영상이나 이미지 정보의 얼굴을 가린다고 해서 모든 개인정보 식별 가능성이 해결되는 것은 아닙니다.
              <br />
              가명처리 영상 목적과 적용 환경, 화면에 남는 식별 인자를 함께 확인해야 합니다.
            </>
          }
        />

        {/* 2. 가명정보란 (Figma PC 1218:15062 · 초안) */}
        <BasicSection
          bg="white"
          layout="vertical"
          align="left"
          eyebrow="DEFINITION"
          title="가명정보란 무엇인가요?"
          description="가명정보는 추가정보의 사용·결합 없이는 특정 개인을 알아볼 수 없도록 가명처리한 개인정보입니다. 「개인정보 보호법」은 통계작성, 과학적 연구, 공익적 기록보존 등을 위한 가명정보 처리에 관한 규정을 두고 있습니다. 이 규정이 모든 영상 활용이나 공개를 일괄 허용한다는 뜻은 아닙니다."
        >
          {/* 섹션 콘텐츠 첫 요소의 margin은 0으로 고정되므로 한 겹 감싸 간격(24)을 조정 */}
          <div className={styles.sourceWrap}>
            <SourceLabel links={DEFINITION_SOURCES} />
          </div>
        </BasicSection>

        {/* 3. 처리 전에 확인할 세 가지 (Figma PC 1218:15067 · 초안) */}
        <BasicSection bg="gray" layout="vertical" align="left" eyebrow="CHECKLIST" title="처리 전에 확인할 세 가지">
          <ul className={styles.checkCards}>
            {CHECK_CARDS.map((card) => (
              <li key={card.num} className={styles.checkCard}>
                <span className={styles.checkNum}>{card.num}</span>
                <h3 className={styles.checkTitle}>{card.title}</h3>
                <p className={styles.checkDesc}>{card.desc}</p>
              </li>
            ))}
          </ul>
        </BasicSection>

        {/* 4. 가명처리 다섯 단계 (Figma PC 1218:15073 · 초안) */}
        <BasicSection
          bg="white"
          layout="vertical"
          align="left"
          eyebrow="PROCESS"
          title="가명처리는 다섯 단계로 살펴봅니다"
          description="개인정보보호위원회의 가명처리 절차 안내에 따른 개요입니다. 실제 검토 방법은 자료와 활용 환경에 따라 달라질 수 있습니다."
        >
          <div className={styles.flowGroup}>
            <ol className={styles.flow}>
              {PROCESS_STEPS.map((step, idx) => (
                <Fragment key={step.num}>
                  {idx > 0 && (
                    <li className={styles.flowArrow} aria-hidden="true">
                      <img src="/images/contact/icon_chevron_right_gray.svg" alt="" />
                    </li>
                  )}
                  <li className={styles.flowStep}>
                    <span className={styles.flowNum}>{step.num}</span>
                    <span className={styles.flowTitle}>{step.title}</span>
                  </li>
                </Fragment>
              ))}
            </ol>
            <SourceLabel links={PROCESS_SOURCES} />
          </div>
        </BasicSection>

        {/* 5. xPrivacy 활용 범위 (Figma PC 1218:15103 · 초안) */}
        <BasicSection
          bg="gray"
          layout="vertical"
          align="left"
          eyebrow="XPRIVACY"
          title="xPrivacy는 어디에 활용할 수 있나요?"
          description="xPrivacy는 이미지·영상의 얼굴, 신체, 번호판에 모자이크·마스킹·블러 등을 적용하는 기능을 소개하고 있습니다. 이는 영상 처리 작업을 돕는 기능 설명이지, 처리 결과의 법적 적정성이나 모든 식별 단서의 제거를 보증한다는 의미는 아닙니다. 필요한 대상과 처리 방식을 정하고 결과를 확인하는 절차는 별도로 검토해야 합니다."
        >
          {/* 섹션 콘텐츠 첫 요소의 margin은 0으로 고정되므로 한 겹 감싸 간격(24)을 조정 */}
          <div className={styles.sourceWrap}>
            <SourceLabel links={XPRIVACY_SOURCES} />
          </div>
        </BasicSection>

        {/* 6. 다음 행동 (Figma PC 1218:15108 · 초안) */}
        <BasicSection bg="white" layout="vertical" align="left">
          <div className={styles.nextBox}>
            <div className={styles.nextText}>
              <p className={styles.nextTitle}>영상·이미지 처리 방식이 궁금하신가요?</p>
              <p className={styles.nextDesc}>활용 목적과 자료 유형에 맞는 제품 도입 방식을 문의해 주세요.</p>
            </div>
            <Button
              variant="solid"
              color="primary"
              size="xl"
              className={styles.nextButton}
              onClick={() => void navigate('/pub/contact/inquiry')}
            >
              도입 방식 문의하기
            </Button>
          </div>
        </BasicSection>

        {/* 7. 일반 안내 (Figma PC 1218:15114 · 초안 · 위 여백 없음) */}
        <BasicSection bg="white" layout="vertical" align="left" className={styles.noticeSection}>
          <div className={styles.notice}>
            <p className={styles.noticeText}>
              이 페이지는 제도 이해를 돕기 위한 일반 안내입니다. 개별 자료의 가명정보 해당 여부와 처리·제공 가능 여부는 구체적인 목적, 자료, 이용 환경을 바탕으로 확인해야 합니다.
            </p>
            <p className={styles.noticeDate}>정보 확인일: 2026.09.30</p>
          </div>
        </BasicSection>
      </div>
    </FrontLayout>
  );
}
