import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { IconSurface } from '../../../components/core/Icon/IconSurface';
import { Button } from '../../../components/core/Button/Button';
import styles from './faq.module.scss';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  glyph: string;
  items: FaqItem[];
}

// FAQ 목록 (Figma PC 2408:1434 / Mobile 2408:2195)
const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: '도입 및 연동',
    glyph: '/images/product/pricing/glyph_onpremise.svg',
    items: [
      {
        id: 'cat1-0',
        question: '외부 인터넷 사용이 제한된 환경에서도 사용할 수 있나요?',
        answer:
          '네. 내부망 서버에 설치해 사용하는 온프레미스 방식을 지원합니다. 구체적인 구축 방식은 조직의 네트워크와 보안 정책을 확인한 뒤 결정합니다.',
      },
      {
        id: 'cat1-1',
        question: '웹 방식과 온프레미스 방식은 어떻게 다른가요?',
        answer:
          '웹 방식은 별도의 프로그램 설치 없이 브라우저에서 작업합니다. 온프레미스 방식은 조직의 내부 서버에 구축해 운영합니다. 처리 규모와 보안 정책에 맞는 방식을 선택할 수 있습니다.',
      },
      {
        id: 'cat1-2',
        question: '기존 시스템과 연동할 수 있나요?',
        answer:
          'REST API를 통해 기존 업무 시스템과 비식별 처리 기능을 연동할 수 있습니다. 연동 범위와 구현 방식은 사용 중인 시스템을 확인한 뒤 안내합니다.',
      },
      {
        id: 'cat1-3',
        question: '온프레미스 구축에는 어떤 서버가 필요한가요?',
        answer:
          '필요한 서버 구성은 영상 해상도와 처리량, 동시 작업 수, 사용할 기능에 따라 달라집니다. 도입 상담에서 운영 환경을 확인하고 적정 사양을 안내합니다.',
      },
    ],
  },
  {
    title: '기능 및 작업',
    glyph: '/images/features/rest-api/glyph_sliders.svg',
    items: [
      {
        id: 'cat2-0',
        question: '어떤 대상을 비식별 처리할 수 있나요?',
        answer:
          '이미지와 영상에서 얼굴, 신체, 차량 번호판을 탐지해 처리할 수 있습니다. 얼굴에는 모자이크·마스킹·블러·가상 얼굴을, 신체와 번호판에는 모자이크·마스킹·블러를 적용할 수 있습니다. 이용 가능한 기능은 상품과 계약 조건에 따라 다를 수 있습니다.',
      },
      {
        id: 'cat2-1',
        question: '가상 얼굴은 어떤 기능인가요?',
        answer:
          '영상 속 인물의 얼굴을 가상의 얼굴로 치환해 원본 신원 노출을 줄이고, 장면의 자연스러운 인상을 유지하도록 돕는 기능입니다. 가상 얼굴은 얼굴 영역에 적용되며, 이용 가능 여부는 상품에 따라 다릅니다.',
      },
      {
        id: 'cat2-2',
        question: '어떤 파일을 처리할 수 있나요?',
        answer:
          'MP4·MOV 영상과 JPG·PNG 이미지 등을 처리할 수 있습니다. 파일별 이용 가능 여부와 입력 조건은 사용 환경에 따라 확인해 주세요.',
      },
      {
        id: 'cat2-3',
        question: '영상 처리 시간은 얼마나 걸리나요?',
        answer:
          '영상의 길이와 해상도, 등장 인원, 선택한 처리 방식, 서버 환경과 작업량에 따라 달라집니다. 특정 업무에 필요한 처리 시간은 실제 영상으로 검증하는 것이 가장 정확합니다.',
      },
      {
        id: 'cat2-4',
        question: '특정 인물만 선택해 처리할 수 있나요?',
        answer:
          '지능형 자동 편집기(Beta)에서는 탐지된 인물을 썸네일로 확인하고 처리 대상을 선택할 수 있습니다. 필요한 경우 비식별 영역을 직접 설정하거나 조정할 수도 있습니다.',
      },
      {
        id: 'cat2-5',
        question: '자동 탐지 결과를 수정할 수 있나요?',
        answer:
          '네. 처리 결과를 확인한 뒤 누락된 영역을 추가하거나 적용 영역을 조정할 수 있습니다. 외부에 제공하거나 공개할 영상은 최종 결과를 검수하시기를 권장합니다.',
      },
    ],
  },
  {
    title: '개인정보 보호',
    glyph: '/images/features/rest-api/glyph_shield_check.svg',
    items: [
      {
        id: 'cat3-0',
        question: 'AI가 처리 대상을 모두 찾아주나요?',
        answer:
          '탐지 결과는 촬영 각도, 조명, 해상도, 가림, 움직임 등에 따라 달라질 수 있습니다. 자동 처리 후에는 누락되거나 충분히 가려지지 않은 부분이 없는지 확인하고 필요한 영역을 보완해 주세요.',
      },
      {
        id: 'cat3-1',
        question: '처리된 영상에서 원본 얼굴을 다시 볼 수 있나요?',
        answer:
          'xPrivacy는 처리 결과를 원본으로 되돌리는 기능을 제공하지 않습니다. 다른 방식으로 다시 처리해야 한다면 보관 중인 원본 파일로 새 작업을 진행해야 합니다. 원본 파일은 조직의 보관·접근·파기 정책에 따라 별도로 관리해 주세요.',
      },
      {
        id: 'cat3-2',
        question: '얼굴을 처리하면 영상 속 인물을 알아볼 수 없나요?',
        answer:
          '얼굴을 처리해도 음성, 의복, 문신, 주변 장면 등 다른 단서로 인물을 알아볼 가능성이 있습니다. 영상의 이용 목적과 공개 범위를 고려해 결과물 전체를 확인해 주세요.',
      },
      {
        id: 'cat3-3',
        question: 'CCTV 열람이나 영상 반출 업무에도 사용할 수 있나요?',
        answer:
          '네. 영상 속 다른 사람의 얼굴이나 차량 번호판 등을 가리는 작업에 활용할 수 있습니다. 실제 열람·제공 가능 여부와 필요한 보호조치는 영상의 내용, 제공 목적, 관련 법령과 조직의 내부 절차에 따라 판단해야 합니다.',
      },
      {
        id: 'cat3-4',
        question: 'xPrivacy를 사용하면 개인정보 보호 관련 의무를 모두 충족하나요?',
        answer:
          'xPrivacy는 이미지와 영상의 개인정보 보호를 돕는 기술적 수단입니다. 개인정보 처리의 적법성은 이용 목적과 근거, 접근 권한, 보관·파기, 제공 절차 등을 함께 검토해야 합니다.',
      },
    ],
  },
  {
    title: '체험 및 문의',
    glyph: '/images/contact/faq/glyph_message.svg',
    items: [
      {
        id: 'cat4-0',
        question: '도입 전에 사용해 볼 수 있나요?',
        answer:
          '홈페이지에서 무료 체험을 시작할 수 있습니다. 기업이나 기관의 운영 환경에서 기능 검증이 필요한 경우에는 문의해 주세요. 체험 조건과 제공 범위는 신청 시 안내되는 내용을 확인해 주세요.',
      },
      {
        id: 'cat4-1',
        question: '상품별로 사용할 수 있는 기능이 다른가요?',
        answer:
          '네. Basic, Pro, Enterprise는 제공 기능과 도입 방식이 다릅니다. 가상 얼굴, 신체 비식별, 온프레미스 구축 등 필요한 기능을 기준으로 홈페이지의 상품 안내를 확인하거나 상담을 요청해 주세요.',
      },
      {
        id: 'cat4-2',
        question: '자세한 도입 조건은 어디에 문의하면 되나요?',
        answer:
          '홈페이지의 ‘문의하기’를 이용하거나 전화 02-576-3776, 이메일 help@vtex.co.kr로 연락해 주세요.',
      },
    ],
  },
];

