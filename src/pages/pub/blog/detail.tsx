import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { Button } from '../../../components/core/Button/Button';
import { BLOG_POSTS, detailHref, findPost, type BlogBlock } from './components/blogPosts';
import { BlogRichText } from './components/BlogRichText';
import styles from './detail.module.scss';

/** 본문을 소제목·참고 자료 단위 묶음으로 나눔 (묶음 사이 60 · 묶음 안 24) */
function groupBlocks(blocks: BlogBlock[]): BlogBlock[][] {
  return blocks.reduce<BlogBlock[][]>((groups, block) => {
    const startsGroup = block.type === 'heading' || block.type === 'references';
    if (startsGroup || groups.length === 0) groups.push([block]);
    else groups[groups.length - 1].push(block);
    return groups;
  }, []);
}

/** 블록 고유 키 (종류 + 첫 문구) */
function blockKey(block: BlogBlock): string {
  switch (block.type) {
    case 'paragraph':
    case 'heading':
      return `${block.type}-${block.text.slice(0, 40)}`;
    case 'table':
      return `table-${block.head.join('|')}`;
    case 'orderedList':
      return `ol-${block.items[0].slice(0, 40)}`;
    case 'references':
      return `refs-${block.title}`;
  }
}

function ArticleBlock({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className={styles.paragraph}>
          <BlogRichText text={block.text} />
        </p>
      );
    case 'heading':
      return <h2 className={styles.heading}>{block.text}</h2>;
    case 'table':
      return (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {block.head.map((cell) => (
                  <th key={cell} scope="col">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'orderedList':
      return (
        <ol className={styles.orderedList}>
          {block.items.map((item) => (
            <li key={item}>
              <BlogRichText text={item} />
            </li>
          ))}
        </ol>
      );
    case 'references':
      return (
        <>
          <h3 className={styles.subHeading}>{block.title}</h3>
          <ul className={styles.references}>
            {block.items.map((item) => (
              <li key={item}>
                <BlogRichText text={item} linkClassName={styles.referenceLink} />
              </li>
            ))}
          </ul>
        </>
      );
  }
}

/**
 * 블로그 상세 (케이스: ?case=security | media | driving | data | cctv)
 * Figma PC 2435:4286(기업보안) · 2435:4935(방송미디어) · 2435:5400(자율주행) · 2435:5876(데이터활용) · 2435:6316(공공기관)
 * Mobile 기본 포맷 2436:5308
 */
export default function PubBlogDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const post = findPost(searchParams.get('case'));
  const otherPosts = BLOG_POSTS.filter((item) => item.id !== post.id);
  const [firstGroup, ...restGroups] = groupBlocks(post.blocks);

  return (
    <FrontLayout>
      <div className={styles.blogDetail}>
        {/* 1. 글 머리 (Figma PC 2435:4288 · 왼쪽 정렬 · 카테고리 → 16 → 제목) */}
        <HeroSection
          heroVariant="compact"
          align="left"
          className={styles.articleHero}
          eyebrow={post.category}
          title={post.title}
          eyebrowClassName={styles.heroCategory}
          titleClassName={styles.heroTitle}
        />

        {/* 2. 본문 (Figma PC 2435:4292 · 표지 → 24 → 도입 문단 · 소제목 묶음 사이 60) */}
        <BasicSection bg="white" layout="vertical" align="left" className={styles.articleSection}>
          <article className={styles.article}>
            <div className={styles.group}>
              <img src={post.cover} alt="" className={styles.cover} />
              {firstGroup.map((block) => (
                <ArticleBlock key={blockKey(block)} block={block} />
              ))}
            </div>

            {restGroups.map((group) => (
              <div key={blockKey(group[0])} className={styles.group}>
                {group.map((block) => (
                  <ArticleBlock key={blockKey(block)} block={block} />
                ))}
              </div>
            ))}

            <footer className={styles.articleFooter}>
              <Button
                variant="subtle"
                size="xl"
                className={styles.listButton}
                onClick={() => void navigate('/pub/blog')}
              >
                목록으로
              </Button>
            </footer>
          </article>
        </BasicSection>

        {/* 3. 다른 글 (Figma PC 2435:4363 · 현재 글을 뺀 4개) */}
        <BasicSection bg="gray" layout="vertical" align="left">
          <div className={styles.others}>
            <div className={styles.othersHead}>
              <h2 className={styles.othersTitle}>다른 글</h2>
              <Link to="/pub/blog" className={styles.othersListLink}>
                목록으로
              </Link>
            </div>
            <ul className={styles.otherList}>
              {otherPosts.map((item) => (
                <li key={item.id}>
                  <Link to={detailHref(item.id)} className={styles.otherRow}>
                    <span className={styles.otherText}>
                      <span className={styles.otherCategory}>{item.category}</span>
                      <span className={styles.otherTitle}>{item.title}</span>
                    </span>
                    <img src="/images/blog/icon_arrow_right.svg" alt="" className={styles.otherArrow} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </BasicSection>
      </div>
    </FrontLayout>
  );
}
