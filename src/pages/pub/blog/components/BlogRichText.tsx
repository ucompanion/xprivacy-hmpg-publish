import { Fragment } from 'react';

/** **굵게** 또는 [문구](URL) 구간 */
const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

/**
 * 블로그 본문 인라인 표기 렌더러
 * - **굵게** → <strong>
 * - [문구](URL) → 새 창 외부 링크 (className으로 링크 스타일 지정)
 */
export function BlogRichText({ text, linkClassName }: { text: string; linkClassName?: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, idx) => {
        // 분할 결과는 [일반, 토큰, 일반, 토큰 …] 순서라 위치가 곧 고유 키
        const key = `${idx}-${part.slice(0, 8)}`;
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={key}>{part.slice(2, -2)}</strong>;
        }
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          return (
            <a key={key} href={link[2]} target="_blank" rel="noreferrer" className={linkClassName}>
              {link[1]}
            </a>
          );
        }
        return <Fragment key={key}>{part}</Fragment>;
      })}
    </>
  );
}
