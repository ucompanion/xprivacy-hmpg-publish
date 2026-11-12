import { useState } from 'react';
import styles from '../template.module.scss';
import { GuideSection } from '../components/GuideSection';
import { CodeBlock } from '../components/CodeBlock';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';
import { Tabs } from '../../../../components/core/Tabs/Tabs';
import { Modal } from '../../../../components/core/Modal/Modal';
import { Button } from '../../../../components/core/Button/Button';
import { AlertModal } from '../../../../components/domain/Modal/AlertModal';
import { BasicModal } from '../../../../components/domain/Modal/BasicModal';
import { EventModal } from '../../../../components/domain/Modal/EventModal';

export default function ModalGuidePage() {
  const [isBasicOpen, setIsBasicOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [alertCase, setAlertCase] = useState<'success' | 'warning' | 'error' | 'noDesc' | 'confirm' | null>(null);
  const [isDomainBasicOpen, setIsDomainBasicOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);

  const tabItems = [
    {
      id: 'core',
      label: 'Core',
      content: (
        <>
          <GuideSection title="1. Overview & Specs">
            <p className={styles.description}>
              Modal 컴포넌트는 `isOpen` 상태와 `onClose` 핸들러를 필수로 받으며, 헤더/바디/푸터 영역으로 나뉘어 있습니다.
            </p>
            <div className={styles.spec_table_wrapper}>
              <table className={styles.spec_table}>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>isOpen</code></td>
                    <td><code>boolean</code></td>
                    <td>(필수)</td>
                    <td>모달의 표시 여부를 결정합니다.</td>
                  </tr>
                  <tr>
                    <td><code>onClose</code></td>
                    <td><code>() =&gt; void</code></td>
                    <td>(필수)</td>
                    <td>닫기 버튼이나 오버레이 클릭 시 호출됩니다.</td>
                  </tr>
                  <tr>
                    <td><code>title</code></td>
                    <td><code>ReactNode</code></td>
                    <td>-</td>
                    <td>모달 헤더에 표시될 제목</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'sm' | 'md' | 'lg'</code></td>
                    <td><code>'md'</code></td>
                    <td>모달의 너비 크기</td>
                  </tr>
                  <tr>
                    <td><code>hideHeader</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>true일 경우 제목과 닫기 버튼 영역을 숨깁니다.</td>
                  </tr>
                  <tr>
                    <td><code>footer</code></td>
                    <td><code>ReactNode</code></td>
                    <td>-</td>
                    <td>모달 하단 버튼 영역에 들어갈 내용</td>
                  </tr>
                  <tr>
                    <td><code>role</code></td>
                    <td><code>'dialog' | 'alertdialog'</code></td>
                    <td><code>'dialog'</code></td>
                    <td>접근성 역할. 확인이 필요한 알림은 <code>alertdialog</code></td>
                  </tr>
                  <tr>
                    <td><code>aria-labelledby</code> · <code>aria-describedby</code></td>
                    <td><code>string</code></td>
                    <td>-</td>
                    <td>제목·설명 요소 id 연결</td>
                  </tr>
                  <tr>
                    <td><code>closeOnEsc</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Esc 키로 닫기</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GuideSection>

          <GuideSection title="2. Basic Usage">
            <p className={styles.description}>
              가장 일반적인 형태의 모달입니다. 열릴 때와 닫힐 때 같은 길이(0.2초)로 페이드되며, 닫힘이 끝난 뒤 DOM에서 제거됩니다.
            </p>
            <div className={styles.preview}>
              <Button onClick={() => setIsBasicOpen(true)}>기본 모달 열기</Button>
              <Modal 
                isOpen={isBasicOpen} 
                onClose={() => setIsBasicOpen(false)} 
                title="알림"
                footer={<Button onClick={() => setIsBasicOpen(false)}>확인</Button>}
              >
                모달의 본문 내용이 이곳에 들어갑니다.
              </Modal>
            </div>
            <CodeBlock code={`const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>기본 모달 열기</Button>
<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)} 
  title="알림"
  footer={<Button onClick={() => setIsOpen(false)}>확인</Button>}
>
  모달의 본문 내용이 이곳에 들어갑니다.
</Modal>`} />
          </GuideSection>

          <GuideSection title="3. Variants & States" defaultOpen={false}>
            <p className={styles.description}>
              `size="lg"`와 `hideHeader` 옵션을 조합하여 다양한 형태를 구성할 수 있습니다.
            </p>
            <div className={styles.preview}>
              <Button variant="outline" color="secondary" onClick={() => setIsCustomOpen(true)}>커스텀 모달 열기</Button>
              <Modal 
                isOpen={isCustomOpen} 
                onClose={() => setIsCustomOpen(false)} 
                size="lg"
                hideHeader
              >
                <div className={styles.modal_demo_content}>
                  <h3>헤더 없는 커스텀 모달</h3>
                  <p>hideHeader 속성을 주면 헤더가 완전히 사라집니다.</p>
                  <div className={styles.modal_actions}>
                    <Button onClick={() => setIsCustomOpen(false)}>닫기</Button>
                  </div>
                </div>
              </Modal>
            </div>
            <CodeBlock code={`<Modal 
  isOpen={isCustomOpen} 
  onClose={() => setIsCustomOpen(false)} 
  size="lg"
  hideHeader
>
  ...내용...
</Modal>`} />
          </GuideSection>
        </>
      )
    },
    {
      id: 'domain',
      label: 'Domain',
      content: (
        <>
          {/* 1. AlertModal */}
          <GuideSection title="1. AlertModal">
            <p className={styles.description}>
              완료 · 확인 필요 · 실패 같은 결과를 알리는 서비스 공통 알림창입니다. 유리 아이콘 + 큰 제목 + 설명 + 확인 버튼 구성(Figma 문의 / 접수 완료 PC 700:23470 · MO 700:23475)이며, 폼 검증과 제출 피드백에 사용합니다.
            </p>

            <div className={styles.sub_section}>
              <h3 className={styles.title_h3}>1.1. Specs</h3>
              <div className={styles.spec_table_wrapper}>
                <table className={styles.spec_table}>
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Type</th>
                      <th>Default</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>variant</code></td>
                      <td><code>'success' | 'warning' | 'error'</code></td>
                      <td><code>'success'</code></td>
                      <td>의미별 기본 아이콘: 성공(파랑 체크) · 경고(주황 느낌표) · 오류(빨강 X)</td>
                    </tr>
                    <tr>
                      <td><code>icon</code></td>
                      <td><code>string</code></td>
                      <td>(variant 아이콘)</td>
                      <td>글리프 SVG 경로로 아이콘 교체 (아이콘은 항상 노출)</td>
                    </tr>
                    <tr>
                      <td><code>title</code></td>
                      <td><code>ReactNode</code></td>
                      <td>(필수)</td>
                      <td>제목 (PC 40 / MO 32). 모바일 줄바꿈은 <code>&lt;br className="heroMoBr" /&gt;</code></td>
                    </tr>
                    <tr>
                      <td><code>description</code></td>
                      <td><code>ReactNode</code></td>
                      <td>-</td>
                      <td>제목 아래 안내 문구. 생략하면 설명 한 줄 높이만큼 여백을 유지</td>
                    </tr>
                    <tr>
                      <td><code>confirmText</code></td>
                      <td><code>string</code></td>
                      <td><code>'확인'</code></td>
                      <td>확인 버튼 문구</td>
                    </tr>
                    <tr>
                      <td><code>cancelText</code></td>
                      <td><code>string</code></td>
                      <td>-</td>
                      <td>지정하면 취소 버튼이 함께 노출 (확인/취소 2버튼)</td>
                    </tr>
                    <tr>
                      <td><code>onConfirm</code></td>
                      <td><code>() =&gt; void</code></td>
                      <td><code>onClose</code></td>
                      <td>확인 버튼 동작</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.sub_section} style={{ marginTop: '24px' }}>
              <h3 className={styles.title_h3}>1.2. Usage</h3>
              <div className={styles.preview} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <Button onClick={() => setAlertCase('success')}>성공</Button>
                <Button onClick={() => setAlertCase('warning')}>경고</Button>
                <Button onClick={() => setAlertCase('error')}>오류</Button>
                <Button variant="subtle" bordered onClick={() => setAlertCase('noDesc')}>설명 없음</Button>
                <Button variant="subtle" bordered onClick={() => setAlertCase('confirm')}>확인 / 취소</Button>

                <AlertModal
                  isOpen={alertCase === 'success'}
                  onClose={() => setAlertCase(null)}
                  title="문의가 접수되었습니다"
                  description="입력하신 이메일로 답변드리겠습니다."
                />
                <AlertModal
                  isOpen={alertCase === 'warning'}
                  onClose={() => setAlertCase(null)}
                  variant="warning"
                  title="필수 항목을 입력해 주세요"
                  description="기관·회사명 항목이 비어 있습니다."
                />
                <AlertModal
                  isOpen={alertCase === 'error'}
                  onClose={() => setAlertCase(null)}
                  variant="error"
                  title="문의 접수에 실패했습니다"
                  description="잠시 후 다시 시도해 주세요."
                />
                <AlertModal
                  isOpen={alertCase === 'noDesc'}
                  onClose={() => setAlertCase(null)}
                  title="변경 사항이 저장되었습니다"
                />
                <AlertModal
                  isOpen={alertCase === 'confirm'}
                  onClose={() => setAlertCase(null)}
                  variant="warning"
                  title="작성 중인 내용을 지울까요?"
                  description="지운 내용은 복구할 수 없습니다."
                  confirmText="지우기"
                  cancelText="취소"
                  onConfirm={() => setAlertCase(null)}
                />
              </div>
              <CodeBlock code={`{/* 성공 (기본) */}
<AlertModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="문의가 접수되었습니다"
  description="입력하신 이메일로 답변드리겠습니다."
/>

{/* 경고 · 오류 */}
<AlertModal variant="warning" title="필수 항목을 입력해 주세요" ... />
<AlertModal variant="error" title="문의 접수에 실패했습니다" ... />

{/* 설명 없음 (설명 한 줄 높이만큼 여백 유지) */}
<AlertModal title="변경 사항이 저장되었습니다" ... />

{/* 확인 / 취소 2버튼 */}
<AlertModal
  variant="warning"
  title="작성 중인 내용을 지울까요?"
  confirmText="지우기"
  cancelText="취소"
  onConfirm={handleClear}
  ...
/>`} />
              <p className={styles.description} style={{ marginTop: '16px' }}>
                실제 사용 예: 문의하기(<code>/pub/contact/inquiry</code>)의 접수 완료 · 필수 입력 · 이메일 형식 · 동의 필요 · 접수 실패 케이스. 퍼블리싱 대시보드에서 <code>?alert=done | required | email | agree | error</code>로 바로 열어 볼 수 있습니다.
              </p>
            </div>
          </GuideSection>

          {/* 2. BasicModal */}
          <GuideSection title="2. BasicModal" defaultOpen={false}>
            <p className={styles.description}>
              정형화된 타이틀과 본문 컨텐츠 영역을 가진 기본 모달 포맷입니다.
            </p>

            <div className={styles.sub_section}>
              <h3 className={styles.title_h3}>2.1. Specs</h3>
              <div className={styles.spec_table_wrapper}>
                <table className={styles.spec_table}>
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Type</th>
                      <th>Default</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>title</code></td>
                      <td><code>ReactNode</code></td>
                      <td>-</td>
                      <td>모달 헤더 타이틀</td>
                    </tr>
                    <tr>
                      <td><code>confirmText</code></td>
                      <td><code>string</code></td>
                      <td><code>'확인'</code></td>
                      <td>확인 버튼 텍스트</td>
                    </tr>
                    <tr>
                      <td><code>cancelText</code></td>
                      <td><code>string</code></td>
                      <td><code>'취소'</code></td>
                      <td>취소 버튼 텍스트</td>
                    </tr>
                    <tr>
                      <td><code>hideFooter</code></td>
                      <td><code>boolean</code></td>
                      <td><code>false</code></td>
                      <td>푸터 버튼 영역 숨김 여부</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.sub_section} style={{ marginTop: '24px' }}>
              <h3 className={styles.title_h3}>2.2. Usage</h3>
              <div className={styles.preview}>
                <Button onClick={() => setIsDomainBasicOpen(true)}>BasicModal 열기</Button>
                <BasicModal
                  isOpen={isDomainBasicOpen}
                  onClose={() => setIsDomainBasicOpen(false)}
                  title="안내사항"
                >
                  <div style={{ padding: '20px 0', textAlign: 'center' }}>
                    기본적인 모달 컨텐츠가 들어갑니다.
                  </div>
                </BasicModal>
              </div>
              <CodeBlock code={`<BasicModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="안내사항"
>
  <div>기본 모달 내용</div>
</BasicModal>`} />
            </div>
          </GuideSection>

          {/* 3. EventModal */}
          <GuideSection title="3. EventModal" defaultOpen={false}>
            <p className={styles.description}>
              이벤트 배너 이미지와 하단 '오늘 하루 보지 않기' 체크 옵션이 포함된 팝업입니다.
            </p>

            <div className={styles.sub_section}>
              <h3 className={styles.title_h3}>3.1. Specs</h3>
              <div className={styles.spec_table_wrapper}>
                <table className={styles.spec_table}>
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Type</th>
                      <th>Default</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>eventImageUrl</code></td>
                      <td><code>string</code></td>
                      <td>(필수)</td>
                      <td>팝업에 표시될 이벤트 이미지 URL</td>
                    </tr>
                    <tr>
                      <td><code>eventLink</code></td>
                      <td><code>string</code></td>
                      <td>-</td>
                      <td>클릭 시 이동할 이벤트 링크 URL</td>
                    </tr>
                    <tr>
                      <td><code>onHideToday</code></td>
                      <td><code>() =&gt; void</code></td>
                      <td>-</td>
                      <td>오늘 하루 보지 않기 클릭 핸들러</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.sub_section} style={{ marginTop: '24px' }}>
              <h3 className={styles.title_h3}>3.2. Usage</h3>
              <div className={styles.preview}>
                <Button onClick={() => setIsEventOpen(true)}>EventModal 열기</Button>
                <EventModal
                  isOpen={isEventOpen}
                  onClose={() => setIsEventOpen(false)}
                  eventImageUrl="https://via.placeholder.com/400x300?text=Event+Banner"
                  eventLink="#"
                />
              </div>
              <CodeBlock code={`<EventModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  eventImageUrl="/path/to/image.jpg"
  eventLink="/event/123"
/>`} />
            </div>
          </GuideSection>
        </>
      )
    }
  ];

  return (
    <DesignSystemLayout>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title_h1}>Modal</h1>
          <p className={styles.description}>
            현재 화면 위에 레이어를 띄워 중요한 정보를 전달하거나 사용자 입력을 요구할 때 사용하는 오버레이 컴포넌트입니다.
          </p>
        </header>

        <Tabs items={tabItems} defaultActiveId="core" />
      </div>
    </DesignSystemLayout>
  );
}
