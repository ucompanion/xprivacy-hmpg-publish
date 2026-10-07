import styles from '../template.module.scss';
import uStyles from './utilities.module.scss';
import { GuideSection } from '../components/GuideSection';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';

// 가이드 블록 렌더링용 공통 내부 컴포넌트
const UtilityBlock = ({ title, classNameText, children, description }: any) => (
  <div className={uStyles.utility_block}>
    <h4 className={uStyles.block_header}>
      {title} <span className={uStyles.code_tag}>.{classNameText}</span>
    </h4>
    {description && <p className={uStyles.block_desc}>{description}</p>}
    <div className={uStyles.block_content}>
      {children}
    </div>
  </div>
);

const UtilitiesGuidePage = () => {
  return (
    <DesignSystemLayout>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title_h1}>Utilities</h1>
          <p className={styles.description}>
            프로젝트 전역에서 공통으로 사용되는 레이아웃 및 정렬 유틸리티 클래스 모음입니다.
          </p>
        </header>

        <GuideSection title="1. Width (너비)">
          <p className={styles.description}>고정값(px)과 퍼센트(%) 단위를 구분하여 넓이를 지정할 수 있습니다.</p>
          
          <UtilityBlock 
            title="Fixed Width (px)" 
            classNameText="w-{size}" 
            description="10~500까지 정의된 사이즈 스케일을 따릅니다. (예: w-100 = width: 100px)"
          >
            <div className={uStyles.bar_container}>
              <div className="w-100" style={{ background: 'var(--color-primary-500)', color: '#fff', padding: '4rem', textAlign: 'center', borderRadius: '4rem', fontSize: '12rem' }}>w-100</div>
              <div className="w-200" style={{ background: 'var(--color-primary-500)', color: '#fff', padding: '4rem', textAlign: 'center', borderRadius: '4rem', fontSize: '12rem' }}>w-200</div>
              <div className="w-300" style={{ background: 'var(--color-primary-500)', color: '#fff', padding: '4rem', textAlign: 'center', borderRadius: '4rem', fontSize: '12rem' }}>w-300</div>
            </div>
          </UtilityBlock>

          <UtilityBlock 
            title="Percentage Width (%)" 
            classNameText="w-{size}p" 
            description="퍼센트 기반 가변 너비를 제공합니다. (예: w-100p = width: 100%)"
          >
            <div className={`${uStyles.bar_container} ${uStyles.percent_bg}`}>
              <div className="w-50p" style={{ background: 'var(--color-primary-500)', color: '#fff', padding: '4rem', textAlign: 'center', borderRadius: '4rem', fontSize: '12rem' }}>w-50p</div>
              <div className="w-100p" style={{ background: 'var(--color-primary-500)', color: '#fff', padding: '4rem', textAlign: 'center', borderRadius: '4rem', fontSize: '12rem' }}>w-100p</div>
            </div>
          </UtilityBlock>
        </GuideSection>

        <GuideSection title="2. Grid Layout">
          <p className={styles.description}>flex 또는 grid를 이용한 격자형 레이아웃 분할 배치 유틸리티입니다.</p>
          
          <UtilityBlock 
            title="Grid Row/Col" 
            classNameText="row / col" 
            description="flex-direction을 이용해 가로/세로 영역을 분할합니다."
          >
            <div className="row" style={{ gap: '16rem', width: '100%', padding: '16rem', border: '1rem solid var(--color-gray-200)', borderRadius: '8rem' }}>
              <div className="col" style={{ flex: 1, padding: '16rem', background: 'var(--color-gray-100)', borderRadius: '4rem', textAlign: 'center' }}>col (flex: 1)</div>
              <div className="col" style={{ flex: 1, padding: '16rem', background: 'var(--color-gray-100)', borderRadius: '4rem', textAlign: 'center' }}>col (flex: 1)</div>
            </div>
          </UtilityBlock>
        </GuideSection>

        <GuideSection title="3. Alignment (정렬)">
          <p className={styles.description}>텍스트 또는 박스의 정렬 상태를 강제합니다.</p>
          <div className="row" style={{ gap: '16rem', flexWrap: 'wrap' }}>
            <div className={`col align-l`} style={{ width: '120rem', height: '80rem', padding: '8rem', background: 'var(--color-gray-50)', border: '1rem solid var(--color-gray-200)', borderRadius: '8rem' }}>
              <strong>.align-l</strong>
              <p style={{ margin: 0, fontSize: '12rem', color: 'var(--color-gray-500)' }}>왼쪽 정렬</p>
            </div>
            <div className={`col align-m`} style={{ width: '120rem', height: '80rem', padding: '8rem', background: 'var(--color-gray-50)', border: '1rem solid var(--color-gray-200)', borderRadius: '8rem' }}>
              <strong>.align-m</strong>
              <p style={{ margin: 0, fontSize: '12rem', color: 'var(--color-gray-500)' }}>중앙 정렬</p>
            </div>
            <div className={`col align-r`} style={{ width: '120rem', height: '80rem', padding: '8rem', background: 'var(--color-gray-50)', border: '1rem solid var(--color-gray-200)', borderRadius: '8rem' }}>
              <strong>.align-r</strong>
              <p style={{ margin: 0, fontSize: '12rem', color: 'var(--color-gray-500)' }}>오른쪽 정렬</p>
            </div>
          </div>
        </GuideSection>
      </div>
    </DesignSystemLayout>
  );
};

export default UtilitiesGuidePage;

