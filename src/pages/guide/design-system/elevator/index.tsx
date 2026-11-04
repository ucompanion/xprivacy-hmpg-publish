import styles from '../template.module.scss';
import elStyles from './elevator.module.scss';
import { GuideSection } from '../components/GuideSection';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';

// 단일 Elevator(그림자) 블록 렌더링을 위한 공통 컴포넌트
const ElevatorBlock = ({ level, varName, name, examples }: { level: number; varName: string; name: string;  examples?: string }) => (
  <div className={elStyles.elevator_item}>
    <div className={elStyles.elevator_box} style={{ boxShadow: `var(${varName})`, border: level === 0 ? '1px solid #e2e8f0' : 'none' }}>
      <p className={elStyles.box_name}>{name}</p>
      {examples && <p className={elStyles.box_examples}>{examples}</p>}
    </div>
    <div className={elStyles.elevator_info}>
      <p className={elStyles.level_title}>Level {level}</p>
      <p className={elStyles.var_name}>{varName}</p>
    </div>
  </div>
);

const ElevatorGuidePage = () => {
  return (
    <DesignSystemLayout>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title_h1}>Shadow Scales</h1>
          <p className={styles.text_muted}>
            UI 요소들의 Z축 깊이감을 나타내는 5단계 그림자 스케일 가이드입니다.
          </p>
        </header>

        <GuideSection title="Shadow Scales">
          <p className={styles.description}>
            팝업, 모달, 카드 등 컴포넌트가 떠 있는 높이에 따라 그림자의 퍼짐 정도와 농도를 다르게 적용합니다.
          </p>
          <div className={elStyles.elevator_container}>
            <ElevatorBlock level={0} name="None" varName="--elevator-none"  />
            <ElevatorBlock level={1} name="Element" examples="(Button, Badge)" varName="--elevator-1"  />
            <ElevatorBlock level={2} name="Group" examples="(Card, Accordion)" varName="--elevator-2"  />
            <ElevatorBlock level={3} name="Layer" examples="(Dropdown, Tooltip)" varName="--elevator-3"  />
            <ElevatorBlock level={4} name="Overlay" examples="(Modal, Popover)" varName="--elevator-4"  />
          </div>
        </GuideSection>

        <GuideSection title="Z-index Scales">
          <div className={elStyles.zindex_rules}>
            <h4>Z-Index 설계 규칙 (여유 공간 확보 전략)</h4>
            <ul>
              <li><strong>1 ~ 99</strong>: 로컬 컨텍스트 내부에서의 겹침 제어 (요소 호버, 스티키 카드 등)</li>
              <li><strong>100 ~ 999</strong>: 사이트 레이아웃 프레임 및 컨텐츠 위로 뜨는 일반 레이어</li>
              <li><strong>1000 ~ 1999</strong>: 오버레이 영역. 모달 내부에 또 다른 팝오버나 달력이 뜰 수 있음을 고려하여 계층 사이에 100~200 단위의 충분한 여유 공간을 둡니다.</li>
              <li><strong>9999</strong>: 시스템 알림(토스트 등) 절대 가려지지 않는 최상단 계층</li>
            </ul>
          </div>
          <table className={elStyles.zindex_table}>
            <thead>
              <tr>
                <th>Level / Name</th>
                <th>Variable</th>
                <th>Value</th>
                <th>Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Element</strong></td>
                <td><code>--zindex-element</code></td>
                <td>1</td>
                <td>탭 활성화 상태, 캐러셀 화살표, 카드 호버 등 내부 엘리먼트 뎁스</td>
              </tr>
              <tr>
                <td><strong>Group</strong></td>
                <td><code>--zindex-group</code></td>
                <td>10</td>
                <td>화면 내 플로팅 버튼(FAB), 스티키(Sticky) 컨텐츠</td>
              </tr>
              <tr>
                <td><strong>Site Layout</strong></td>
                <td><code>--zindex-layout</code></td>
                <td>100</td>
                <td>GNB (상단 헤더), LNB (사이드바), 고정 푸터 등 레이아웃 프레임</td>
              </tr>
              <tr>
                <td><strong>Layer</strong></td>
                <td><code>--zindex-layer</code></td>
                <td>200</td>
                <td>드롭다운 메뉴, 커스텀 셀렉트박스 옵션 목록</td>
              </tr>
              <tr>
                <td><strong>Backdrop</strong></td>
                <td><code>--zindex-backdrop</code></td>
                <td>1000</td>
                <td>모달/오프캔버스가 뜰 때 깔리는 검은색 딤(Dim) 처리 영역</td>
              </tr>
              <tr>
                <td><strong>Modal</strong></td>
                <td><code>--zindex-modal</code></td>
                <td>1200</td>
                <td>팝업 창, 모달 다이얼로그, 바텀 시트, 오프캔버스</td>
              </tr>
              <tr>
                <td><strong>Popover</strong></td>
                <td><code>--zindex-popover</code></td>
                <td>1300</td>
                <td>클릭 시 나타나는 정보성 팝오버 (모달 위에도 위치할 수 있음)</td>
              </tr>
              <tr>
                <td><strong>Datepicker</strong></td>
                <td><code>--zindex-datepicker</code></td>
                <td>1400</td>
                <td>달력 선택기 (모달이나 팝오버 등 어떤 상황에서도 최상위에 떠야 함)</td>
              </tr>
              <tr>
                <td><strong>Tooltip</strong></td>
                <td><code>--zindex-tooltip</code></td>
                <td>1500</td>
                <td>마우스 호버 시 즉각적으로 나타나는 아주 작은 정보 팁</td>
              </tr>
              <tr>
                <td><strong>Toast / System</strong></td>
                <td><code>--zindex-toast</code></td>
                <td>9999</td>
                <td>토스트 알림, 글로벌 로딩 스피너 (절대 화면에서 가려지면 안 되는 시스템 메시지)</td>
              </tr>
            </tbody>
          </table>
        </GuideSection>
      </div>
    </DesignSystemLayout>
  );
};

export default ElevatorGuidePage;

