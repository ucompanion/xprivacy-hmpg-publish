# React 프로젝트 내 SVG 아이콘 처리 전략 기획안

본 문서는 Vite + React + SCSS 환경에서 아이콘 자산(SVG)을 효율적으로 관리하고 컴포넌트화하기 위한 세 가지 전략을 비교하고 최적의 방안을 제안합니다.

---

## 1. 개요
퍼블리싱과 개발 환경이 분리 및 통합되는 과정에서, SVG 아이콘은 단순한 이미지가 아니라 **색상(fill, stroke)이 동적으로 변해야 하는 UI 요소**로 취급되어야 합니다. (예: 마우스 호버 시 색상 변경, 다크모드 대응 등)

## 2. SVG 처리 전략 비교

### 옵션 A: SVGR (Vite 플러그인 활용) - ⭐ 가장 추천하는 방식
SVG 파일을 React 컴포넌트로 자동 변환하여 사용하는 방식입니다. `vite-plugin-svgr`을 사용합니다.

*   **사용법**:
    ```tsx
    import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg';
    
    <SearchIcon className="icon-search" width={24} height={24} fill="currentColor" />
    ```
*   **장점**:
    *   SVG 내부의 `fill`, `stroke` 속성을 CSS(`currentColor`)나 React Props로 완벽하게 제어할 수 있습니다.
    *   Webpack/Vite 단에서 빌드 최적화가 이루어집니다.
    *   별도의 아이콘 폰트 생성 과정 없이 디자이너가 준 SVG 파일을 그대로 폴더에 넣고 쓸 수 있습니다.
*   **단점**:
    *   아이콘이 수백 개 단위로 매우 많아질 경우 번들(JS) 용량이 약간 늘어날 수 있습니다. (하지만 Vite의 Tree Shaking으로 어느 정도 커버 가능)

### 옵션 B: SVG Sprite (SVG 스프라이트)
여러 개의 SVG를 하나의 거대한 `<svg>` 묶음 파일로 만들고, `<use>` 태그를 이용해 아이디(`#아이콘명`)로 참조하는 방식입니다.

*   **사용법**:
    ```tsx
    <svg width="24" height="24">
      <use href="/assets/icons/sprite.svg#icon-search" />
    </svg>
    ```
*   **장점**:
    *   브라우저 캐싱에 매우 유리하며 네트워크 요청을 최소화합니다.
    *   JS 번들 크기에 영향을 주지 않습니다.
*   **단점**:
    *   스프라이트 파일을 생성하고 갱신하는 빌드 스크립트 설정(svg-sprite-loader 등)이 다소 까다롭습니다.

### 옵션 C: Icon Font (아이콘 폰트 - IcoMoon 등)
디자이너가 SVG를 폰트 파일(.woff2, .ttf)로 변환하여 제공하고, CSS 클래스로 불러오는 방식입니다.

*   **사용법**:
    ```tsx
    <i className="icon-search"></i>
    ```
*   **장점**:
    *   기존 퍼블리싱 방식과 가장 유사하며 텍스트처럼 다루기 쉽습니다. (`color`, `font-size` 적용)
*   **단점**:
    *   아이콘이 하나 추가될 때마다 폰트 파일을 통째로 다시 생성해야 하는 번거로움이 있습니다.
    *   투톤(Two-tone) 컬러 아이콘 등 복잡한 SVG를 표현할 수 없습니다.

---

## 3. 최종 제안 및 적용 방안

현재 진행 중인 React + Vite + SCSS 구조에서는 **옵션 A (SVGR 플러그인 도입)** 방식을 채택하는 것을 강력히 권장합니다.

### 📌 향후 진행 단계 (Action Plan)
1. **플러그인 설치**: `npm install -D vite-plugin-svgr`
2. **Vite 설정**: `vite.config.ts`에 플러그인 적용
3. **Core 컴포넌트 확장**: 
   * 기존 `UtilityButton.tsx` 등에서 `icon` 프로퍼티의 타입을 단순 `string`이 아닌 `React.ReactNode` 또는 `React.FC<React.SVGProps<SVGSVGElement>>` 형태로 변경하여 SVGR 컴포넌트를 직접 주입받을 수 있도록 구조를 개선합니다.
   * `Icon.tsx` 라는 범용 코어 컴포넌트를 하나 만들어 아이콘의 기본 사이즈와 `currentColor` 맵핑을 일괄 관리합니다.
