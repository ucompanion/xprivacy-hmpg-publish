# 디자인 시스템 Shadow Scales 가이드 생성 프롬프트

> **⚠️ [필수 참조: Foundation Data]**
> 본 가이드 문서의 데모 데이터(그림자 값, Z-index 등)는 예시일 뿐입니다. 실제 컴포넌트, 가이드 렌더링, 변수 매핑을 진행할 때는 **반드시 `PROMPT_FOUNDATION_DATA.md` (단일 진실 공급원)의 실제 데이터를 최우선으로 참조**하여 작업하십시오.

- **공통 뼈대**: 반드시 `PROMPT_BASE_TEMPLATE.md`에 정의된 마스터 템플릿 규칙(메뉴 분류, `// @ts-nocheck`, `<GuideSection>`, `<CodeBlock>` 등)을 최우선으로 준수합니다.
- **개별 구성**: 새로운 그림자 깊이(Elevation)와 Z-index 옵션을 추가하거나 확인하기 위한 가이드 페이지를 작성할 때는 아래의 개별 규칙과 뼈대 구조를 활용합니다.

## 📝 Shadow Scales 가이드 작성 규칙
1. **파일 경로**: `src/pages/pub/guide/elevator/index.tsx`
2. **스타일 재사용**: `src/pages/pub/guide/template.module.scss` 및 `elevator.module.scss`를 사용하여 고유의 엘리베이터 블록 스타일과 Z-index 테이블 스타일을 적용합니다.
3. **섹션 래핑**: `GuideSection`을 사용하여 접고 펼치기를 지원합니다.
4. **5단계 스케일 및 예시 표기**: `--elevator-none`부터 `--elevator-4`까지 깊이감을 점진적으로 시각화합니다. 
   각 단계가 주로 사용되는 단위 예시(Element, Group, Layer, Overlay 등)를 표기하여 이해를 돕습니다.
   예시 블록들은 반드시 창 크기에 맞춰 유연하게 줄어들더라도 **한 줄(1 Row)**로 렌더링되도록 `flex-wrap: nowrap`과 `flex: 1`을 적용합니다.
5. **컴포넌트 분리**: 단일 그림자 카드를 렌더링하는 요소는 파일 상단에 `ElevatorBlock`이라는 내부 컴포넌트로 분리하여 재사용합니다.
6. **Z-index 가이드**: Z-index 설계 규칙(여유 공간 확보 전략)과 각 레벨(Element, Group, Layout, Modal 등)별 변수(`--zindex-*`) 매핑 테이블을 하단 섹션으로 필수로 포함합니다.

---

## 💻 Shadow Scales 가이드 표준 뼈대 (React Component)

```tsx
import styles from '../template.module.scss';
import elStyles from './elevator.module.scss';
import { GuideSection } from '../components/GuideSection';
import GuideLayout from '../../layouts/GuideLayout';

// 단일 Elevator(그림자) 블록 렌더링을 위한 공통 컴포넌트
const ElevatorBlock = ({ level, varName, name, shadowValue, examples }: { level: number; varName: string; name: string; shadowValue: string; examples?: string }) => (
  <div className={elStyles.elevator_item}>
    <div className={elStyles.elevator_box} style={{ boxShadow: shadowValue, border: level === 0 ? '1px solid #e2e8f0' : 'none' }}>
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
    <GuideLayout>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title_h1}>Shadow Scales</h1>
          <p className={styles.text_muted}>
            UI 요소들의 Z축 깊이감을 나타내는 5단계 그림자 스케일 및 Z-index 가이드입니다.
          </p>
        </header>

        <GuideSection title="Shadow Scales">
          <p className={styles.description}>
            팝업, 모달, 카드 등 컴포넌트가 떠 있는 높이에 따라 그림자의 퍼짐 정도와 농도를 다르게 적용합니다.
          </p>
          <div className={elStyles.elevator_container}>
            {/* PROMPT_FOUNDATION_DATA.md 의 Shadow Scales 데이터를 참조하여 ElevatorBlock 반복 렌더링 */}
            <ElevatorBlock level={0} name="[Name]" examples="[Examples]" varName="--elevator-[level]" shadowValue="[ShadowValue]" />
          </div>
        </GuideSection>

        <GuideSection title="Z-index Scales">
          <div className={elStyles.zindex_rules}>
            {/* Z-index 규칙 작성 */}
          </div>
          <table className={elStyles.zindex_table}>
            {/* Z-index 변수 및 예시 표기 테이블 작성 */}
          </table>
        </GuideSection>
      </div>
    </GuideLayout>
  );
};

export default ElevatorGuidePage;
```