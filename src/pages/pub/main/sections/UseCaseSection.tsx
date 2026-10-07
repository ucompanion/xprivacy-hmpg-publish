import { useState } from 'react';
import styles from './UseCaseSection.module.scss';

const useCases = [
  {
    id: 'public',
    title: '공공시설',
    desc: 'CCTV 영상 반출 시 개인정보를 안전하게 비식별화하여 외부 유출을 방지합니다.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'retail',
    title: '도소매·서비스',
    desc: '매장 내 고객 행동 분석을 위한 영상 수집 시, 고객의 개인정보를 완벽하게 보호합니다.',
    image: 'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'medical',
    title: '의료기관',
    desc: '수술실 CCTV 의무화에 따른 환자 및 의료진의 영상 정보 보안 요구사항을 충족합니다.',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'startup',
    title: '스타트업·기업',
    desc: 'AI 모델 학습용 영상 데이터 구축 시 필수적인 비식별화 전처리를 지원합니다.',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200'
  }
];

export const UseCaseSection = () => {
  const [activeId, setActiveId] = useState(useCases[0].id);
  const activeCase = useCases.find(uc => uc.id === activeId);

  return (
    <section className={styles.usecase}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>다양한 업무 환경에 맞춰<br />영상 개인정보를 처리하세요</h2>
          <p className={styles.subtitle}>
            공공기관, 도소매, 의료, 스타트업 등 개인정보 보호가<br />
            필요한 다양한 환경에 최적화된 솔루션을 제공합니다.
          </p>
        </div>

        <div className={styles.content_grid}>
          <div className={styles.tabs_vertical}>
            {useCases.map((uc) => (
              <button
                key={uc.id}
                className={`${styles.tab_btn} ${activeId === uc.id ? styles.active : ''}`}
                onClick={() => setActiveId(uc.id)}
              >
                <div className={styles.tab_title}>{uc.title}</div>
                {activeId === uc.id && (
                  <div className={styles.tab_desc}>{uc.desc}</div>
                )}
              </button>
            ))}
          </div>

          <div className={styles.image_box}>
            <div 
              className={styles.image_placeholder}
              style={{ backgroundImage: `url(${activeCase?.image})` }}
            >
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
