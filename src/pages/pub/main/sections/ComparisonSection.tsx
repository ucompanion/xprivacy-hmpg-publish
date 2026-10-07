import React, { useState } from 'react';
import styles from './ComparisonSection.module.scss';

const tabs = ['자동 탐지', '모자이크', '마스킹', '블러', '가상얼굴'];

export const ComparisonSection = () => {
  const [activeTab, setActiveTab] = useState('블러');
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className={styles.comparison}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>탐지부터 비식별화까지<br />기능별 적용 결과를 확인하세요</h2>
          <p className={styles.subtitle}>
            OFF:ON xPRIVACY 모듈은 얼굴, 신체는 물론, 차량 번호판 등 다양한 개인정보를 정확히 탐지하고,<br />
            원본 영상의 활용 가치를 훼손하지 않는 뛰어난 비식별화 품질을 제공합니다.
          </p>
        </div>

        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${styles.tab_btn} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.image_container}>
          <div className={styles.slider_wrapper}>
            {/* After (비식별화 적용 후) - Background Image */}
            <div className={`${styles.image_layer} ${styles.image_after}`}>
              <div className={styles.after_tag}>적용 후</div>
            </div>

            {/* Before (원본) - Foreground Image clipped by slider position */}
            <div 
              className={`${styles.image_layer} ${styles.image_before}`}
              style={{ width: `${sliderPosition}%` }}
            >
              <div className={styles.before_tag}>원본</div>
            </div>

            {/* Range Input for interaction */}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderPosition} 
              onChange={handleSliderChange}
              className={styles.slider_input}
              aria-label="Image comparison slider"
            />

            {/* Visual Split Line and Thumb Handle */}
            <div 
              className={styles.slider_line}
              style={{ left: `${sliderPosition}%` }}
            >
              <div className={styles.slider_thumb}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
