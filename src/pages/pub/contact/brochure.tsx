import { useNavigate } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { BasicSection } from '../../../components/domain/Section';
import { Button } from '../../../components/core/Button/Button';
import styles from './brochure.module.scss';

// 자료 메타 항목 (Figma PC 1031:226)
const META_ITEMS = ['언어', '파일 형식', '파일 크기', '버전', '업데이트 날짜'];

// 제공 방식 안 (Figma PC 1031:254)
const DELIVERY_OPTIONS = [
  {
    key: 'A',
    title: '바로 다운로드',
    desc: '자료 카드의 버튼에서 파일을 바로 제공하는 방식입니다. 별도 입력 화면은 필요하지 않습니다.',
  },
  {
    key: 'B',
    title: '신청 후 제공',
    desc: '신청 정보를 받은 뒤 자료를 전달하는 방식입니다. 신청 폼, 개인정보 처리 안내, 완료 상태 화면이 추가로 필요합니다.',
  },
];

export default function PubContactBrochure() {
  const navigate = useNavigate();

  return (
    <FrontLayout>
      <div className={styles.brochurePage}>
        {/* 1. Hero Section */}
        <BasicSection
          bg="gray"
          theme="light"
          layout="vertical"
          align="left"
          className={styles.heroCustomWrap}
          eyebrow={
            <>
              <div className={styles.heroBadges}>
                <span className={styles.badgeDraft}>DRAFT : 검토용 초안</span>
                <span className={styles.badgeDraftAlt}>임시 제목</span>
              </div>
              <span className={styles.heroEyebrow}>BROCHURE</span>
            </>
          }
          title="xPrivacy 자료"
          description="(임시 문구) 공개 승인된 자료가 확정되면 이 페이지에서 배포합니다. 자료 수준과 제공 방식은 아직 결정 전입니다."
        />

        {/* 2. 자료 목록 (Figma PC 1031:209 · 초안) */}
        <BasicSection
          bg="white"
          layout="vertical"
          align="left"
          eyebrow="MATERIALS"
          title="자료 목록"
          description="자료 개수(1개 / 여러 개)가 정해지면 카드 수가 달라집니다. 아래는 가변형 자료 카드 예시입니다."
        >
          <div className={styles.materialList}>
            <article className={styles.materialCard}>
              <div className={styles.coverSlot}>
                <p className={styles.coverText}>
                  표지 이미지
                  <br />
                  실제 PDF 확보 후
                  <br />
                  필요 여부·크기 결정
                </p>
              </div>

              <div className={styles.materialInfo}>
                <h3 className={styles.materialTitle}>[공식 자료 제목 입력 대기]</h3>
                <p className={styles.materialDesc}>
                  자료 요약은 실제 PDF의 표지·목차를 대조한 뒤 작성합니다. 현재 내용은 비어 있는 자리 표시입니다.
                </p>

                <dl className={styles.metaList}>
                  {META_ITEMS.map((label) => (
                    <div key={label} className={styles.metaItem}>
                      <dt className={styles.metaLabel}>{label}</dt>
                      <dd className={styles.metaValue}>확인 필요</dd>
                    </div>
                  ))}
                </dl>

                <div className={styles.materialAction}>
                  <Button variant="outline" color="neutral" size="xl" className={styles.pendingButton} disabled>
                    제공 방식 미정
                  </Button>
                  <p className={styles.actionNote}>
                    다운로드·신청 경로 미연결 — 동작하는 링크 없음(프로토타입 미설정)
                  </p>
                </div>
              </div>
            </article>

            <div className={styles.materialSlot}>
              <p className={styles.slotTitle}>추가 자료 슬롯</p>
              <p className={styles.slotDesc}>
                자료가 여러 개로 확정되면 위 카드 구조를 반복합니다. 목록 필터 필요 여부와 Guide·Download 통합 여부는 자료 수·IA 결정 후 정합니다.
              </p>
            </div>
          </div>
        </BasicSection>

        {/* 3. 제공 방식 (Figma PC 1031:249 · 초안) */}
        <BasicSection
          bg="gray"
          layout="vertical"
          align="left"
          eyebrow="DELIVERY"
          title="제공 방식 (결정 대기)"
          description="제공 방식에 따라 자료 카드의 버튼과 추가로 필요한 화면이 달라집니다. 두 안 중 하나를 결정해야 합니다."
        >
          <ul className={styles.optionList}>
            {DELIVERY_OPTIONS.map((opt) => (
              <li key={opt.key} className={styles.optionCard}>
                <span className={styles.optionKey}>{opt.key}</span>
                <h3 className={styles.optionTitle}>{opt.title}</h3>
                <p className={styles.optionDesc}>{opt.desc}</p>
              </li>
            ))}
          </ul>
        </BasicSection>

        {/* 4. 다음 행동 (Figma PC 1031:265 · 초안) */}
        <BasicSection bg="white" layout="vertical" align="left">
          <div className={styles.nextBox}>
            <div className={styles.nextText}>
              <p className={styles.nextTitle}>필요한 자료를 찾지 못했나요?</p>
              <p className={styles.nextDesc}>문의 페이지로 연결합니다. (링크 목적지 미연결)</p>
            </div>
            <Button
              variant="solid"
              color="primary"
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
