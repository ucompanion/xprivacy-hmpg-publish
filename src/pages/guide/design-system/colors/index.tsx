import baseStyles from '../template.module.scss';
import styles from './colors.module.scss';
import { GuideSection } from '../components/GuideSection';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';

// 단일 컬러 블록 렌더링을 위한 공통 컴포넌트
const ColorBlock = ({ label, varName, main }: { label: string; varName: string; main?: boolean }) => (
  <div className={styles.color_block}>
    <div className={styles.box} style={{ backgroundColor: varName }}>
      {main && <div className={styles.main_dot} />}
    </div>
    <div>
      <p className={styles.label}>
        {label} {main && <span style={{ color: varName }}>*</span>}
      </p>
      <p className={styles.hex}>{varName}</p>
    </div>
  </div>
);

const ColorsGuidePage = () => {
  return (
    <DesignSystemLayout>
      <div className={baseStyles.wrapper}>
        <header className={baseStyles.header}>
          <h1 className={baseStyles.title_h1}>Colors</h1>
          <p className={baseStyles.description}>
            디자인 시스템에서 사용되는 시맨틱 색상 팔레트입니다. 모든 핵심 컬러는 50부터 900까지 10단계 명도 스케일로 구성됩니다.
          </p>
        </header>

        <GuideSection title="Brand & Semantic Colors">
          {/* Primary Color Group */}
          <div className={styles.color_group}>
            <h3 className={styles.group_title}>Primary</h3>
            <div className={styles.color_grid}>
              <ColorBlock label="50" varName="var(--color-primary-50)" />
              <ColorBlock label="100" varName="var(--color-primary-100)" />
              <ColorBlock label="200" varName="var(--color-primary-200)" />
              <ColorBlock label="300" varName="var(--color-primary-300)" />
              <ColorBlock label="400" varName="var(--color-primary-400)" />
              <ColorBlock label="500" varName="var(--color-primary-500)" main />
              <ColorBlock label="600" varName="var(--color-primary-600)" />
              <ColorBlock label="700" varName="var(--color-primary-700)" />
              <ColorBlock label="800" varName="var(--color-primary-800)" />
              <ColorBlock label="900" varName="var(--color-primary-900)" />
            </div>
          </div>

          {/* Secondary Color Group */}
          <div className={styles.color_group}>
            <h3 className={styles.group_title}>Secondary (Neutral)</h3>
            <div className={styles.color_grid}>
              <ColorBlock label="50" varName="var(--color-secondary-50)" />
              <ColorBlock label="100" varName="var(--color-secondary-100)" />
              <ColorBlock label="200" varName="var(--color-secondary-200)" />
              <ColorBlock label="300" varName="var(--color-secondary-300)" />
              <ColorBlock label="400" varName="var(--color-secondary-400)" />
              <ColorBlock label="500" varName="var(--color-secondary-500)" main />
              <ColorBlock label="600" varName="var(--color-secondary-600)" />
              <ColorBlock label="700" varName="var(--color-secondary-700)" />
              <ColorBlock label="800" varName="var(--color-secondary-800)" />
              <ColorBlock label="900" varName="var(--color-secondary-900)" />
            </div>
          </div>
          
          {/* Danger Color Group */}
          <div className={styles.color_group}>
            <h3 className={styles.group_title}>Danger</h3>
            <div className={styles.color_grid}>
              <ColorBlock label="50" varName="var(--color-danger-50)" />
              <ColorBlock label="100" varName="var(--color-danger-100)" />
              <ColorBlock label="200" varName="var(--color-danger-200)" />
              <ColorBlock label="300" varName="var(--color-danger-300)" />
              <ColorBlock label="400" varName="var(--color-danger-400)" />
              <ColorBlock label="500" varName="var(--color-danger-500)" main />
              <ColorBlock label="600" varName="var(--color-danger-600)" />
              <ColorBlock label="700" varName="var(--color-danger-700)" />
              <ColorBlock label="800" varName="var(--color-danger-800)" />
              <ColorBlock label="900" varName="var(--color-danger-900)" />
            </div>
          </div>

          {/* Success Color Group */}
          <div className={styles.color_group}>
            <h3 className={styles.group_title}>Success</h3>
            <div className={styles.color_grid}>
              <ColorBlock label="50" varName="var(--color-success-50)" />
              <ColorBlock label="100" varName="var(--color-success-100)" />
              <ColorBlock label="200" varName="var(--color-success-200)" />
              <ColorBlock label="300" varName="var(--color-success-300)" />
              <ColorBlock label="400" varName="var(--color-success-400)" />
              <ColorBlock label="500" varName="var(--color-success-500)" main />
              <ColorBlock label="600" varName="var(--color-success-600)" />
              <ColorBlock label="700" varName="var(--color-success-700)" />
              <ColorBlock label="800" varName="var(--color-success-800)" />
              <ColorBlock label="900" varName="var(--color-success-900)" />
            </div>
          </div>
          {/* Warning Color Group */}
          <div className={styles.color_group}>
            <h3 className={styles.group_title}>Warning (Amber)</h3>
            <div className={styles.color_grid}>
              <ColorBlock label="50" varName="var(--color-warning-50)" />
              <ColorBlock label="100" varName="var(--color-warning-100)" />
              <ColorBlock label="200" varName="var(--color-warning-200)" />
              <ColorBlock label="300" varName="var(--color-warning-300)" />
              <ColorBlock label="400" varName="var(--color-warning-400)" />
              <ColorBlock label="500" varName="var(--color-warning-500)" main />
              <ColorBlock label="600" varName="var(--color-warning-600)" />
              <ColorBlock label="700" varName="var(--color-warning-700)" />
              <ColorBlock label="800" varName="var(--color-warning-800)" />
              <ColorBlock label="900" varName="var(--color-warning-900)" />
            </div>
          </div>

          {/* Neutral/Gray Color Group */}
          <div className={styles.color_group}>
            <h3 className={styles.group_title}>Neutral / Gray</h3>
            <div className={styles.color_grid}>
              <ColorBlock label="50" varName="var(--color-gray-50)" />
              <ColorBlock label="100" varName="var(--color-gray-100)" />
              <ColorBlock label="200" varName="var(--color-gray-200)" />
              <ColorBlock label="300" varName="var(--color-gray-300)" />
              <ColorBlock label="400" varName="var(--color-gray-400)" />
              <ColorBlock label="500" varName="var(--color-gray-500)" main />
              <ColorBlock label="600" varName="var(--color-gray-600)" />
              <ColorBlock label="700" varName="var(--color-gray-700)" />
              <ColorBlock label="800" varName="var(--color-gray-800)" />
              <ColorBlock label="900" varName="var(--color-gray-900)" />
            </div>
          </div>
        </GuideSection>
      </div>
    </DesignSystemLayout>
  );
};

export default ColorsGuidePage;