export default function PubContactFaq() {
  const navigate = useNavigate();
  // 첫 번째 항목(도입 및 연동의 1번 질문) 기본 열림 상태
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'cat1-0': true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <FrontLayout>
      <div className={styles.faqPage}>
        {/* 1. Hero (Figma PC 2408:1774 / Mobile 2408:2460 · 가운데 정렬 Compact) */}
        <HeroSection
          heroVariant="compact"
          align="center"
          className={styles.faqHero}
          eyebrow="FAQ"
          title="자주 묻는 질문"
          description="xPrivacy의 도입 방식, 비식별 기능, 결과 검수와 이용 방법을 확인해 보세요."
        />

        {/* 2. FAQ 목록 (Figma PC 2408:1433 / Mobile 2408:2194) */}
        <BasicSection bg="white" layout="vertical" align="left">
          <div className={styles.faqGroups}>
            {FAQ_CATEGORIES.map((cat) => (
              <section key={cat.title} className={styles.faqGroup}>
                <div className={styles.groupHead}>
                  <IconSurface src={cat.glyph} size={48} sizeMo={40} glyphFit="fill" />
                  <h2 className={styles.groupTitle}>{cat.title}</h2>
                  <span className={styles.groupCount}>질문 {cat.items.length}개</span>
                </div>

                <ul className={styles.faqItems}>
                  {cat.items.map((item) => {
                    const isOpen = Boolean(openItems[item.id]);
                    return (
                      <li key={item.id} className={styles.faqItem}>
                        <button
                          type="button"
                          className={styles.question}
                          onClick={() => toggleItem(item.id)}
                          aria-expanded={isOpen}
                        >
                          <span className={styles.qLabel} aria-hidden="true">
                            Q.
                          </span>
                          <span className={styles.qText}>{item.question}</span>
                          <img
                            src="/images/contact/faq/icon_chevron_down.svg"
                            alt=""
                            className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                          />
                        </button>

                        {isOpen && <p className={styles.answer}>{item.answer}</p>}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </BasicSection>

        {/* 3. 관련 정보·다음 행동 (Figma PC 2409:1679 / Mobile 2409:1684) */}
        <BasicSection bg="white" layout="vertical" align="left" className={styles.nextSection}>
          <div className={styles.nextBox}>
            <p className={styles.nextTitle}>원하는 답을 찾지 못했나요?</p>
            <Button
              variant="outline"
              color="neutral"
              size="xl"
              className={styles.nextButton}
              onClick={() => void navigate('/pub/contact/inquiry')}
            >
              문의하기
            </Button>
          </div>
        </BasicSection>
      </div>
    </FrontLayout>
  );
}
