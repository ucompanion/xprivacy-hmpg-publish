import styles from './FeatureSection.module.scss';

const features = [
  {
    title: '시간 동기화',
    desc: '다수의 영상 기기에서 들어오는 메타데이터를 정밀하게 시간 동기화하여 지연 없는 처리를 보장합니다.',
  },
  {
    title: '다중 객체 추적',
    desc: '프레임 간 객체 연관성 분석을 통해 움직이는 다수의 객체를 안정적으로 추적하고 비식별화합니다.',
  },
  {
    title: '병렬 처리 최적화',
    desc: '고용량/고화질의 대규모 영상 데이터를 병렬 연산으로 빠르게 분산 처리합니다.',
  }
];

export const FeatureSection = () => {
  return (
    <section className={styles.feature}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>개인정보 보호 요구사항을 고려한 영상 비식별화</h2>
          <p className={styles.subtitle}>
            안전한 컴플라이언스 준수와 효율적인 데이터 처리를 위한 핵심 기능을 제공합니다.
          </p>
        </div>

        <div className={styles.content_grid}>
          <div className={styles.feature_list}>
            {features.map((feat, idx) => (
              <div className={styles.feature_item} key={idx}>
                <div className={styles.bullet_square}></div>
                <div className={styles.feat_text}>
                  <h3 className={styles.feat_title}>{feat.title}</h3>
                  <p className={styles.feat_desc}>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.image_box}>
            <div className={styles.dashboard_placeholder}>
              {/* Image background is set in CSS */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
