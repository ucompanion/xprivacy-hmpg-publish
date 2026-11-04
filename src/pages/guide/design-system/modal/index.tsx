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
  const [isAlertOpen, setIsAlertOpen] = useState(false);
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
                </tbody>
              </table>
            </div>
          </GuideSection>

          <GuideSection title="2. Basic Usage">
            <p className={styles.description}>
              가장 일반적인 형태의 모달입니다.
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
              실제 서비스 운영 환경에서 사용되는 알럿 확인창으로, 헤더 없이 중앙 메시지와 확인/취소 버튼만 제공되는 가벼운 모달입니다.
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
                      <td><code>message</code></td>
                      <td><code>string</code></td>
                      <td>(필수)</td>
                      <td>모달 본문에 노출될 안내 메시지</td>
                    </tr>
                    <tr>
                      <td><code>onConfirm</code></td>
                      <td><code>() =&gt; void</code></td>
                      <td>-</td>
                      <td>확인 버튼 클릭 시 실행될 핸들러</td>
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
                      <td>취소 버튼 텍스트 (onConfirm 제공 시 노출)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.sub_section} style={{ marginTop: '24px' }}>
              <h3 className={styles.title_h3}>1.2. Usage</h3>
              <div className={styles.preview}>
                <Button onClick={() => setIsAlertOpen(true)}>AlertModal 열기</Button>
                <AlertModal 
                  isOpen={isAlertOpen} 
                  onClose={() => setIsAlertOpen(false)}
                  message="정말 삭제하시겠습니까?"
                  onConfirm={() => {
                    alert('삭제되었습니다.');
                    setIsAlertOpen(false);
                  }}
                />
              </div>
              <CodeBlock code={`<AlertModal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  message="정말 삭제하시겠습니까?"
  onConfirm={() => handleConfirm()}
/>`} />
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
