import { useState } from 'react';
import type { FC } from 'react';
import styles from './CodeBlock.module.scss';

export interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // 복사에 성공했을 때만 완료 표시 (권한 거부 등 실패는 무시)
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => undefined);
  };

  return (
    <div className={styles.code_block_wrapper}>
      <button 
        onClick={handleCopy}
        className={`${styles.copy_btn} ${copied ? styles.copied : ''}`}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre className={styles.pre_block}>
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
};

