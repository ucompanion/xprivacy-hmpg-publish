import { BasicSection } from '../../../../components/domain/Section';
import { DeploymentPlans } from '../../../../components/domain/Deployment';
import styles from './PricingSection.module.scss';

/**
 * 도입 방식 (제품 가격 페이지 '관제센터 환경에 맞춘 도입 방식' 섹션과 동일 · 공통 DeploymentPlans)
 * 구축형 · 클라우드 · API 연동 카드 3종 + PoC 무상 검증 카드
 */
export const PricingSection = () => (
  <BasicSection
    bg="white"
    align="center"
    className={styles.section}
    headerClassName={styles.header}
    descriptionClassName={styles.description}
    title="관제센터 환경에 맞춘 도입 방식"
    description="보안 요건과 업무 환경에 따라 구축형, 클라우드, 시스템 연동 방식으로 도입할 수 있으며, 도입 전 실제 영상으로 무상 검증을 진행합니다."
  >
    <DeploymentPlans />
  </BasicSection>
);
