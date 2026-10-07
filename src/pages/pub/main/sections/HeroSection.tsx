import styles from './HeroSection.module.scss';
import { Button } from '../../../../components/core/Button/Button';

export const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          복잡한 영상 속 개인정보<br />
          AI로 탐지하고 보호합니다
        </h1>
        <p className={styles.subtitle}>
          OFF:ON xPRIVACY 솔루션은 다양한 환경의 영상 데이터에서<br />
          개인정보를 AI로 안전하고 빠르게 탐지·비식별화 합니다.
        </p>
        <div className={styles.button_group}>
          <Button color="primary" size="lg" className={styles.btn_inquiry}>
            도입 문의
          </Button>
          <Button size="lg" className={styles.btn_trial}>
            체험하기
          </Button>
        </div>
      </div>
    </section>
  );
};
