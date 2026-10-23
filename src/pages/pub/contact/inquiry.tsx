import { useState } from 'react';
import { Link } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { IconSurface } from '../../../components/core/Icon/IconSurface';
import { Button } from '../../../components/core/Button/Button';
import styles from './inquiry.module.scss';

const IMG = '/images/contact/inquiry';

// 문의 전에 확인해 보세요 (Figma PC 2415:1819)
const CHECK_LINKS = [
  { label: '요금제 비교하기', to: '/pub/product/pricing' },
  { label: '자주 묻는 질문', to: '/pub/contact/faq' },
  { label: '무료 체험 시작하기', to: '/pub/product/intro' },
];

/** 입력 라벨 + 필수 표시(*) */
function FieldLabel({ htmlFor, children, required }: { htmlFor?: string; children: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {children}
      {required && <span className={styles.required}>*</span>}
    </label>
  );
}

export default function ContactInquiry() {
  // 1. 문의 유형 선택 상태 (기본값: '도입 상담')
  const [inquiryType, setInquiryType] = useState('도입 상담');
  const inquiryTypes = ['도입 상담', '견적 문의', 'PoC · 기술 검증', '제휴', '기타'];

  // 2. 입력 폼 상태
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    estimatedScale: '',
    content: '',
  });

  // 3. 검토 중인 도입 방식 (다중 선택 가능)
  const [deploymentMethods, setDeploymentMethods] = useState<string[]>([]);
  const deploymentOptions = [
    '웹 브라우저',
    '온프레미스 (폐쇄망)',
    'REST API 연동',
    '아직 정하지 않음',
  ];

  // 4. 개인정보 수집 이용 동의
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const toggleDeployment = (method: string) => {
    if (deploymentMethods.includes(method)) {
      setDeploymentMethods(deploymentMethods.filter((m) => m !== method));
    } else {
      setDeploymentMethods([...deploymentMethods, method]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.name || !formData.email || !formData.content) {
      alert('필수 항목을 모두 입력해 주세요.');
      return;
    }
    if (!privacyAgreed) {
      alert('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }
    alert('문의가 성공적으로 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.');
  };

  return (
    <FrontLayout>
      <div className={styles.inquiryPage}>
        {/* 1. Hero (Figma PC 2415:1681 / Mobile 2422:1862 · 가운데 정렬 Compact) */}
        <HeroSection
          heroVariant="compact"
          align="center"
          className={styles.inquiryHero}
          eyebrow="Contact"
          title="xPrivacy 도입 문의"
          description="도입 방식과 처리 규모를 알려 주시면 구성과 견적을 안내해 드립니다."
        />

        {/* 2. 문의 폼 + 연락·바로가기 (Figma PC 2415:1705 / Mobile 2422:1911 · 2422:1993) */}
        <BasicSection bg="white" layout="vertical" align="left" className={styles.formSection}>
          <div className={styles.twoColumn}>
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* 문의 유형 */}
              <div className={styles.group}>
                <span className={styles.label}>
                  문의 유형<span className={styles.required}>*</span>
                </span>
                <div className={styles.chips}>
                  {inquiryTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`${styles.chip} ${inquiryType === type ? styles.chipSelected : ''}`}
                      aria-pressed={inquiryType === type}
                      onClick={() => setInquiryType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* 담당자 정보 */}
              <div className={`${styles.group} ${styles.groupContact}`}>
                <h3 className={styles.groupTitle}>담당자 정보</h3>
                <div className={styles.fieldGrid}>
                  <div className={styles.field}>
                    <FieldLabel htmlFor="company" required>기관·회사명</FieldLabel>
                    <input id="company" name="company" type="text" className={styles.input} placeholder="기관 또는 회사명을 입력해 주세요" value={formData.company} onChange={handleInputChange} required />
                  </div>
                  <div className={styles.field}>
                    <FieldLabel htmlFor="name" required>담당자명</FieldLabel>
                    <input id="name" name="name" type="text" className={styles.input} placeholder="이름을 입력해 주세요" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className={styles.field}>
                    <FieldLabel htmlFor="email" required>이메일</FieldLabel>
                    <input id="email" name="email" type="email" className={styles.input} placeholder="name@company.com" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div className={styles.field}>
                    <FieldLabel htmlFor="phone">연락처</FieldLabel>
                    <input id="phone" name="phone" type="tel" className={styles.input} placeholder="연락 가능한 번호" value={formData.phone} onChange={handleInputChange} />
                  </div>
                  <div className={styles.field}>
                    <FieldLabel htmlFor="department">부서 · 직급</FieldLabel>
                    <input id="department" name="department" type="text" className={styles.input} placeholder="예: 정보보호팀 · 주임" value={formData.department} onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              {/* 도입 검토 정보 (선택) */}
              <div className={`${styles.group} ${styles.groupReview}`}>
                <div className={styles.groupHead}>
                  <h3 className={styles.groupTitle}>도입 검토 정보</h3>
                  <span className={styles.optional}>(선택)</span>
                </div>
                <p className={styles.notice}>알고 계신 내용만 입력해 주세요. 상담 시 함께 확인합니다.</p>

                <div className={`${styles.field} ${styles.fieldChips}`}>
                  <span className={styles.label}>검토 중인 도입 방식</span>
                  <div className={styles.chips}>
                    {deploymentOptions.map((opt) => {
                      const isSelected = deploymentMethods.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`${styles.chip} ${isSelected ? styles.chipSelected : ''}`}
                          aria-pressed={isSelected}
                          onClick={() => toggleDeployment(opt)}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.field}>
                  <FieldLabel htmlFor="estimatedScale">예상 처리 규모</FieldLabel>
                  <input id="estimatedScale" name="estimatedScale" type="text" className={styles.input} placeholder="예: 월 영상 약 100시간, 동시 처리 2채널" value={formData.estimatedScale} onChange={handleInputChange} />
                  <p className={styles.helper}>견적은 동시 처리 채널 수와 월 영상<br className="mobileBr" /> 처리량을 기준으로 산정합니다.</p>
                </div>
              </div>

              {/* 문의 내용 */}
              <div className={styles.field}>
                <FieldLabel htmlFor="content" required>문의 내용</FieldLabel>
                <textarea id="content" name="content" className={styles.textarea} placeholder="도입 목적, 처리 환경(망분리 여부 등), 궁금한 점을 자유롭게 적어 주세요." value={formData.content} onChange={handleInputChange} required />
              </div>

              {/* 개인정보 동의 */}
              <div className={styles.consent}>
                <input
                  id="privacy"
                  type="checkbox"
                  className={styles.checkbox}
                  checked={privacyAgreed}
                  onChange={(e) => setPrivacyAgreed(e.target.checked)}
                />
                <div className={styles.consentText}>
                  <label htmlFor="privacy" className={styles.consentLabel}>
                    문의 처리를 위한 개인정보 수집·이용에 동의합니다.{' '}
                    <span className={styles.consentRequired}>(필수)</span>
                  </label>
                  <button type="button" className={styles.consentView} onClick={() => setShowPrivacyModal(true)}>
                    내용 보기
                  </button>
                </div>
              </div>

              <Button type="submit" variant="solid" color="primary" size="xl" className={styles.submit}>
                문의 보내기
              </Button>
            </form>

            {/* 연락 · 바로가기 */}
            <aside className={styles.side}>
              <div className={styles.contactCard}>
                <h4 className={styles.cardTitle}>바로 연락하기</h4>
                <a href="tel:02-576-3776" className={styles.contact}>
                  <IconSurface src={`${IMG}/glyph_phone.svg`} size={40} glyphFit="fill" />
                  <span className={styles.contactText}>
                    <span className={styles.contactLabel}>전화</span>
                    <span className={styles.contactValue}>02-576-3776</span>
                  </span>
                </a>
                <a href="mailto:help@vtex.co.kr" className={styles.contact}>
                  <IconSurface src={`${IMG}/glyph_mail.svg`} size={40} glyphFit="fill" />
                  <span className={styles.contactText}>
                    <span className={styles.contactLabel}>이메일</span>
                    <span className={styles.contactValue}>help@vtex.co.kr</span>
                  </span>
                </a>
              </div>

              <div className={styles.checkCard}>
                <h4 className={styles.cardTitle}>문의 전에 확인해 보세요</h4>
                <nav className={styles.checkLinks}>
                  {CHECK_LINKS.map((link) => (
                    <Link key={link.to} to={link.to} className={styles.checkLink}>
                      <span>{link.label}</span>
                      <img src={`${IMG}/icon_chevron_right.svg`} alt="" />
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </BasicSection>

        {/* 3. 개인정보 처리방침 모달 */}
        {showPrivacyModal && (
          <div className={styles.modalOverlay} onClick={() => setShowPrivacyModal(false)}>
            <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>개인정보 수집 및 이용 안내</h3>
                <button
                  type="button"
                  className={styles.modalCloseBtn}
                  onClick={() => setShowPrivacyModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className={styles.modalBody}>
                <p><strong>1. 수집 항목:</strong> 기관·회사명, 담당자명, 이메일, 연락처, 부서/직급</p>
                <p><strong>2. 수집 및 이용 목적:</strong> xPrivacy 서비스 도입 상담, 견적 안내 및 고객 문의 응대</p>
                <p><strong>3. 보유 및 이용 기간:</strong> 문의 처리 및 상담 완료 후 1년간 보관(관련 법령에 의거)</p>
                <p>귀하는 본 개인정보 수집 및 이용에 거부할 권리가 있으나, 거부 시 도입 문의 및 상담 서비스 이용이 제한될 수 있습니다.</p>
              </div>
              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.modalConfirmBtn}
                  onClick={() => {
                    setPrivacyAgreed(true);
                    setShowPrivacyModal(false);
                  }}
                >
                  동의하고 닫기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </FrontLayout>
  );
}
