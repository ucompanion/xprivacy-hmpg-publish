import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { SignupStepIndicator } from './components/SignupStepIndicator';
import styles from './signup-flow.module.scss';

export default function PubLoginTerms() {
  const navigate = useNavigate();

  const [term1, setTerm1] = useState(true);
  const [term2, setTerm2] = useState(false);
  const [openTerm1, setOpenTerm1] = useState(true);
  const [openTerm2, setOpenTerm2] = useState(false);

  const allChecked = term1 && term2;
  const isIndeterminate = (term1 || term2) && !allChecked;

  const handleToggleAll = () => {
    if (allChecked) {
      setTerm1(false);
      setTerm2(false);
    } else {
      setTerm1(true);
      setTerm2(true);
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (allChecked) {
      navigate('/pub/login/signup');
    }
  };

  return (
    <FrontLayout>
      <div className={styles.page_wrap}>
        <div className={styles.card}>
          <SignupStepIndicator currentStep={1} />

          <div className={styles.header}>
            <h1 className={styles.title}>회원가입</h1>
            <p className={styles.subtitle}>서비스 이용을 위해 약관에 동의해주세요.</p>
          </div>

          <form onSubmit={handleNext}>
            {/* 약관에 모두 동의합니다 */}
            <div className={styles.terms_all_wrap} onClick={handleToggleAll}>
              <span
                className={`${styles.custom_checkbox} ${allChecked ? styles.checked : isIndeterminate ? styles.indeterminate : ''}`}
                role="checkbox"
                aria-checked={allChecked}
                tabIndex={0}
              >
                {allChecked ? (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : isIndeterminate ? (
                  <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 1H10" stroke="white" strokeWidth="2" />
                  </svg>
                ) : null}
              </span>
              <span className={styles.label_all}>약관에 모두 동의합니다.</span>
            </div>

            {/* 약관 목록 */}
            <div className={styles.terms_list}>
              {/* 약관 1: 이용약관 */}
              <div className={styles.terms_item}>
                <div className={styles.terms_header}>
                  <label className={styles.terms_label} onClick={() => setTerm1(!term1)}>
                    <span className={`${styles.custom_checkbox} ${term1 ? styles.checked : ''}`}>
                      {term1 && (
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span>[필수] 이용약관 동의</span>
                  </label>
                  <button
                    type="button"
                    className={styles.btn_view}
                    onClick={() => setOpenTerm1(!openTerm1)}
                  >
                    {openTerm1 ? '접기' : '보기'}
                  </button>
                </div>
                {openTerm1 && (
                  <div className={styles.terms_body}>
                    <p><strong>제1조 (목적)</strong></p>
                    <p>이 약관은 서비스 이용과 관련하여 필요한 사항을 규정함을 목적으로 합니다.</p>
                    <p><strong>제2조 (이용계약의 성립)</strong></p>
                    <p>이용계약은 회원이 본 약관에 동의하고 회사가 정한 양식에 따라 가입을 신청한 후 회사가 이를 승낙함으로써 체결됩니다.</p>
                  </div>
                )}
              </div>

              {/* 약관 2: 개인정보 수집 및 이용 */}
              <div className={styles.terms_item}>
                <div className={styles.terms_header}>
                  <label className={styles.terms_label} onClick={() => setTerm2(!term2)}>
                    <span className={`${styles.custom_checkbox} ${term2 ? styles.checked : ''}`}>
                      {term2 && (
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span>[필수] 개인정보 수집 및 이용 동의</span>
                  </label>
                  <button
                    type="button"
                    className={styles.btn_view}
                    onClick={() => setOpenTerm2(!openTerm2)}
                  >
                    {openTerm2 ? '접기' : '보기'}
                  </button>
                </div>
                {openTerm2 && (
                  <div className={styles.terms_body}>
                    <p><strong>1. 수집하는 개인정보 항목</strong></p>
                    <p>이름, 이메일, 비밀번호 등 회원 가입 및 서비스 제공에 필요한 최소한의 정보를 수집합니다.</p>
                    <p><strong>2. 개인정보의 수집 및 이용목적</strong></p>
                    <p>회원 식별, 서비스 제공 및 계약 이행, 고객 상담 및 고지사항 전달 등을 위해 활용됩니다.</p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className={`${styles.btn_primary} ${allChecked ? '' : styles.disabled}`}
              disabled={!allChecked}
            >
              다음
            </button>
          </form>

          <div className={styles.footer_links}>
            <span>
              이미 계정이 있으신가요?
              <Link to="/pub/login" className={styles.link}>
                로그인
              </Link>
            </span>
          </div>
        </div>
      </div>
    </FrontLayout>
  );
}
