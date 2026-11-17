import { useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { Icon } from '../../../components/core/Icon/Icon';
import { Button } from '../../../components/core/Button/Button';
import { AlertModal } from '../../../components/domain/Modal/AlertModal';
import styles from './inquiry.module.scss';

const IMG = '/images/contact/inquiry';

// 문의 유형 (Figma 3572:3213 · 1개 선택)
const INQUIRY_TYPES = ['도입 상담', '견적 문의', 'PoC · 기술 검증', '제휴', '기타'];

// 추가 정보 · 도입 환경 (Figma 3572:3265 · 1개 선택)
const DEPLOYMENT_OPTIONS = ['클라우드형', '온프레미스형', '상담 후 결정'];

// 함께 확인하면 좋은 정보 (Figma 3572:3306)
const CHECK_LINKS = [
  { label: '요금제 비교하기', to: '/pub/product/pricing' },
  { label: '자주 묻는 질문', to: '/pub/contact/faq' },
  { label: '무료 체험 시작하기', to: '/pub/product/intro' },
];

// 개인정보 수집·이용 동의서 원문 (Figma 4354:25127)
const PRIVACY_ITEMS = [
  { title: '1. 수집 항목', body: '성명, 이메일, 회사명, 직함, 연락처, 문의 내용' },
  { title: '2. 수집·이용 목적', body: '문의 사항 확인 및 담당자 연락, 고객 응대 및 이력 관리' },
  { title: '3. 보유 기간', body: '문의 접수 후 3년 또는 관계 법령에 따른 기간까지' },
  { title: '4. 동의 거부', body: '필수 항목 미동의 시 문의 접수가 제한될 수 있습니다.' },
];

const INITIAL_FORM = {
  company: '',
  name: '',
  email: '',
  phone: '',
  department: '',
  estimatedScale: '',
  content: '',
};

// 필수 입력 항목 (검증 안내용)
const REQUIRED_FIELDS: { name: 'company' | 'name' | 'email' | 'content'; label: string }[] = [
  { name: 'company', label: '기관·회사명' },
  { name: 'name', label: '담당자명' },
  { name: 'email', label: '이메일' },
  { name: 'content', label: '문의 내용' },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 알림창 케이스: done(접수 완료) · required(필수 입력) · email(형식 오류) · agree(동의 필요) · error(접수 실패)
// 대시보드(퍼블리싱 확인용)에서 ?alert=케이스 로 바로 열어 볼 수 있습니다.
type AlertCase = 'done' | 'required' | 'email' | 'agree' | 'error';
const ALERT_CASES: AlertCase[] = ['done', 'required', 'email', 'agree', 'error'];

/** 입력 라벨 + 필수 표시(*) */
function FieldLabel({
  htmlFor,
  children,
  required,
  emphasis = required,
}: {
  htmlFor?: string;
  children: string;
  required?: boolean;
  /** SemiBold 라벨 (필수 항목 기본 · 예상 처리 규모처럼 필수 표시 없이 강조할 때) */
  emphasis?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className={`${styles.label} ${emphasis ? '' : styles.labelPlain}`}>
      {children}
      {required && <span className={styles.required}>*</span>}
    </label>
  );
}

export default function ContactInquiry() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);
  const [formData, setFormData] = useState(INITIAL_FORM);

  // 추가 정보(선택): 접기/펼치기 · 도입 환경 1개 선택 · REST API 연동
  const [extraOpen, setExtraOpen] = useState(false);
  const [deployment, setDeployment] = useState('');
  const [needApi, setNeedApi] = useState(false);

  // 개인정보 수집·이용 동의
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  // 알림창 (접수 완료 Figma PC 700:23470 · MO 700:23475 / 검증·실패 케이스는 시안 없음 · 같은 AlertModal 로 구성)
  const queryCase = searchParams.get('alert') as AlertCase | null;
  const [alertCase, setAlertCase] = useState<AlertCase | null>(
    queryCase && ALERT_CASES.includes(queryCase) ? queryCase : null,
  );
  // 검증 알림을 닫은 뒤 포커스를 옮길 입력 id
  const focusAfterClose = useRef<string | null>(null);
  const [missingLabels, setMissingLabels] = useState<string[]>(REQUIRED_FIELDS.map((f) => f.label));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const missing = REQUIRED_FIELDS.filter((f) => !formData[f.name].trim());
    if (missing.length > 0) {
      setMissingLabels(missing.map((f) => f.label));
      focusAfterClose.current = missing[0].name;
      setAlertCase('required');
      return;
    }
    if (!EMAIL_PATTERN.test(formData.email.trim())) {
      focusAfterClose.current = 'email';
      setAlertCase('email');
      return;
    }
    if (!privacyAgreed) {
      focusAfterClose.current = null;
      setAlertCase('agree');
      return;
    }
    setAlertCase('done');
  };

  const handleDoneConfirm = () => {
    setAlertCase(null);
    setInquiryType(INQUIRY_TYPES[0]);
    setFormData(INITIAL_FORM);
    setExtraOpen(false);
    setDeployment('');
    setNeedApi(false);
    setPrivacyAgreed(false);
  };

  const closeAlert = () => {
    setAlertCase(null);
    const id = focusAfterClose.current;
    focusAfterClose.current = null;
    if (id) window.setTimeout(() => document.getElementById(id)?.focus(), 0);
  };

  return (
    <FrontLayout>
      <div className={styles.inquiryPage}>
        {/* 1. Hero (Figma PC 3572:3506 / MO 3572:3927 · 스타일은 contact 카테고리 공통) */}
        <HeroSection
          category="contact"
          heroVariant="compact"
          align="center"
          eyebrow="Contact"
          title="xPrivacy 도입 문의"
          description={
            <>
              궁금한 점을 남겨주시면 담당자가
              <br className="heroMoBr" /> 도입 방식과 견적을 안내해 드립니다.
            </>
          }
        />

        {/* 2. 브로셔 안내 (Figma PC 3572:3645 / MO 3572:3981) */}
        <BasicSection bg="white" layout="vertical" align="left" className={styles.brochureSection}>
          <div className={styles.brochureBox}>
            <div className={styles.brochureMain}>
              {/* 원본 표지 미리보기 240×135 (MO 112×63) */}
              <div className={styles.coverFrame} aria-hidden="true">
                <div className={styles.cover}>
                  <img src={`${IMG}/brochure_facelogo.svg`} alt="" className={styles.coverLogo} />
                  <span className={styles.coverTag}>공공기관 스마트 관제센터 도입 제안</span>
                  <span className={styles.coverSub}>CCTV 영상 반출 개인정보 비식별화 통합 솔루션</span>
                  <img src={`${IMG}/brochure_worldvertex.svg`} alt="" className={styles.coverMaker} />
                </div>
              </div>

              <div className={styles.brochureCopy}>
                <p className={styles.brochureEyebrow}>Brochure</p>
                <p className={styles.brochureTitle}>제품 소개 브로셔</p>
                <p className={styles.brochureDesc}>
                  주요 기능과 도입 방식을 <span className={styles.pcOnly}>브로셔에서 </span>살펴보세요.
                </p>
              </div>
            </div>

            <Button
              variant="subtle"
              bordered
              size="xl"
              className={styles.brochureButton}
              onClick={() => void navigate('/pub/contact/brochure')}
            >
              브로셔 보기
            </Button>
          </div>
        </BasicSection>

        {/* 3. 문의 폼 + 함께 확인하면 좋은 정보 (Figma PC 3572:3206 / MO 3572:3744 · 3572:3825) */}
        <BasicSection bg="white" layout="vertical" align="left" className={styles.formSection}>
          <div className={styles.formIntro}>
            <div className={styles.formIntroRow}>
              <h2 className={styles.formTitle}>문의하기</h2>
              <div className={styles.contactCard}>
                <a href="tel:02-576-3776" className={styles.contact}>
                  <span className={styles.contactIcon} aria-hidden="true">
                    <img src={`${IMG}/glyph_phone_inline.svg`} alt="" className={styles.contactGlyphPhone} />
                  </span>
                  <span className={styles.contactText}>
                    <span className={styles.contactLabel}>전화 문의</span>
                    <span className={styles.contactValue}>02-576-3776</span>
                  </span>
                </a>
                <a href="mailto:help@vtex.co.kr" className={styles.contact}>
                  <span className={styles.contactIcon} aria-hidden="true">
                    <img src={`${IMG}/glyph_mail_inline.svg`} alt="" className={styles.contactGlyphMail} />
                  </span>
                  <span className={styles.contactText}>
                    <span className={styles.contactLabel}>이메일 문의</span>
                    <span className={styles.contactValue}>help@vtex.co.kr</span>
                  </span>
                </a>
              </div>
            </div>
            <p className={styles.formNote}>* 표시는 필수 항목입니다.</p>
          </div>

          <div className={styles.formWrap}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {/* 문의 유형 */}
              <div className={styles.group} role="radiogroup" aria-label="문의 유형">
                <div className={styles.labelRow}>
                  <span className={styles.label}>
                    문의 유형<span className={styles.required}>*</span>
                  </span>
                  <span className={styles.hint}>1개 선택</span>
                </div>
                <div className={styles.chips}>
                  {INQUIRY_TYPES.map((type) => (
                    <label key={type} className={`${styles.chip} ${inquiryType === type ? styles.chipSelected : ''}`}>
                      <input
                        type="radio"
                        name="inquiryType"
                        className={styles.chipInput}
                        checked={inquiryType === type}
                        onChange={() => setInquiryType(type)}
                      />
                      <span className={styles.radio} aria-hidden="true" />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 담당자 정보 */}
              <div className={`${styles.group} ${styles.groupContact}`}>
                <h3 className={styles.groupTitle}>담당자 정보</h3>
                <div className={styles.fieldGrid}>
                  <div className={styles.field}>
                    <FieldLabel htmlFor="company" required>기관·회사명</FieldLabel>
                    <input id="company" name="company" type="text" className={styles.input} placeholder="기관 또는 회사명을 입력해 주세요" value={formData.company} onChange={handleInputChange} aria-required="true" />
                  </div>
                  <div className={styles.field}>
                    <FieldLabel htmlFor="name" required>담당자명</FieldLabel>
                    <input id="name" name="name" type="text" className={styles.input} placeholder="이름을 입력해 주세요" value={formData.name} onChange={handleInputChange} aria-required="true" />
                  </div>
                  <div className={styles.field}>
                    <FieldLabel htmlFor="email" required>이메일</FieldLabel>
                    <input id="email" name="email" type="email" className={styles.input} placeholder="name@company.com" value={formData.email} onChange={handleInputChange} aria-required="true" />
                  </div>
                  <div className={styles.field}>
                    <FieldLabel htmlFor="phone">연락처 (선택)</FieldLabel>
                    <input id="phone" name="phone" type="tel" className={styles.input} placeholder="연락 가능한 번호" value={formData.phone} onChange={handleInputChange} />
                  </div>
                </div>

                {/* 문의 내용 */}
                <div className={styles.field}>
                  <FieldLabel htmlFor="content" required>문의 내용</FieldLabel>
                  <textarea id="content" name="content" className={styles.textarea} placeholder="궁금한 점이나 도입 목적을 자유롭게 남겨 주세요." value={formData.content} onChange={handleInputChange} aria-required="true" />
                </div>
              </div>

              <div className={styles.submitArea}>
                {/* 추가 정보 (선택) · 펼치기/접기 */}
                <div className={styles.extra}>
                  <button
                    type="button"
                    className={styles.extraToggle}
                    aria-expanded={extraOpen}
                    aria-controls="extraFields"
                    onClick={() => setExtraOpen((prev) => !prev)}
                  >
                    <span className={styles.extraHead}>
                      <span className={styles.extraTitle}>추가 정보</span>
                      <span className={styles.extraOptional}>(선택)</span>
                    </span>
                    <span className={styles.extraLabel}>{extraOpen ? '접기' : '펼치기'}</span>
                  </button>

                  {extraOpen && (
                    <div id="extraFields" className={styles.extraFields}>
                      <p className={styles.extraNotice}>정해진 내용만 알려 주세요. 나머지는 상담 시 함께 확인합니다.</p>

                      <div className={styles.field} role="radiogroup" aria-label="도입 환경">
                        <span className={styles.label}>도입 환경 · 1개 선택</span>
                        <div className={styles.chips}>
                          {DEPLOYMENT_OPTIONS.map((opt) => (
                            <label key={opt} className={`${styles.chip} ${deployment === opt ? styles.chipSelected : ''}`}>
                              <input
                                type="radio"
                                name="deployment"
                                className={styles.chipInput}
                                checked={deployment === opt}
                                onChange={() => setDeployment(opt)}
                              />
                              <span className={styles.radio} aria-hidden="true" />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <label className={styles.checkRow}>
                        <input type="checkbox" className={styles.checkbox} checked={needApi} onChange={(e) => setNeedApi(e.target.checked)} />
                        <span>REST API 연동이 필요해요</span>
                      </label>

                      <div className={styles.field}>
                        <FieldLabel htmlFor="estimatedScale" emphasis>예상 처리 규모</FieldLabel>
                        <input id="estimatedScale" name="estimatedScale" type="text" className={styles.input} placeholder="예: 월 영상 약 100시간, 동시 처리 2채널" value={formData.estimatedScale} onChange={handleInputChange} />
                        <p className={styles.helper}>정확한 수치를 모르시면 대략적인 규모를 적어 주세요.</p>
                      </div>

                      <div className={styles.field}>
                        <FieldLabel htmlFor="department">부서·직급 (선택)</FieldLabel>
                        <input id="department" name="department" type="text" className={styles.input} placeholder="예: 정보보호팀 · 주임" value={formData.department} onChange={handleInputChange} />
                      </div>
                    </div>
                  )}
                </div>

                {/* 개인정보 수집·이용 동의 (Figma PC 4351:66133 · MO 4351:66360 · 원문 4354:25127)
                    본문에 노출되는 스크롤 박스 + 동의 체크 */}
                <div className={styles.privacy}>
                  <div
                    className={styles.privacyBox}
                    role="region"
                    aria-label="개인정보 수집 및 이용 동의서"
                    tabIndex={0}
                  >
                    <p className={styles.privacyTitle}>개인정보 수집 및 이용 동의서</p>
                    {PRIVACY_ITEMS.map((item) => (
                      <div key={item.title} className={styles.privacyItem}>
                        <p className={styles.privacyItemTitle}>{item.title}</p>
                        <p className={styles.privacyItemBody}>{item.body}</p>
                      </div>
                    ))}
                  </div>
                  <div className={styles.consent}>
                    <label className={styles.consentTouch}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={privacyAgreed}
                        onChange={(e) => setPrivacyAgreed(e.target.checked)}
                        aria-label="문의 처리를 위한 개인정보 수집·이용에 동의합니다. (필수)"
                      />
                    </label>
                    <span className={styles.consentLabel}>
                      문의 처리를 위한 개인정보 수집·이용에 동의합니다.{' '}
                      <span className={styles.consentRequired}>(필수)</span>
                    </span>
                  </div>
                </div>

                <Button type="submit" variant="solid" color="primary" size="xl" className={styles.submit}>
                  문의 보내기
                </Button>
              </div>
            </form>

            {/* 함께 확인하면 좋은 정보 */}
            <div className={styles.checkCard}>
              <h4 className={styles.cardTitle}>함께 확인하면 좋은 정보</h4>
              <nav className={styles.checkLinks}>
                {CHECK_LINKS.map((link) => (
                  <Link key={link.to} to={link.to} className={styles.checkLink}>
                    <span>{link.label}</span>
                    <Icon name="chevron-right" size={18} color="var(--color-primary)" />
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </BasicSection>

        {/* 4. 알림창 (AlertModal · 접수 완료 / 필수 입력 / 이메일 형식 / 동의 필요 / 접수 실패) */}
        <AlertModal
          isOpen={alertCase === 'done'}
          onClose={handleDoneConfirm}
          icon={`${IMG}/glyph_file_check.svg`}
          title={
            <>
              문의가
              <br className="heroMoBr" /> 접수되었습니다
            </>
          }
          description={
            <>
              남겨주신 내용을 확인한 뒤
              <br />
              입력하신 이메일로 답변드리겠습니다.
            </>
          }
        />
        <AlertModal
          isOpen={alertCase === 'required'}
          onClose={closeAlert}
          variant="warning"
          title="필수 항목을 입력해 주세요"
          description={
            <>
              {missingLabels.join(', ')}
              <br />
              항목이 비어 있습니다.
            </>
          }
        />
        <AlertModal
          isOpen={alertCase === 'email'}
          onClose={closeAlert}
          variant="warning"
          title="이메일 형식을 확인해 주세요"
          description={
            <>
              답변을 받을 수 있도록
              <br />
              올바른 이메일 주소를 입력해 주세요.
            </>
          }
        />
        <AlertModal
          isOpen={alertCase === 'agree'}
          onClose={closeAlert}
          variant="warning"
          title="개인정보 수집·이용에 동의해 주세요"
          description="문의 접수를 위해 개인정보 수집 및 이용 동의가 필요합니다."
        />
        <AlertModal
          isOpen={alertCase === 'error'}
          onClose={closeAlert}
          variant="error"
          title="문의 접수에 실패했습니다"
          description={
            <>
              일시적인 오류로 접수되지 않았습니다.
              <br />
              잠시 후 다시 시도해 주세요.
            </>
          }
        />
      </div>
    </FrontLayout>
  );
}
