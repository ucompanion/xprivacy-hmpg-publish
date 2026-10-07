import { useState } from 'react';
import styles from '../template.module.scss';
import { GuideSection } from '../components/GuideSection';
import { CodeBlock } from '../components/CodeBlock';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';
import { Tabs } from '../../../../components/core/Tabs/Tabs';
import { Input } from '../../../../components/core/Form/Input';
import { Checkbox } from '../../../../components/core/Form/Checkbox';
import { Select } from '../../../../components/core/Form/Select';
import { AgreeCheckbox } from '../../../../components/domain/Form/AgreeCheckbox';

export default function FormGuidePage() {
  const [inputValue, setInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState('option1');

  const options = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  const tabItems = [
    {
      id: 'core',
      label: 'Core',
      content: (
        <>
          <GuideSection title="1. Overview & Specs">
            <p className={styles.description}>
              모든 폼 컨트롤은 표준 HTML Input 속성을 상속받으며, 선택적으로 `label` 프롭을 지원합니다.
            </p>
            <div className={styles.spec_table_wrapper}>
              <table className={styles.spec_table}>
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>Input</code> / <code>Select</code></td>
                    <td><code>label</code></td>
                    <td><code>string</code></td>
                    <td>폼 필드 상단에 표시될 라벨 텍스트</td>
                  </tr>
                  <tr>
                    <td><code>Checkbox</code></td>
                    <td><code>label</code></td>
                    <td><code>string (필수)</code></td>
                    <td>체크박스 우측에 표시될 라벨 텍스트</td>
                  </tr>
                  <tr>
                    <td><code>Select</code></td>
                    <td><code>options</code></td>
                    <td><code>{`{value: string, label: string}[]`}</code></td>
                    <td>드롭다운에서 선택할 수 있는 옵션 목록</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GuideSection>

          <GuideSection title="2. Input Field">
            <p className={styles.description}>
              가장 기본적인 텍스트 입력 필드입니다.
            </p>
            <div className={`${styles.preview} ${styles.form_box}`}>
              <Input 
                label="이름" 
                placeholder="홍길동" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <CodeBlock code={`<Input 
  label="이름" 
  placeholder="홍길동" 
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
/>`} />
          </GuideSection>

          <GuideSection title="3. Select Box" defaultOpen={false}>
            <p className={styles.description}>
              여러 옵션 중 하나를 선택할 수 있는 드롭다운입니다.
            </p>
            <div className={`${styles.preview} ${styles.form_box}`}>
              <Select 
                label="부서 선택" 
                options={options} 
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
              />
            </div>
            <CodeBlock code={`const options = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];

<Select 
  label="부서 선택" 
  options={options} 
  value={selectedValue}
  onChange={(e) => setSelectedValue(e.target.value)}
/>`} />
          </GuideSection>

          <GuideSection title="4. Checkbox" defaultOpen={false}>
            <p className={styles.description}>
              단일 또는 다중 선택을 위한 체크박스입니다. Checkbox는 label이 필수입니다.
            </p>
            <div className={styles.preview}>
              <Checkbox 
                label="이용약관에 동의합니다." 
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
            </div>
            <CodeBlock code={`<Checkbox 
  label="이용약관에 동의합니다." 
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>`} />
          </GuideSection>
        </>
      )
    },
    {
      id: 'domain',
      label: 'Domain',
      content: (
        <>
          <GuideSection title="1. AgreeCheckbox">
            <p className={styles.description}>
              실제 서비스 가입 및 신청 화면에서 쓰이는 약관 및 개인정보 동의 서비스 전용 체크박스입니다.
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
                      <td><code>agreeType</code></td>
                      <td><code>'terms' | 'privacy' | 'marketing'</code></td>
                      <td>-</td>
                      <td>(필수) 동의 유형을 지정하면 알맞은 라벨 및 정책이 자동 적용됩니다.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.sub_section} style={{ marginTop: '24px' }}>
              <h3 className={styles.title_h3}>1.2. Usage</h3>
              <div className={`${styles.preview} ${styles.preview_column}`}>
                <AgreeCheckbox agreeType="terms" />
                <AgreeCheckbox agreeType="privacy" />
                <AgreeCheckbox agreeType="marketing" />
              </div>
              <CodeBlock code={`<AgreeCheckbox agreeType="terms" />
<AgreeCheckbox agreeType="privacy" />
<AgreeCheckbox agreeType="marketing" />`} />
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
          <h1 className={styles.title_h1}>Form Controls</h1>
          <p className={styles.description}>
            사용자로부터 데이터를 입력받거나 선택할 수 있게 해주는 핵심 폼 컴포넌트 모음입니다. (Input, Select, Checkbox 등)
          </p>
        </header>

        <Tabs items={tabItems} defaultActiveId="core" />
      </div>
    </DesignSystemLayout>
  );
}
