import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { ProductCta } from './sections/ProductCta';
import styles from './core-values.module.scss';

export default function PubSubProductCoreValues() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        
        {/* Top Hero Section */}
        <HeroSection
          align="left"
          eyebrow="CORE VALUES"
          title={
            <>
              관제센터의 영상 반출,<br className="pc-only" />
              지금 방식으로<br className="mobile-only" />
              감당할 수 있을까요?
            </>
          }
          description="CCTV는 매년 15% 이상 증가하고 있지만, 영상 반출 업무는 여전히 수작업에 의존하고 있습니다. 늘어나는 영상을 기존 방식으로 감당할 수 있을까요?"
        >
          <div className={styles.heroVisual}>
            <div className={styles.videoGrid}>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className={styles.videoItem}>
                  <div className={styles.videoOverlay}>
                    <span className={styles.rec}>REC</span>
                    <span className={styles.time}>2023-10-24 14:32:0{num}</span>
                  </div>
                </div>
              ))}
            </div>
            <ul className={styles.videoLabels}>
              <li>수작업 사각지대 존재</li>
              <li>작업시간 증가</li>
              <li>작업자 피로도 증가</li>
            </ul>
          </div>
        </HeroSection>

        {/* Section 1: 한계점 */}
        <BasicSection 
          layout="vertical" 
          align="left"
          title={<>증가하는 데이터량,<br/>수작업 처리의 한계점 입니다.</>}
          description="CCTV 해상도와 카메라 대수 증가로 데이터량이 기하급수적으로 증가하며 수작업 모자이크 처리는 작업 지연과 리소스 낭비를 유발합니다."
        >
          <div className={styles.limitVisual}></div>

          <div className={styles.feature3Col}>
            <div className={styles.col}>
              <span className={styles.num}>01</span>
              <h4>인식 불량 감지 제외</h4>
              <p>사람이 직접 확인하기 어려운 사각지대나 다수의 군중 속에서는 누락이 발생하기 쉽습니다.</p>
            </div>
            <div className={styles.col}>
              <span className={styles.num}>02</span>
              <h4>떨어지는 집중 탐지</h4>
              <p>수작업으로 영상 프레임마다 모자이크를 처리해야 하므로 영상 반출 시간이 기하급수적으로 늘어납니다.</p>
            </div>
            <div className={styles.col}>
              <span className={styles.num}>03</span>
              <h4>누락 증가·확산</h4>
              <p>반복적이고 소모적인 작업에 귀중한 인력이 투입되어 업무 효율성이 크게 떨어집니다.</p>
            </div>
          </div>
        </BasicSection>

        {/* Section 2: 복원불가 */}
        <BasicSection 
          layout="horizontal" 
          className={styles.sectionAlt}
          title={<>복원불가! 재식별 여지를<br/>남기지 않습니다.</>}
          description="단순한 모자이크 처리는 특수 프로그램으로 원상 복구될 수 있습니다. xPrivacy는 재식별이 불가한 근본적인 보호 솔루션을 제공합니다."
          headerExtra={
            <ul className={styles.checkList}>
              <li>
                <h4>원본 데이터 원천 파기</h4>
                <p>비식별 처리 후 원본 이미지나 영상의 복원이 원천적으로 불가능하도록 파기합니다.</p>
              </li>
              <li>
                <h4>안전한 데이터 활용 보장</h4>
                <p>AI 학습용 데이터나 연구 목적으로 활용 시 개인정보 침해 우려 없이 안전하게 제공할 수 있습니다.</p>
              </li>
              <li>
                <h4>보안 감사 대응 완벽</h4>
                <p>가이드라인과 규제를 준수하는 처리 방식으로 보안 감사 및 법적 요구사항을 충족합니다.</p>
              </li>
            </ul>
          }
        >
          <div className={styles.compareCards}>
            <div className={styles.card}>
              <div className={`${styles.cardImg} ${styles.imgBefore}`}></div>
              <div className={`${styles.cardTag} ${styles.tagRed}`}>복원 위험 존재</div>
            </div>
            <div className={styles.card}>
              <div className={`${styles.cardImg} ${styles.imgAfter}`}></div>
              <div className={`${styles.cardTag} ${styles.tagGreen}`}>xPrivacy 안전 보호</div>
            </div>
          </div>
        </BasicSection>

        {/* Section 3: 추적성 증명 */}
        <BasicSection 
          layout="horizontal"
          title={<>사후 점검·감사에서<br/>책임 추적성을 증명합니다.</>}
          description="수작업은 작업 이력을 증명할 객관적인 데이터가 남지 않습니다. xPrivacy 시스템은 작업 처리 이력을 상세하게 기록하여 제출합니다."
          headerExtra={
            <ul className={styles.checkList}>
              <li>
                <h4>책임 소재 명확</h4>
                <p>어떤 사용자가 언제 어떤 기준으로 데이터를 비식별화 했는지 명확히 기록합니다.</p>
              </li>
              <li>
                <h4>처리 내역서 발급</h4>
                <p>감사에 필요한 증빙 서류를 클릭 한 번으로 빠르고 정확하게 생성 및 출력합니다.</p>
              </li>
              <li>
                <h4>사후 감사 시 근거</h4>
                <p>법적 분쟁이나 감사 시 객관적인 자료로 활용하여 기관과 기업을 안전하게 보호합니다.</p>
              </li>
            </ul>
          }
        >
          <div className={styles.tableMock}>
            <div className={styles.thRow}>
              <span>Processing History</span>
            </div>
            <div className={styles.tbRow}>
              <span className={styles.col1}>Date</span>
              <span className={styles.col2}>Event</span>
              <span className={styles.col3}>Status</span>
            </div>
            <div className={styles.tdRow}>
              <span className={styles.col1}>23.10.24 14:32</span>
              <span className={styles.col2}>영상 비식별 처리</span>
              <span className={styles.col3}><span className={styles.badgeDone}>완료</span></span>
            </div>
            <div className={styles.tdRow}>
              <span className={styles.col1}>23.10.24 11:15</span>
              <span className={styles.col2}>이미지 일괄 변환</span>
              <span className={styles.col3}><span className={styles.badgeDone}>완료</span></span>
            </div>
            <div className={styles.tdRow}>
              <span className={styles.col1}>23.10.23 09:40</span>
              <span className={styles.col2}>마스킹 규칙 변경</span>
              <span className={styles.col3}><span className={styles.badgeIng}>진행중</span></span>
            </div>
            <div className={styles.tdRow}>
              <span className={styles.col1}>23.10.22 16:20</span>
              <span className={styles.col2}>시스템 정기 점검</span>
              <span className={styles.col3}><span className={styles.badgeWait}>대기</span></span>
            </div>
          </div>
        </BasicSection>

        {/* Cta Section */}
        <ProductCta />
      </div>
    </FrontLayout>
  );
}
