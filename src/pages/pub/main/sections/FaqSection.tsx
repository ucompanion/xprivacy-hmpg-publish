import { useNavigate } from 'react-router-dom';
import { BasicSection } from '../../../../components/domain/Section';
import { FaqAccordion } from '../../../../components/domain/Faq';
import { FAQ_CATEGORIES } from '../../../../components/domain/Faq/faqData';
import { Badge } from '../../../../components/core/Badge/Badge';
import { Button } from '../../../../components/core/Button/Button';
import { Icon } from '../../../../components/core/Icon/Icon';
import styles from './FaqSection.module.scss';

/* 자주 묻는 질문 페이지의 그룹별 대표 질문 1건씩 (그룹 라벨로 구분) */
const FEATURED_IDS = ['cat1-0', 'cat2-0', 'cat3-1', 'cat4-0'];

const faqItems = FAQ_CATEGORIES.flatMap((cat) =>
  cat.items
    .filter((item) => FEATURED_IDS.includes(item.id))
    .map((item) => ({
      id: item.id,
      question: (
        <>
          <Badge color="info" variant="subtle" className={styles.groupLabel}>
            {cat.title}
          </Badge>
          {item.question}
        </>
      ),
      answer: <p>{item.answer}</p>,
    })),
);

/**
 * 자주 묻는 질문 (Figma PC 1928:956 · MO 1928:1462 · 더 보기 PC 4197:80396 / MO 4197:80935)
 * 첫 항목 펼침 · 한 번에 한 항목만 펼침
 */
export const FaqSection = () => {
  const navigate = useNavigate();
  return (
    <BasicSection
      bg="white"
      align="center"
      title="자주 묻는 질문"
      className={styles.section}
      headerClassName={styles.header}
      titleClassName={styles.title}
    >
      <FaqAccordion items={faqItems} className={styles.faq} />
      <div className={styles.more}>
        <Button
          variant="ghost"
          color="neutral"
          className={styles.moreButton}
          onClick={() => void navigate('/pub/contact/faq')}
        >
          더 보기
          <Icon name="chevron-right" size={16} />
        </Button>
      </div>
    </BasicSection>
  );
};
