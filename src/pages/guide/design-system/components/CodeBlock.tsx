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
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

