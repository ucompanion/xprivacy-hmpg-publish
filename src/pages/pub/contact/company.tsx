import { useNavigate } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { BasicSection } from '../../../components/domain/Section';
import { Button } from '../../../components/core/Button/Button';
import styles from './company.module.scss';

// 운영 주체·연락·주소 카드 (Figma PC 1034:587)
const INFO_CARDS = [
  { num: '01', title: '운영 주체', value: '[공식 법인명 확인 대기]', note: '간결한 소개 문구는 승인 후 입력합니다.' },
  { num: '02', title: '공식 연락 방법', value: '[대표 전화·대표 이메일 확인 대기]', note: '문의 접수는 문의 페이지로 연결합니다.' },
  { num: '03', title: '주소 · 방문 안내', value: '[공식 주소 확인 대기]', note: '방문 안내·지도는 방문 수요 확인 후 필요 수준을 정합니다.' },
];

export default function PubContactCompany() {
  const navigate = useNavigate();

  return (
    <FrontLayout>
      <div className={styles.companyPage}>
        {/* 1. Hero Section */}
        <BasicSection
          bg="gray"
          theme="light"
          layout="vertical"
          align="left"
          eyebrow={
            <>
              <div className={styles.heroBadges}>
                <span className={styles.badgeDraft}>DRAFT · 검토용 초안</span>
                <span className={styles.badgeDraft}>임시 계획</span>
                <span className={styles.badgeDraft}>공식 정보 확인 전</span>
              </div>
              <span className={styles.heroEyebrow}>COMPANY</span>
            </>
          }
          title="회사 정보"
          description="[승인] 회사 소개글 입력 대기"
        />

        {/* 2. 운영 주체·연락·주소 (Figma PC 1034:582 · 초안) */}
        <BasicSection
          bg="white"
          layout="vertical"
          align="left"
          eyebrow="OPERATOR & CONTACT"
          title="운영 주체와 연락 방법"
          description="공식 법인명, 연락처, 주소는 공식 확인 후 입력합니다."
        >
          <div className={styles.operatorBody}>
          <ul className={styles.infoCards}>
            {INFO_CARDS.map((card) => (
              <li key={card.num} className={styles.infoCard}>
                <span className={styles.infoNum}>{card.num}</span>
                <h3 className={styles.infoTitle}>{card.title}</h3>
                <p className={styles.infoDesc}>
                  {card.value}
                  <br />
                  {card.note}
                </p>
              </li>
            ))}
          </ul>

          <div className={styles.actionRow}>
            <Button
              variant="solid"
              color="primary"
              size="xl"
              className={styles.actionButton}
              onClick={() => void navigate('/pub/contact/inquiry')}
            >
              문의하기
            </Button>
            <p className={styles.actionNote}>문의 페이지로 연결 예정 — 링크 목적지 미연결</p>
          </div>
          </div>
        </BasicSection>

        {/* 3. 회사 소개·연혁·사업영역 (Figma PC 1034:607 · 초안) */}
        <BasicSection
          bg="gray"
          layout="vertical"
          align="left"
          eyebrow="COMPANY PROFILE"
          title="회사 소개 · 연혁 · 사업영역"
          description="공식 자료와 공개 범위가 확보되면 이 영역을 구성합니다."
        >
          <div className={styles.profileSlot}>
            <p className={styles.slotTitle}>공식 자료 대기</p>
            <p className={styles.slotDesc}>
              승인된 회사 소개문과 연혁·사업영역·Vision의 공개 가능 범위를 받은 뒤 구성합니다. 연혁을 중심 섹션으로 고정하지 않으며, 분량을 확인한 뒤 레이아웃을 정합니다.
            </p>
          </div>
        </BasicSection>

        {/* 4. 인증 및 특허 티저 (Figma PC 1034:615 · 초안) */}
        <BasicSection bg="white" layout="vertical" align="left">
          <div className={styles.teaserBox}>
            <div className={styles.teaserText}>
              <p className={styles.teaserTitle}>인증 및 특허</p>
              <p className={styles.teaserDesc}>
                상세 목록은 Product › 인증 및 특허 페이지에서 다룹니다. 이 페이지에는 목록을 복제하지 않습니다. (링크 목적지 미연결)
              </p>
            </div>
            <Button
              variant="outline"
              color="neutral"
              size="xl"
              className={styles.teaserButton}
              onClick={() => void navigate('/pub/product/certification')}
            >
              자세히 보기
            </Button>
          </div>
        </BasicSection>
      </div>
    </FrontLayout>
  );
}
