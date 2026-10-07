import styles from '../template.module.scss';
import ovStyles from './overview.module.scss';
import { GuideSection } from '../components/GuideSection';
import { CodeBlock } from '../components/CodeBlock';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';
import { Button } from '../../../../components/core/Button/Button';
import { Badge } from '../../../../components/core/Badge/Badge';

export default function OverviewGuidePage() {
  return (
    <DesignSystemLayout>
      <div className={styles.wrapper}>
        {/* 가이드 헤더 */}
        <header className={styles.header}>
          <h1 className={styles.title_h1}>Design System Overview</h1>
          <p className={styles.description}>
            xPrivacy 웹 서비스의 일관된 사용자 경험(UX)과 고품질 퍼블리싱 생산성을 위한 디자인 시스템 가이드입니다.<br />
            컴포넌트의 3대 아키텍처 계층(Foundation, Core, Domain), 범용 프로퍼티 규약, 시맨틱 색상 체계를 안내합니다.
          </p>
        </header>

        {/* 1. 컴포넌트 아키텍처 3대 계층 */}
        <GuideSection title="1. Component Architecture (컴포넌트 3대 계층)">
          <p className={styles.description}>
            xPrivacy 디자인 시스템은 유지보수성과 재사용성을 극대화하기 위해 역할을 명확히 구분한 3단계 레이어로 설계되었습니다.
          </p>

          <div className={ovStyles.arch_grid}>
            {/* Foundation */}
            <div className={`${ovStyles.arch_card} ${ovStyles.foundation}`}>
              <span className={ovStyles.card_badge}>Layer 1</span>
              <h3 className={ovStyles.card_title}>
                Foundation
                <span className={ovStyles.card_subtitle}>(디자인 토큰)</span>
              </h3>
              <p className={ovStyles.card_desc}>
                UI의 뼈대가 되는 가장 원자적인 디자인 단위입니다. 컴포넌트 로직이 배제된 순수 CSS/SCSS 디자인 토큰으로 제공됩니다.
              </p>
              <div className={ovStyles.card_examples}>
                <strong>주요 구성 요소:</strong>
                <code>Colors</code>
                <code>Typography</code>
                <code>Elevator (그림자)</code>
                <code>Utilities</code>
              </div>
            </div>

            {/* Core Components */}
            <div className={`${ovStyles.arch_card} ${ovStyles.core}`}>
              <span className={ovStyles.card_badge}>Layer 2</span>
              <h3 className={ovStyles.card_title}>
                Core Components
                <span className={ovStyles.card_subtitle}>(공통 UI 원형)</span>
              </h3>
              <p className={ovStyles.card_desc}>
                비즈니스 로직과 서비스 규칙이 철저히 배제된 순수한 범용 UI 컴포넌트입니다. 높은 조합성과 무상태(Stateless)를 지향합니다.
              </p>
              <div className={ovStyles.card_examples}>
                <strong>대표 컴포넌트:</strong>
                <code>Button</code>
                <code>Badge</code>
                <code>Modal</code>
                <code>Form</code>
                <code>Tabs</code>
                <code>Accordion</code>
                <code>Icon</code>
              </div>
            </div>

            {/* Domain Components */}
            <div className={`${ovStyles.arch_card} ${ovStyles.domain}`}>
              <span className={ovStyles.card_badge}>Layer 3</span>
              <h3 className={ovStyles.card_title}>
                Domain Components
                <span className={ovStyles.card_subtitle}>(서비스 전용 컴포넌트)</span>
              </h3>
              <p className={ovStyles.card_desc}>
                실제 업무 화면과 서비스 비즈니스 정책(약관 동의, 결재/처리 상태, CTA 전환 등)에 맞춰 완성된 최종 서비스 전용 컴포넌트입니다.
              </p>
              <div className={ovStyles.card_examples}>
                <strong>대표 컴포넌트:</strong>
                <code>CtaButton (가입/시작)</code>
                <code>StatusBadge (상태코드)</code>
                <code>AgreeCheckbox (약관동의)</code>
                <code>AlertModal (확인창)</code>
                <code>FormSubmitButton (저장)</code>
              </div>
            </div>
          </div>

          {/* 의사결정 매트릭스 */}
          <div className={ovStyles.decision_callout}>
            <h4>💡 Core 컴포넌트 직접 호출 vs Domain 컴포넌트 생성 기준 (실무 의사결정)</h4>
            <ul>
              <li>
                <strong>1. 도메인 컴포넌트(Domain)를 생성하는 기준 [서비스 공통 패턴]:</strong><br />
                특정 단일 화면에 국한되지 않고, <strong>서비스 내 여러 화면에 걸쳐 반복 재사용되는 공통 업무 정책·고유 텍스트·상태 코드</strong>가 결합된 경우에만 생성합니다.<br />
                <em>예: 여러 페이지에 걸쳐 동일하게 노출되는 메인 전환 버튼(CtaButton), 회원가입/신청 공통 약관 동의(AgreeCheckbox), 업무 처리 상태 뱃지(StatusBadge) 등</em>
              </li>
              <li>
                <strong>2. 코어 컴포넌트(Core)를 직접 호출하는 기준 [화면 개별 / 일회성 UI]:</strong><br />
                서비스 공통이 아닌 도메인 컴포넌트를 불필요하게 생성하지 않을 경우 코어 컴포넌트를 사용합니다.<br />
                화면에서 Core 컴포넌트(Button, Badge, Modal, Form 등)를 직접 import하여 속성(variant, color, size 등)을 조합해 즉시 호출하여 사용합니다.<br />
                <em>예: 특정 관리자 상세 페이지의 '데이터 내보내기' 버튼, 개별 안내 팝업 모달, 단순 목록 테이블의 행 삭제 버튼 등</em>
              </li>
              <li>
                <strong>3. 핵심 구현 원칙 (Preset Wrapper):</strong><br />
                도메인 컴포넌트를 생성할 때도 새로운 HTML 태그를 처음부터 만들지 않고, <strong>반드시 Core 컴포넌트를 import하여 서비스 기본값(Preset)을 부여하고 감싸는 형태</strong>로 구현해야 전체 시스템의 일관성이 보장됩니다.
              </li>
            </ul>
          </div>
        </GuideSection>

        {/* 2. 범용 프로퍼티 규약 */}
        <GuideSection title="2. Universal Property Conventions (범용 프로퍼티 규약)">
          <p className={styles.description}>
            모든 UI 컴포넌트는 직관적인 개발자 경험(DX)을 위해 동일한 명칭과 값의 규칙을 따릅니다.
          </p>

          <div className={styles.spec_table_wrapper}>
            <table className={styles.spec_table}>
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>설명 및 규칙</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>variant</code></td>
                  <td><code>'solid' | 'outline' | 'ghost'</code></td>
                  <td><code>'solid'</code></td>
                  <td>
                    컴포넌트의 시각적 형태.<br />
                    • <strong>solid</strong>: 배경이 채워진 기본형 (가장 높은 시각적 우선순위)<br />
                    • <strong>outline</strong>: 투명 배경 + 외곽선 테두리 (보조 액션)<br />
                    • <strong>ghost</strong>: 테두리와 배경 없음, 호버 시에만 반응 (유틸리티/텍스트형)
                  </td>
                </tr>
                <tr>
                  <td><code>color</code></td>
                  <td><code>'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'neutral'</code></td>
                  <td><code>'primary'</code></td>
                  <td>
                    컴포넌트의 의미론적(Semantic) 색상 테마.<br />
                    서비스 전반에서 일관된 의미(주요액션, 보조, 주의, 성공 등)를 전달합니다.
                  </td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'sm' | 'md' | 'lg'</code></td>
                  <td><code>'md'</code></td>
                  <td>
                    일관된 T-Shirt Sizing 체계.<br />
                    • <strong>sm</strong>: 콤팩트 테이블, 모바일 보조 영역<br />
                    • <strong>md</strong>: 기본 디폴트 크기<br />
                    • <strong>lg</strong>: 화면의 주요 CTA 및 강조 영역
                  </td>
                </tr>
                <tr>
                  <td><code>status</code></td>
                  <td><code>'TODO' | 'IN_PROGRESS' | 'DONE' | 'REJECTED'</code></td>
                  <td>-</td>
                  <td>
                    서비스 전용 컴포넌트(StatusBadge 등) 전용 업무 상태 코드. 매핑된 라벨과 색상을 자동 적용합니다.
                  </td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>
                    사용자 인터랙션을 차단하고 비활성화 스타일(투명도 감소, cursor: not-allowed)을 부여합니다.
                  </td>
                </tr>
                <tr>
                  <td><code>isLoading</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>
                    비동기 통신 중 로딩 인디케이터를 노출하고 연속 클릭에 의한 중복 요청을 차단합니다.
                  </td>
                </tr>
                <tr>
                  <td><code>...restProps</code></td>
                  <td><code>HTMLAttributes&lt;T&gt;</code></td>
                  <td>-</td>
                  <td>
                    표준 HTML 속성(<code>onClick</code>, <code>aria-*</code>, <code>id</code>, <code>type</code> 등)을 100% 온전히 루트 엘리먼트로 위임합니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.sub_section} style={{ marginTop: '24px' }}>
            <h3 className={styles.title_h3}>2.1. Property Combination Example</h3>
            <p className={styles.description} style={{ marginBottom: '12px' }}>
              공통 속성(variant, color, size)을 조합하여 일관된 위계와 의미를 직관적으로 전달합니다.
            </p>
            <div className={`${styles.preview} ${styles.wrap}`}>
              <Button variant="solid" color="primary" size="md">Solid Primary</Button>
              <Button variant="outline" color="secondary" size="md">Outline Secondary</Button>
              <Button variant="solid" color="danger" size="md">Solid Danger</Button>
              <Button variant="ghost" color="neutral" size="sm">Ghost Neutral (sm)</Button>
              <Badge color="primary">Badge Primary</Badge>
              <Badge color="success">Badge Success</Badge>
            </div>
            <CodeBlock code={`<Button variant="solid" color="primary" size="md">Solid Primary</Button>
<Button variant="outline" color="secondary" size="md">Outline Secondary</Button>
<Button variant="solid" color="danger" size="md">Solid Danger</Button>
<Button variant="ghost" color="neutral" size="sm">Ghost Neutral (sm)</Button>
<Badge color="primary">Badge Primary</Badge>
<Badge color="success">Badge Success</Badge>`} />
          </div>
        </GuideSection>

        {/* 3. 시맨틱 컬러 및 상태 체계 */}
        <GuideSection title="3. Semantic Color System (시맨틱 색상 체계)">
          <p className={styles.description}>
            색상은 단순한 장식이 아닌 서비스의 규칙과 상태를 사용자에게 직관적으로 전달하는 언어입니다.
          </p>

          <div className={styles.spec_table_wrapper}>
            <table className={styles.spec_table}>
              <thead>
                <tr>
                  <th>Semantic Token</th>
                  <th>Key Color</th>
                  <th>의미 및 사용 맥락</th>
                  <th>서비스 상태 코드 매핑</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>primary</code></td>
                  <td><Badge color="primary">#0f4c81 / #3b82f6</Badge></td>
                  <td>핵심 브랜드 컬러, 주요 전환 유도(CTA), 긍정적 메인 액션</td>
                  <td><code>REJECTED</code> (디자인 가이드 반려 테마)</td>
                </tr>
                <tr>
                  <td><code>secondary</code></td>
                  <td><Badge color="neutral">#64748b (Slate)</Badge></td>
                  <td>보조 인터랙션, 취소, 이전, 부가 기능</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><code>success</code></td>
                  <td><Badge color="success">#10b981 (Emerald)</Badge></td>
                  <td>성공, 승인, 완료, 정상 처리</td>
                  <td><code>DONE</code> (완료)</td>
                </tr>
                <tr>
                  <td><code>warning</code></td>
                  <td><Badge color="warning">#f59e0b (Amber)</Badge></td>
                  <td>주의 요망, 심사/검토 중, 대기, 진행 상태</td>
                  <td><code>IN_PROGRESS</code> (진행중)</td>
                </tr>
                <tr>
                  <td><code>danger</code></td>
                  <td><Badge color="primary" style={{ background: '#ef4444' }}>#ef4444 (Rose)</Badge></td>
                  <td>삭제, 거절, 영구 손실, 긴급 오류 경고</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><code>neutral</code></td>
                  <td><Badge color="neutral">#94a3b8 (Gray)</Badge></td>
                  <td>대기, 일반 메타데이터, 부가 정보 라벨</td>
                  <td><code>TODO</code> (대기중)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GuideSection>
      </div>
    </DesignSystemLayout>
  );
}
