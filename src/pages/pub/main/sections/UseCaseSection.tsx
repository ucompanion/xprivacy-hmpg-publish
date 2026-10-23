import React, { useState } from 'react';
import { BasicSection } from '../../../../components/domain/Section';
import styles from './UseCaseSection.module.scss';

interface UseCase {
  id: string;
  title: string;
  desc: React.ReactNode;
  image: string;
}

/* 01은 시안 문구 · 이미지, 02~04는 시안에 펼친 상태가 없어 초안 문구와 기존 이미지를 사용 */
const USE_CASES: UseCase[] = [
  {
    id: 'public',
    title: '공공시설',
    desc: (
      <>
        CCTV 열람·제공이나 정보공개 과정에서<br className={styles.pcBr} /> 포함된 개인정보를 비식별화합니다.
      </>
    ),
    image: '/images/main/usecase_public_v2.jpg',
  },
  {
    id: 'road',
    title: '도로와 주차장',
    desc: (
      <>
        도로·주차장 CCTV 영상에 담긴 차량 번호판과<br className={styles.pcBr} /> 보행자 얼굴을 비식별화합니다.
      </>
    ),
    image: '/images/main/result_parking.jpg',
  },
  {
    id: 'medical',
    title: '의료기관',
    desc: (
      <>
        진료·병동 공간 영상에 포함된 환자와<br className={styles.pcBr} /> 의료진의 개인정보를 비식별화합니다.
      </>
    ),
    image: '/images/main/usecase_hospital.jpg',
  },
  {
    id: 'office',
    title: '사무·산업시설',
    desc: (
      <>
        사무실·작업장 영상을 내부 공유하거나<br className={styles.pcBr} /> 반출할 때 개인정보를 비식별화합니다.
      </>
    ),
    image: '/images/main/usecase_office.jpg',
  },
];

/**
 * 업무 환경별 활용 (Figma PC 1928:816 · MO 1928:1328)
 * 항목을 누르면 설명이 펼쳐지고 오른쪽(MO 아래) 이미지가 바뀝니다.
 */
export const UseCaseSection = () => {
  const [activeId, setActiveId] = useState(USE_CASES[0].id);

  return (
    <BasicSection
      bg="transparent"
      theme="dark"
      className={styles.section}
      contentClassName={styles.container}
      headerClassName={styles.header}
      descriptionClassName={styles.description}
      title={
        <>
          다양한 업무 환경에 맞춰
          <br />
          <span className={styles.titleRegular}>영상 개인정보를 처리하세요</span>
        </>
      }
      description={
        <>
          정보공개, 민원 대응, 영상 반출과 내부 공유까지
          <br />
          개인정보 비식별화가 필요한 다양한 업무에<br className={styles.moBr} /> 적용할 수 있습니다.
        </>
      }
    >
      <div className={styles.body}>
        <ul className={styles.list}>
          {USE_CASES.map((item, index) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id} className={`${styles.item} ${isActive ? styles.itemActive : ''}`}>
                <button
                  type="button"
                  className={styles.itemButton}
                  aria-expanded={isActive}
                  aria-controls={`usecase-${item.id}`}
                  onClick={() => setActiveId(item.id)}
                >
                  <span className={styles.itemNo}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.itemTitle}>{item.title}</span>
                </button>
                <div id={`usecase-${item.id}`} className={styles.itemBody} aria-hidden={!isActive}>
                  <p className={styles.itemDesc}>{item.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.visual} aria-hidden="true">
          {USE_CASES.map((item) => (
            <span
              key={item.id}
              className={`${styles.visualImage} ${styles[`visual_${item.id}`]} ${item.id === activeId ? styles.visualActive : ''}`}
              style={{ backgroundImage: `url(${item.image})` }}
            />
          ))}
        </div>
      </div>
    </BasicSection>
  );
};
