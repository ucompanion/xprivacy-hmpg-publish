import { Link } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { BLOG_POSTS, detailHref, type BlogPost } from './components/blogPosts';
import styles from './blog.module.scss';

const IMG = '/images/blog';

// 전체 글 목록 (시안: 게시 글 5개를 3열 × 3행으로 반복 배치한 퍼블리싱용 예시)
const LIST_ITEMS = Array.from({ length: 9 }, (_, i) => ({
  key: `item-${i + 1}`,
  post: BLOG_POSTS[i % BLOG_POSTS.length],
}));

const PAGES = [1, 2, 3, 4, 5];

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className={styles.card}>
      <img src={post.cover} alt="" className={styles.cardCover} />
      <div className={styles.cardContent}>
        <div className={styles.cardText}>
          <span className={styles.category}>{post.category}</span>
          <h3 className={styles.cardTitle}>{post.title}</h3>
          <p className={styles.summary}>{post.summary}</p>
        </div>
        <Link to={detailHref(post.id)} className={styles.moreLink}>
          자세히 보기 →
        </Link>
      </div>
    </article>
  );
}

export default function PubBlogList() {
  const latest = BLOG_POSTS[0];

  return (
    <FrontLayout>
      <div className={styles.blogPage}>
        {/* 1. Hero (Figma PC 2429:3969 / Mobile 2433:4026 · 가운데 정렬 Compact) */}
        <HeroSection
          heroVariant="compact"
          align="center"
          className={styles.blogHero}
          title="Blog"
          description={
            <>
              비식별 활용 사례와
              <br className="mobileBr" /> 개인정보 보호 정보를 소개합니다.
            </>
          }
        />

        {/* 2. 최신 글 (Figma PC 2429:3662 · 가로형 카드) */}
        <BasicSection bg="white" layout="vertical" align="left">
          <div className={styles.listGroup}>
            <h2 className={styles.groupTitle}>최신 글</h2>
            <article className={styles.latestCard}>
              <img src={latest.coverWide ?? latest.cover} alt="" className={styles.latestCover} />
              <div className={styles.latestContent}>
                <span className={styles.category}>{latest.category}</span>
                <h3 className={styles.latestTitle}>{latest.title}</h3>
                <p className={styles.summary}>{latest.summary}</p>
                <Link to={detailHref(latest.id)} className={styles.moreLink}>
                  자세히 보기 →
                </Link>
              </div>
            </article>
          </div>
        </BasicSection>

        {/* 3. 전체 글 (Figma PC 2429:3673 · 3열 카드 + 페이지 이동) */}
        <BasicSection bg="gray" layout="vertical" align="left">
          <div className={styles.allPosts}>
            <div className={`${styles.listGroup} ${styles.listGroupAll}`}>
              <h2 className={styles.groupTitle}>전체 글</h2>
              <div className={styles.cardGrid}>
                {LIST_ITEMS.map(({ key, post }) => (
                  <BlogCard key={key} post={post} />
                ))}
              </div>
            </div>

            <nav className={styles.pagination} aria-label="페이지 이동">
              <button type="button" className={styles.pageArrow} disabled aria-label="이전 페이지">
                <img src={`${IMG}/icon_chevron_left.svg`} alt="" />
              </button>
              {PAGES.map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`${styles.pageButton} ${page === 1 ? styles.pageCurrent : ''}`}
                  aria-current={page === 1 ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
              <button type="button" className={styles.pageArrow} aria-label="다음 페이지">
                <img src={`${IMG}/icon_chevron_right.svg`} alt="" />
              </button>
            </nav>
          </div>
        </BasicSection>
      </div>
    </FrontLayout>
  );
}
