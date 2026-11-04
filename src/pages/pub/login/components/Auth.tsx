import React from 'react';
import { Link } from 'react-router-dom';
import styles from './auth.module.scss';

/**
 * 로그인 · 회원가입 · 탈퇴 화면 공통 부품 (Figma Login v2 · 2966:2504 / 2966:5640)
 * - AuthCard: 회색 배경 위 흰 인증 카드 (단계 표시 → 제목·설명 → 본문)
 * - AuthBody / AuthActions / AuthLinks: 카드 안 영역 (각 영역 사이 40 · MO 32)
 * - AuthAlert: Inline Alert/v2 (오류 · 완료 · 안내)
 * - AuthStepIndicator: 회원가입 3단계 표시 (Step Indicator/v2)
 * - AuthCheckbox: 동의 체크박스 (Agreement Row/v2 Checkbox)
 */

const SIGNUP_STEPS = ['약관 동의', '정보 입력', '가입 완료'] as const;

export function AuthStepIndicator({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol className={styles.steps} aria-label="회원가입 단계">
      {SIGNUP_STEPS.map((label, idx) => {
        const step = idx + 1;
        const state = step < current ? 'done' : step === current ? 'active' : 'waiting';
        return (
          <li key={label} className={`${styles.step} ${styles[`step_${state}`]}`} aria-current={state === 'active' ? 'step' : undefined}>
            <span className={styles.stepCircle} aria-hidden="true">
              {state === 'done' ? '✓' : step}
            </span>
            <span className={styles.stepLabel}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

interface AuthCardProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** 회원가입 단계 (있으면 카드 맨 위에 단계 표시) */
  step?: 1 | 2 | 3;
  children: React.ReactNode;
}

export function AuthCard({ title, description, step, children }: AuthCardProps) {
  return (
    <div className={styles.authMain}>
      <div className={styles.authCard}>
        {step && <AuthStepIndicator current={step} />}
        <div className={styles.head}>
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}

export function AuthBody({ children }: { children: React.ReactNode }) {
  return <div className={styles.body}>{children}</div>;
}

export function AuthActions({ children }: { children: React.ReactNode }) {
  return <div className={styles.actions}>{children}</div>;
}

/** 안내 문구 + 링크 한 줄 (예: 계정이 없으신가요? 회원가입) */
export function AuthLinks({ lead, children }: { lead?: React.ReactNode; children: React.ReactNode }) {
  return (
    <p className={styles.links}>
      {lead && <span className={styles.linksLead}>{lead}</span>}
      {children}
    </p>
  );
}

const ALERT_ICON = { error: '!', success: '✓', info: 'i' } as const;

export function AuthAlert({ tone, children }: { tone: keyof typeof ALERT_ICON; children: React.ReactNode }) {
  return (
    <div className={`${styles.alert} ${styles[`alert_${tone}`]}`} role={tone === 'error' ? 'alert' : 'status'}>
      <span className={styles.alertIcon} aria-hidden="true">
        {ALERT_ICON[tone]}
      </span>
      <span className={styles.alertText}>{children}</span>
    </div>
  );
}

/** 카드 안 링크 (Body SemiBold · primary) */
export function AuthLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className={styles.link}>
      {children}
    </Link>
  );
}

/** 카드 안 회색 안내 문단 */
export function AuthNote({ children }: { children: React.ReactNode }) {
  return <p className={styles.note}>{children}</p>;
}

/** 동의 체크박스 (Figma Agreement Row/v2 · 20 · radius 4 · 선택 primary + 흰 체크 / 일부 선택 대시) */
export function AuthCheckbox({
  checked,
  indeterminate = false,
  label,
  strong = false,
  onChange,
}: {
  checked: boolean;
  indeterminate?: boolean;
  label: React.ReactNode;
  strong?: boolean;
  onChange: () => void;
}) {
  return (
    <label className={styles.checkLabel}>
      <input
        type="checkbox"
        className={styles.checkInput}
        checked={checked}
        ref={(el) => {
          if (el) el.indeterminate = indeterminate;
        }}
        onChange={onChange}
      />
      <span className={`${styles.checkText} ${strong ? styles.checkTextStrong : ''}`}>{label}</span>
    </label>
  );
}
