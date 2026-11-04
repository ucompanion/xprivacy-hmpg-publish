import FrontLayout from '../layouts/FrontLayout';

export default function PubSolutions() {
  return (
    <FrontLayout>
      <div className="sub-page-wrap">
        <h2>Solutions</h2>
        <p>산업군별 맞춤형 개인정보 비식별화 솔루션 (원페이지)</p>

        <section id="broadcasting" style={{ padding: '40rem 0', borderBottom: '1px solid #eee' }}>
          <h3>방송</h3>
          <p>방송 및 미디어 콘텐츠 제작을 위한 실시간 영상·이미지 비식별화</p>
        </section>

        <section id="cctv" style={{ padding: '40rem 0', borderBottom: '1px solid #eee' }}>
          <h3>CCTV</h3>
          <p>공공 및 민간 관제 CCTV 영상 정보 보호</p>
        </section>

        <section id="smart-city" style={{ padding: '40rem 0', borderBottom: '1px solid #eee' }}>
          <h3>Smart City</h3>
          <p>스마트 시티 및 지능형 교통 시스템(ITS) 비식별 처리</p>
        </section>

        <section id="public-institutions" style={{ padding: '40rem 0', borderBottom: '1px solid #eee' }}>
          <h3>공공기관</h3>
          <p>공공데이터 개방 및 민원 처리용 데이터 비식별화</p>
        </section>

        <section id="ai-data" style={{ padding: '40rem 0', borderBottom: '1px solid #eee' }}>
          <h3>AI Data</h3>
          <p>인공지능 모델 학습용 고품질 비식별 데이터셋 구축</p>
        </section>

        <section id="finance" style={{ padding: '40rem 0', borderBottom: '1px solid #eee' }}>
          <h3>금융</h3>
          <p>금융 보안 규제 준수를 위한 개인정보 및 서류 마스킹</p>
        </section>

        <section id="manufacturing" style={{ padding: '40rem 0', borderBottom: '1px solid #eee' }}>
          <h3>제조</h3>
          <p>스마트 팩토리 및 산업 현장 보안 영상 비식별</p>
        </section>

        <section id="medical" style={{ padding: '40rem 0' }}>
          <h3>의료</h3>
          <p>의료 데이터 연구 및 임상 연구용 개인정보 보호</p>
        </section>
      </div>
    </FrontLayout>
  );
}
