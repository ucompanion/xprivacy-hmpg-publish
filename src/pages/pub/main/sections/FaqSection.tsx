import styles from './FaqSection.module.scss';
import { Accordion } from '../../../../components/core/Accordion/Accordion';

const faqItems = [
  {
    id: 'faq1',
    title: 'Q. 한번 비식별 처리된 영상을 원본으로 다시 복원할 수 있나요?',
    content: (
      <>
        <p>비식별 처리된 영상만으로는 가려진 정보를 원본 상태로 복원할 수 없습니다.</p>
        <p>원본이 있다면 다시 불러와 원하는 방식으로 재처리할 수 있으며, 원본이 없다면 영상을 제공한 기관이나 담당자에게 문의해 주세요.</p>
      </>
    )
  },
  {
    id: 'faq2',
    title: 'Q. 외부 망 연결이 불가능한 관공서 내부 폐쇄망(On-Premise) 환경에도 설치가 가능한가요?',
    content: <p>네, 구축형(On-Premise) 모델을 통해 외부 인터넷 연결이 완벽하게 차단된 사내 폐쇄망 환경에서도 안전하게 설치 및 운영이 가능합니다.</p>
  },
  {
    id: 'faq3',
    title: 'Q. 얼굴 외에 차량 번호판이나 문신 같은 신체적 특징도 자동으로 탐지되나요?',
    content: <p>네, 기본적으로 사람의 얼굴과 체형(바디)은 물론, 차량 번호판 등 프라이버시 침해 소지가 있는 다양한 객체를 AI가 자동으로 탐지합니다.</p>
  },
  {
    id: 'faq4',
    title: 'Q. 대용량/장시간 영상 처리 시 속도는 어느 정도 소요되나요?',
    content: <p>처리 속도는 영상의 해상도, 탐지할 객체의 수, 그리고 서버 하드웨어(GPU) 사양에 따라 달라집니다. 권장 사양의 환경에서는 실시간 속도 혹은 그 이상으로 빠르게 처리됩니다.</p>
  },
  {
    id: 'faq5',
    title: 'Q. 특정 인물만 선택해서 모자이크를 제외하거나 일괄 처리할 수 있나요?',
    content: <p>네, AI가 1차 탐지한 후 수동 검수 단계를 통해 원하지 않는 객체의 비식별화를 해제(제외)하거나, 마우스 드래그를 통해 추가 영역을 일괄적으로 처리할 수 있습니다.</p>
  }
];

export const FaqSection = () => {
  return (
    <section className={styles.faq}>
      <div className={styles.container}>
        <h2 className={styles.title}>자주 묻는 질문</h2>
        
        <div className={styles.accordion_wrapper}>
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  );
};
