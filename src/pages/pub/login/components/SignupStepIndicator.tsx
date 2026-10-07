import React from 'react';
import styles from '../signup-flow.module.scss';

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
}

export const SignupStepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className={styles.step_indicator} aria-label="회원가입 단계">
      {/* 1. 약관 동의 */}
      <div className={`${styles.step_item} ${currentStep === 1 ? styles.active : currentStep > 1 ? styles.done : styles.waiting}`}>
        <span className={styles.step_badge}>
          {currentStep > 1 ? (
            <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4.5L4 7.5L9.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            '1'
          )}
        </span>
        <span>약관 동의</span>
      </div>

      <span className={styles.step_line} aria-hidden="true" />

      {/* 2. 정보 입력 */}
      <div className={`${styles.step_item} ${currentStep === 2 ? styles.active : currentStep > 2 ? styles.done : styles.waiting}`}>
        <span className={styles.step_badge}>
          {currentStep > 2 ? (
            <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4.5L4 7.5L9.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            '2'
          )}
        </span>
        <span>정보 입력</span>
      </div>

      <span className={styles.step_line} aria-hidden="true" />

      {/* 3. 가입 완료 */}
      <div className={`${styles.step_item} ${currentStep === 3 ? styles.active : styles.waiting}`}>
        <span className={styles.step_badge}>3</span>
        <span>가입 완료</span>
      </div>
    </div>
  );
};
