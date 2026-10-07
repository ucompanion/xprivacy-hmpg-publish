import { CtaSection } from '../../../../components/domain/Section';
import { Button } from '../../../../components/core/Button/Button';
import styles from './CtaSection.module.scss';

export const MainCtaSection = () => {
  const title = (
    <>
      어려운 개인정보 보호를<br />
      간편하게
    </>
  );

  const description = (
    <>
      영상과 이미지 속 개인정보를 자동으로 찾고<br className="mobile-only" />
      보호하는 과정을 직접 확인해보세요.
    </>
  );

  const button = (
    <Button variant="outline" size="lg" className={styles.btn_cta}>
      도입 문의하기
    </Button>
  );

  return (
    <CtaSection
      variant="main"
      title={title}
      description={description}
      headerExtra={button}
      className={styles.cta}
    />
  );
};
