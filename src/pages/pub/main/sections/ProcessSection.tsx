import styles from './ProcessSection.module.scss';

const features = [
  {
    text: '개인정보를 자동으로 찾습니다.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
        <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
        <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
        <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
      </svg>
    )
  },
  {
    text: '선택한 방식으로 보호합니다.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    )
  },
  {
    text: '처리 결과를 한눈에 보여줍니다.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    )
  },
  {
    text: '작업 내역을 이어서 관리합니다.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
      </svg>
    )
  }
];

const processes = [
  {
    id: 'step1',
    title: '업로드',
    desc: '영상·이미지 작업 대상 등록',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 12 12 17 22 12"></polyline>
        <polyline points="2 17 12 22 22 17"></polyline>
      </svg>
    )
  },
  {
    id: 'step2',
    title: 'AI 탐지',
    desc: '얼굴·사람·번호판 등 개인정보 대상 탐지',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
        <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
        <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
        <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
      </svg>
    )
  },
  {
    id: 'step3',
    title: '비식별 처리',
    desc: '대상과 정책에 맞는 보호 방식 적용',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    )
  },
  {
    id: 'step4',
    title: '검수',
    desc: '필요한 대상만 확인·조정',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    )
  },
  {
    id: 'step5',
    title: '결과 관리',
    desc: '처리 결과와 이력을 확인·관리',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    )
  },
];

export const ProcessSection = () => {
  return (
    <section className={styles.process}>
      <div className={styles.container}>
        <div className={styles.text_content}>
          <h2 className={styles.title}>AI가 먼저 탐지하고<br />사용자가 최종 검수합니다</h2>
          <p className={styles.subtitle}>
            반복적인 대상 탐지는 AI가 먼저 수행합니다.<br />
            탐지 결과를 확인하고 필요한 영역을 검수 및 조정하세요.
          </p>

          <ul className={styles.feature_list}>
            {features.map((feat, idx) => (
              <li key={idx} className={styles.feature_item}>
                <div className={styles.feature_icon}>
                  {feat.icon}
                </div>
                <span className={styles.feature_text}>{feat.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.timeline_wrapper}>
          <div className={styles.timeline_card}>
            <div className={styles.timeline_line}></div>
            <div className={styles.timeline}>
              {processes.map((item) => (
                <div className={styles.timeline_item} key={item.id}>
                  <div className={styles.icon_wrapper}>
                    <div className={styles.icon}>{item.icon}</div>
                  </div>
                  <div className={styles.content}>
                    <h3 className={styles.item_title}>{item.title}</h3>
                    <p className={styles.item_desc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
