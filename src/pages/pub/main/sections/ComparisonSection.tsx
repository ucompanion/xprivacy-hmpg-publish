import React, { useState } from 'react';
import { BasicSection } from '../../../../components/domain/Section';
import styles from './ComparisonSection.module.scss';
import { Icon } from '../../../../components/core/Icon/Icon';

type EffectId = 'detect' | 'mosaic' | 'masking' | 'blur' | 'virtual';

const EFFECT_TABS: { id: EffectId; label: string }[] = [
  { id: 'detect', label: '자동 탐지' },
  { id: 'mosaic', label: '모자이크' },
  { id: 'masking', label: '마스킹' },
  { id: 'blur', label: '블러' },
  { id: 'virtual', label: '가상얼굴' },
];

/* 탭별 시안 이미지 (Figma 4249:1336) — 탐지 박스·태그·비식별 효과가 이미지에 포함된 통이미지
   원본: 효과 없는 원본 · 적용 후: 식별 프레임(탐지 박스 포함) */
const IMG = '/images/main/compare';

const Stage = ({ pc, mo }: { pc: string; mo: string }) => (
  <picture className={styles.stage}>
    <source media="(max-width: 768px)" srcSet={`${IMG}/${mo}.jpg`} />
    <img src={`${IMG}/${pc}.jpg`} alt="" draggable={false} />
  </picture>
);

/** 비교 기준선 초기 위치 (PC 305/1244 · MO 가운데) */
const initialPosition = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches ? 50 : 24.5;

/**
 * 기능별 적용 결과 (Figma PC 1928:521 · MO 1928:1037)
 * 탭으로 처리 방식을 바꾸고, 기준선을 드래그해 원본과 적용 후를 비교합니다.
 */
export const ComparisonSection = () => {
  const [effect, setEffect] = useState<EffectId>('blur');
  const [position, setPosition] = useState(initialPosition);

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (index + (e.key === 'ArrowRight' ? 1 : -1) + EFFECT_TABS.length) % EFFECT_TABS.length;
    setEffect(EFFECT_TABS[next].id);
    document.getElementById(`effect-tab-${EFFECT_TABS[next].id}`)?.focus();
  };

  return (
    <BasicSection
      bg="white"
      align="center"
      className={styles.section}
      headerClassName={styles.header}
      titleClassName={styles.title}
      descriptionClassName={styles.description}
      title={
        <>
          <span className={styles.titleRegular}>탐지부터 비식별화까지</span>
          <br />
          기능별 적용 결과를<br className="heroMoBr" /> 확인하세요
        </>
      }
      description={
        <>
          영상이나 이미지를 업로드하면 AI가 식별 가능한 대상을 탐지합니다.
          <br className={styles.pcBr} /> 필요한 영역을 비식별화하고 처리 결과를 선택해서 확인할 수 있습니다.
        </>
      }
    >
      <div className={styles.demo}>
        <div className={styles.tabList} role="tablist" aria-label="비식별 처리 방식">
          {EFFECT_TABS.map((tab, index) => (
            <button
              key={tab.id}
              id={`effect-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={effect === tab.id}
              aria-controls="effect-panel"
              tabIndex={effect === tab.id ? 0 : -1}
              className={`${styles.tab} ${effect === tab.id ? styles.tabActive : ''}`}
              onClick={() => setEffect(tab.id)}
              onKeyDown={(e) => handleTabKeyDown(e, index)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          id="effect-panel"
          role="tabpanel"
          aria-labelledby={`effect-tab-${effect}`}
          className={styles.panel}
          style={{ '--split': `${position}%` } as React.CSSProperties}
        >
          {/* 적용 후 (전체) */}
          <div className={styles.layer}>
            <Stage pc={`pc_${effect}`} mo={`mo_${effect}`} />
            <span className={`${styles.stateTag} ${styles.stateAfter}`}>비식별 처리</span>
          </div>

          {/* 원본 (기준선 왼쪽만 노출) */}
          <div className={`${styles.layer} ${styles.layerOriginal}`} aria-hidden="true">
            <Stage pc="pc_original" mo="mo_original" />
            <span className={styles.originalShade} />
            <span className={`${styles.stateTag} ${styles.stateOriginal}`}>원본</span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            step={0.5}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className={styles.range}
            aria-label="원본과 적용 후 비교 기준선"
          />
          <span className={styles.divider} aria-hidden="true" />
          <span className={styles.handle} aria-hidden="true">
            <Icon name="keyboard-arrow-left" color="var(--color-secondary)" />
            <Icon name="keyboard-arrow-right" color="var(--color-secondary)" />
          </span>
        </div>
      </div>
    </BasicSection>
  );
};
