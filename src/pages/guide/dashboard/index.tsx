import { useState } from 'react';
import GuideLayout from '../layouts/GuideLayout';


const HISTORY_DATA: Record<string, { date: string; tag: string; content: string }[]> = {
  '사용자 메인 (Header/Layout/Footer)': [
    { date: '2026.10.06', tag: '[진행중]', content: '페이지 최초 작업' },
  ],
  '제품소개': [
    { date: '2026.10.06', tag: '[진행중]', content: '페이지 최초 작업' },
  ],
  '핵심가치': [
    { date: '2026.10.06', tag: '[진행중]', content: '페이지 최초 작업' },
  ],
  '왜 xPrivacy인가': [
    { date: '2026.10.06', tag: '[진행중]', content: '페이지 최초 작업' },
  ],
  '요금제': [
    { date: '2026.10.06', tag: '[진행중]', content: '페이지 최초 작업' },
  ],
  '인증 및 특허': [
    { date: '2026.10.06', tag: '[진행중]', content: '페이지 최초 작업' },
  ],
  'AI Detection': [
    { date: '2026.10.06', tag: '[진행중]', content: '페이지 최초 작업' },
  ],
  'Security': [
    { date: '2026.10.07', tag: '[진행중]', content: '페이지 최초 작업' },
  ],
  'Processing Engine': [
    { date: '2026.10.07', tag: '[진행중]', content: '페이지 최초 작업' },
  ],
  'Privacy Engine': [
    { date: '2026.10.07', tag: '[진행중]', content: '페이지 최초 작업' },
  ],
  'Virtual Face AI': [
    { date: '2026.10.07', tag: '[진행중]', content: '페이지 최초 작업' },
  ],
  'Smart Workflow': [
    { date: '2026.10.07', tag: '[진행중]', content: '페이지 최초 작업' },
  ],
  '이미지 비식별': [
    { date: '2026.10.07', tag: '[진행중]', content: '페이지 최초 작업' },
  ],
  '영상 비식별': [
    { date: '2026.10.07', tag: '[진행중]', content: '페이지 최초 작업' },
  ],
  'Batch Processing': [
    { date: '2026.10.07', tag: '[진행중]', content: '페이지 최초 작업' },
  ],
  'AI 자동편집': [
    { date: '2026.10.07', tag: '[진행중]', content: '페이지 최초 작업' },
  ],
  'REST API': [
    { date: '2026.10.07', tag: '[진행중]', content: '페이지 최초 작업' },
  ],
  '로그인': [
    { date: '2026.10.07', tag: '[진행중]', content: '로그인 케이스 3종 퍼블리싱 (기본, 에러, 잠김)' },
  ],
  '회원가입': [
    { date: '2026.10.07', tag: '[진행중]', content: '회원가입 케이스 2종 퍼블리싱 (기본, 에러)' },
  ],
  '패스워드 찾기': [
    { date: '2026.10.07', tag: '[진행중]', content: '패스워드 찾기 케이스 2종 퍼블리싱 (기본, 발송완료)' },
  ],
  '비밀번호 재설정': [
    { date: '2026.10.07', tag: '[진행중]', content: '비밀번호 재설정 케이스 3종 퍼블리싱 (기본, 변경완료, 링크만료)' },
  ],
  '약관동의': [
    { date: '2026.10.07', tag: '[진행중]', content: '회원가입 1단계 약관동의 퍼블리싱' },
  ],
  '가입완료': [
    { date: '2026.10.07', tag: '[진행중]', content: '회원가입 3단계 가입완료 화면 퍼블리싱' },
  ],
  'Demo': [
    { date: '2026.10.07', tag: '[진행중]', content: '데모 전용 레이아웃(DemoLayout) 신설 및 파일 드롭존·처리 옵션 사이드바 퍼블리싱' },
  ],
};

export default function PubIndex() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');

  const openHistoryPopup = (title: string) => {
    setPopupTitle(title);
    setPopupOpen(true);
  };

  const closeHistoryPopup = () => {
    setPopupOpen(false);
  };

  return (
    <GuideLayout>
      <main className="guide-content dashboard_inner">
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        
        .pub-index-wrap {
          /* 🎨 브랜드 및 키 컬러 (사이트 디자인 확정 시 이 부분을 수정하세요) */
          --pub-primary: #0f4c81; 
          --pub-secondary: #e2e8f0;

          /* 📐 배경 및 레이아웃 컬러 */
          --pub-bg: #ffffff;       /* 전체 배경색 (요청에 따라 흰색 적용) */
          --pub-surface: #ffffff;  /* 컨텐츠 박스 배경색 */
          --pub-border: #cbd5e1;   /* 표 및 컨텐츠 테두리 색상 */
          --pub-hover: #f1f5f9;    /* 마우스 오버 시 배경색 */

          /* 📝 텍스트 컬러 */
          --pub-text-main: #1e293b; /* 기본 텍스트 색상 */
          --pub-text-sub: #64748b;  /* 보조/설명 텍스트 색상 */

          /* 🟢 상태(Status) 뱃지 컬러 */
          --pub-status-todo: #94a3b8; /* 대기 */
          --pub-status-ing: #f59e0b;  /* 진행중 */
          --pub-status-done: #10b981; /* 완료 */
          
          font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
          background: var(--pub-bg);
          color: var(--pub-text-main);
          min-height: 100vh;
          margin: 0;
        }
        
        .pub-index-wrap .container {
          width: 100%;
          margin: 0 auto;
        }
        
        .pub-index-wrap header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 20px;
          padding-bottom: 15px;
        }

        .pub-index-wrap .header-title {
          flex: 1;
        }
        
        .pub-index-wrap h1 {
          font-size: 26px;
          margin: 0 0 8px 0;
          color: var(--pub-primary);
          letter-spacing: -0.5px;
        }
        
        .pub-index-wrap p {
          color: var(--pub-text-sub);
          margin: 0;
          font-size: 15px;
        }

        .pub-index-wrap .status-summary {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }

        .pub-index-wrap .progress-bar {
          width: 250px;
          height: 8px;
          background: var(--pub-secondary);
          border-radius: 4px;
          overflow: hidden;
        }

        .pub-index-wrap .progress-fill {
          height: 100%;
          background: var(--pub-primary);
          border-radius: 4px;
        }

        .pub-index-wrap .status-counts {
          display: flex;
          gap: 12px;
          font-size: 13px;
          color: var(--pub-text-sub);
        }

        .pub-index-wrap .status-counts strong {
          color: var(--pub-text-main);
          font-weight: 700;
          margin-left: 4px;
        }

        .pub-index-wrap .status-counts .text-ing { color: var(--pub-status-ing); }
        .pub-index-wrap .status-counts .text-done { color: var(--pub-status-done); }
        .pub-index-wrap .status-counts .text-primary { color: var(--pub-primary); }
        
        .pub-index-wrap .table-wrap {
          background: var(--pub-surface);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        
        .pub-index-wrap table {
          width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
          text-align: left;
        }
        
        .pub-index-wrap th,
        .pub-index-wrap td {
          padding: 12px;
          border-bottom: 1px solid var(--pub-secondary);
          font-size: 14px;
          word-break: break-all;
        }
        
        .pub-index-wrap th {
          background: var(--pub-primary);
          color: white;
          font-weight: 600;
          white-space: nowrap;
        }
        
        .pub-index-wrap tr:last-child td {
          border-bottom: none;
        }
        
        .pub-index-wrap tr:not(.category):hover td {
          background: var(--pub-hover);
        }
        
        .pub-index-wrap .category td {
          background: #eef2f6;
          font-weight: 700;
          color: var(--pub-primary);
          font-size: 15px;
          border-bottom: 2px solid var(--pub-border);
        }
        
        .pub-index-wrap .status {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          background: var(--pub-status-todo);
          color: white;
          text-align: center;
          min-width: 40px;
        }
        
        .pub-index-wrap .status.ing {
          background: var(--pub-status-ing);
        }
        
        .pub-index-wrap .status.done {
          background: var(--pub-status-done);
        }
        
        .pub-index-wrap a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
        }
        
        .pub-index-wrap a:hover {
          text-decoration: underline;
        }
        
        .pub-index-wrap .btn-history {
          padding: 4px 8px;
          font-size: 12px;
          background: var(--pub-surface);
          border: 1px solid var(--pub-border);
          border-radius: 4px;
          cursor: pointer;
          color: var(--pub-text-main);
          margin-top: 4px;
        }
        
        .pub-index-wrap .btn-history:hover {
          background: var(--pub-hover);
        }

        /* 팝업 오버레이 */
        .pub-index-wrap .popup-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          align-items: center;
          justify-content: center;
        }

        .pub-index-wrap .popup-overlay.active {
          display: flex;
        }

        .pub-index-wrap .popup-content {
          background: var(--pub-surface);
          width: 90%;
          max-width: 750px;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          position: relative;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
        }

        .pub-index-wrap .popup-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--pub-secondary);
        }

        .pub-index-wrap .popup-header h2 {
          margin: 0;
          font-size: 18px;
          color: var(--pub-primary);
        }

        .pub-index-wrap .btn-close {
          background: none;
          border: none;
          font-size: 24px;
          line-height: 1;
          cursor: pointer;
          color: var(--pub-text-sub);
        }
      `}</style>

      <div className="pub-index-wrap">
        <div className="container">
          <header>
            <div className="header-title">
              <h1>월드버텍 xPrivacy 퍼블리싱 산출물 리스트</h1>
              <p>UI/UX 및 퍼블리싱 작업 산출물을 관리하는 페이지입니다.</p>
            </div>

            <div className="status-summary">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '52%' }}></div>
              </div>
              <div className="status-counts">
                <span>전체 <strong>46</strong></span>
                <span>대기 <strong>22</strong></span>
                <span>진행중 <strong className="text-ing">0</strong></span>
                <span>완료 <strong className="text-done">24</strong></span>
                <span>진행률 <strong className="text-primary">52%</strong></span>
              </div>
            </div>
          </header>

          <div className="table-wrap">
            <table>
              <colgroup>
                <col width="60px" />
                <col width="35%" />
                <col width="auto" />
                <col width="100px" />
                <col width="100px" />
                <col width="120px" />
                <col width="100px" />
              </colgroup>
              <thead>
                <tr>
                  <th>No</th>
                  <th>화면명</th>
                  <th>라우트 경로 (Link)</th>
                  <th>담당자</th>
                  <th>상태</th>
                  <th>최종날짜</th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                <tr className="category">
                  <td colSpan={7}>▶ 메인/공통</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>사용자 메인 (Header/Layout/Footer)</td>
                  <td><a href="/pub/main" target="_blank" rel="noreferrer">/pub/main</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.06</td>
                  <td>
                    <button type="button" className="btn-history" onClick={() => openHistoryPopup('사용자 메인 (Header/Layout/Footer)')}>수정내역</button>
                  </td>
                </tr>
                <tr className="category">
                  <td colSpan={7}>▶ Product</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>제품소개</td>
                  <td><a href="/pub/product/intro" target="_blank" rel="noreferrer">/pub/product/intro</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.06</td>
                  <td>
                    <button type="button" className="btn-history" onClick={() => openHistoryPopup('제품소개')}>수정내역</button>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>핵심가치</td>
                  <td><a href="/pub/product/core-values" target="_blank" rel="noreferrer">/pub/product/core-values</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.06</td>
                  <td>
                    <button type="button" className="btn-history" onClick={() => openHistoryPopup('핵심가치')}>수정내역</button>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>왜 xPrivacy인가</td>
                  <td><a href="/pub/product/why" target="_blank" rel="noreferrer">/pub/product/why</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.06</td>
                  <td>
                    <button type="button" className="btn-history" onClick={() => openHistoryPopup('왜 xPrivacy인가')}>수정내역</button>
                  </td>
                </tr>

                <tr>
                  <td>6</td>
                  <td>요금제</td>
                  <td><a href="/pub/product/pricing" target="_blank" rel="noreferrer">/pub/product/pricing</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.06</td>
                  <td>
                    <button type="button" className="btn-history" onClick={() => openHistoryPopup('요금제')}>수정내역</button>
                  </td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>인증 및 특허</td>
                  <td><a href="/pub/product/certification" target="_blank" rel="noreferrer">/pub/product/certification</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.06</td>
                  <td>
                    <button type="button" className="btn-history" onClick={() => openHistoryPopup('인증 및 특허')}>수정내역</button>
                  </td>
                </tr>
                <tr className="category">
                  <td colSpan={7}>▶ Technology</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>AI Detection</td>
                  <td><a href="/pub/technology/ai-detection" target="_blank" rel="noreferrer">/pub/technology/ai-detection</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.06</td>
                  <td>
                    <button type="button" className="btn-history" onClick={() => openHistoryPopup('AI Detection')}>수정내역</button>
                  </td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>Security</td>
                  <td><a href="/pub/technology/security" target="_blank" rel="noreferrer">/pub/technology/security</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.07</td>
                  <td>
                    <button type="button" className="btn-history" onClick={() => openHistoryPopup('Security')}>수정내역</button>
                  </td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Processing Engine</td>
                  <td><a href="/pub/technology/processing-engine" target="_blank" rel="noreferrer">/pub/technology/processing-engine</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.07</td>
                  <td>
                    <button type="button" className="btn-history" onClick={() => openHistoryPopup('Processing Engine')}>수정내역</button>
                  </td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>Privacy Engine</td>
                  <td><a href="/pub/technology/privacy-engine" target="_blank" rel="noreferrer">/pub/technology/privacy-engine</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.07</td>
                  <td>
                    <button type="button" className="btn-history" onClick={() => openHistoryPopup('Privacy Engine')}>수정내역</button>
                  </td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>Virtual Face AI</td>
                  <td><a href="/pub/technology/virtual-face-ai" target="_blank" rel="noreferrer">/pub/technology/virtual-face-ai</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.07</td>
                  <td>
                    <button type="button" className="btn-history" onClick={() => openHistoryPopup('Virtual Face AI')}>수정내역</button>
                  </td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>Smart Workflow</td>
                  <td><a href="/pub/technology/smart-workflow" target="_blank" rel="noreferrer">/pub/technology/smart-workflow</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.07</td>
                  <td>
                    <button type="button" className="btn-history" onClick={() => openHistoryPopup('Smart Workflow')}>수정내역</button>
                  </td>
                </tr>

                <tr className="category">
                  <td colSpan={7}>▶ Features</td>
                </tr>
                <tr>
                  <td>15</td>
                  <td>이미지 비식별</td>
                  <td><a href="/pub/features/image-deid" target="_blank" rel="noreferrer">/pub/features/image-deid</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.07</td>
                  <td>
                    <button type="button" className="btn-history" onClick={() => openHistoryPopup('이미지 비식별')}>수정내역</button>
                  </td>
                </tr>
                <tr>
                  <td>16</td>
                  <td>영상 비식별</td>
                  <td><a href="/pub/features/video-deid" target="_blank" rel="noreferrer">/pub/features/video-deid</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.07</td>
                  <td>
                    <button type="button" className="btn-history" onClick={() => openHistoryPopup('영상 비식별')}>수정내역</button>
                  </td>
                </tr>
                <tr>
                  <td>17</td>
                  <td>Batch Processing</td>
                  <td><a href="/pub/features/batch-processing" target="_blank" rel="noreferrer">/pub/features/batch-processing</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.07</td>
                  <td>
                    <button type="button" className="btn-history" onClick={() => openHistoryPopup('Batch Processing')}>수정내역</button>
                  </td>
                </tr>
                <tr>
                  <td>18</td>
                  <td>AI 자동편집</td>
                  <td><a href="/pub/features/ai-auto-editing" target="_blank" rel="noreferrer">/pub/features/ai-auto-editing</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.07</td>
                  <td>
                    <button type="button" className="btn-history" onClick={() => openHistoryPopup('AI 자동편집')}>수정내역</button>
                  </td>
                </tr>
                <tr>
                  <td>19</td>
                  <td>REST API</td>
                  <td><a href="/pub/features/rest-api" target="_blank" rel="noreferrer">/pub/features/rest-api</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.07</td>
                  <td>
                    <button type="button" className="btn-history" onClick={() => openHistoryPopup('REST API')}>수정내역</button>
                  </td>
                </tr>
                <tr>
                  <td>20</td>
                  <td>On-Premise</td>
                  <td><a href="/pub/features/on-premise" target="_blank" rel="noreferrer">/pub/features/on-premise</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>21</td>
                  <td>Web Service</td>
                  <td><a href="/pub/features/web-service" target="_blank" rel="noreferrer">/pub/features/web-service</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr className="category">
                  <td colSpan={7}>▶ Solutions</td>
                </tr>
                <tr>
                  <td>22</td>
                  <td>방송</td>
                  <td><a href="/pub/solutions/broadcasting" target="_blank" rel="noreferrer">/pub/solutions/broadcasting</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>23</td>
                  <td>CCTV</td>
                  <td><a href="/pub/solutions/cctv" target="_blank" rel="noreferrer">/pub/solutions/cctv</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>24</td>
                  <td>Smart City</td>
                  <td><a href="/pub/solutions/smart-city" target="_blank" rel="noreferrer">/pub/solutions/smart-city</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>25</td>
                  <td>공공기관</td>
                  <td><a href="/pub/solutions/public-institutions" target="_blank" rel="noreferrer">/pub/solutions/public-institutions</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>26</td>
                  <td>AI Data</td>
                  <td><a href="/pub/solutions/ai-data" target="_blank" rel="noreferrer">/pub/solutions/ai-data</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>27</td>
                  <td>금융</td>
                  <td><a href="/pub/solutions/finance" target="_blank" rel="noreferrer">/pub/solutions/finance</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>28</td>
                  <td>제조</td>
                  <td><a href="/pub/solutions/manufacturing" target="_blank" rel="noreferrer">/pub/solutions/manufacturing</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>29</td>
                  <td>의료</td>
                  <td><a href="/pub/solutions/medical" target="_blank" rel="noreferrer">/pub/solutions/medical</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr className="category">
                  <td colSpan={7}>▶ Demo</td>
                </tr>
                <tr>
                  <td>30</td>
                  <td>Demo</td>
                  <td><a href="/pub/demo/demo" target="_blank" rel="noreferrer">/pub/demo/demo</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.07</td>
                  <td>
                    <button type="button" className="btn-history" onClick={() => openHistoryPopup('Demo')}>수정내역</button>
                  </td>
                </tr>
                <tr>
                  <td>31</td>
                  <td>이미지 체험</td>
                  <td><a href="/pub/demo/image" target="_blank" rel="noreferrer">/pub/demo/image</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>32</td>
                  <td>영상 체험</td>
                  <td><a href="/pub/demo/video" target="_blank" rel="noreferrer">/pub/demo/video</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>33</td>
                  <td>튜토리얼</td>
                  <td><a href="/pub/demo/tutorial" target="_blank" rel="noreferrer">/pub/demo/tutorial</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>

                <tr className="category">
                  <td colSpan={7}>▶ Contact</td>
                </tr>
                <tr>
                  <td>36</td>
                  <td>Brochure</td>
                  <td><a href="/pub/contact/brochure" target="_blank" rel="noreferrer">/pub/contact/brochure</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>37</td>
                  <td>Pseudonymization Guide</td>
                  <td><a href="/pub/contact/pseudonymization-guide" target="_blank" rel="noreferrer">/pub/contact/pseudonymization-guide</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>38</td>
                  <td>문의</td>
                  <td><a href="/pub/contact/inquiry" target="_blank" rel="noreferrer">/pub/contact/inquiry</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>39</td>
                  <td>FAQ</td>
                  <td><a href="/pub/contact/faq" target="_blank" rel="noreferrer">/pub/contact/faq</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>40</td>
                  <td>Download</td>
                  <td><a href="/pub/contact/download" target="_blank" rel="noreferrer">/pub/contact/download</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>41</td>
                  <td>Company</td>
                  <td><a href="/pub/contact/company" target="_blank" rel="noreferrer">/pub/contact/company</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr className="category">
                  <td colSpan={7}>▶ Login</td>
                </tr>
                <tr>
                  <td>42</td>
                  <td>로그인</td>
                  <td>
                    <div>
                      <a href="/pub/login" target="_blank" rel="noreferrer">/pub/login</a>
                    </div>
                    <div style={{ marginTop: '4px', display: 'flex', gap: '4px' }}>
                      <a href="/pub/login" target="_blank" rel="noreferrer" style={{ fontSize: '11px', padding: '2px 6px', background: 'var(--pub-surface)', border: '1px solid var(--pub-border)', borderRadius: '3px' }}>기본</a>
                      <a href="/pub/login?case=error" target="_blank" rel="noreferrer" style={{ fontSize: '11px', padding: '2px 6px', background: 'var(--pub-surface)', border: '1px solid var(--pub-border)', borderRadius: '3px' }}>오류</a>
                      <a href="/pub/login?case=locked" target="_blank" rel="noreferrer" style={{ fontSize: '11px', padding: '2px 6px', background: 'var(--pub-surface)', border: '1px solid var(--pub-border)', borderRadius: '3px' }}>계정잠김</a>
                    </div>
                  </td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.07</td>
                  <td>
                    <button 
                      type="button" 
                      className="btn-history"
                      onClick={() => openHistoryPopup('로그인')}
                    >
                      수정내역
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>43</td>
                  <td>회원가입</td>
                  <td>
                    <div>
                      <a href="/pub/login/signup" target="_blank" rel="noreferrer">/pub/login/signup</a>
                    </div>
                    <div style={{ marginTop: '4px', display: 'flex', gap: '4px' }}>
                      <a href="/pub/login/signup" target="_blank" rel="noreferrer" style={{ fontSize: '11px', padding: '2px 6px', background: 'var(--pub-surface)', border: '1px solid var(--pub-border)', borderRadius: '3px' }}>기본</a>
                      <a href="/pub/login/signup?case=error" target="_blank" rel="noreferrer" style={{ fontSize: '11px', padding: '2px 6px', background: 'var(--pub-surface)', border: '1px solid var(--pub-border)', borderRadius: '3px' }}>오류</a>
                    </div>
                  </td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.07</td>
                  <td>
                    <button 
                      type="button" 
                      className="btn-history"
                      onClick={() => openHistoryPopup('회원가입')}
                    >
                      수정내역
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>44</td>
                  <td>패스워드 찾기</td>
                  <td>
                    <div>
                      <a href="/pub/login/find-password" target="_blank" rel="noreferrer">/pub/login/find-password</a>
                    </div>
                    <div style={{ marginTop: '4px', display: 'flex', gap: '4px' }}>
                      <a href="/pub/login/find-password" target="_blank" rel="noreferrer" style={{ fontSize: '11px', padding: '2px 6px', background: 'var(--pub-surface)', border: '1px solid var(--pub-border)', borderRadius: '3px' }}>기본</a>
                      <a href="/pub/login/find-password?case=sent" target="_blank" rel="noreferrer" style={{ fontSize: '11px', padding: '2px 6px', background: 'var(--pub-surface)', border: '1px solid var(--pub-border)', borderRadius: '3px' }}>발송완료</a>
                    </div>
                  </td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.07</td>
                  <td>
                    <button 
                      type="button" 
                      className="btn-history"
                      onClick={() => openHistoryPopup('패스워드 찾기')}
                    >
                      수정내역
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>45</td>
                  <td>비밀번호 재설정</td>
                  <td>
                    <div>
                      <a href="/pub/login/reset-password" target="_blank" rel="noreferrer">/pub/login/reset-password</a>
                    </div>
                    <div style={{ marginTop: '4px', display: 'flex', gap: '4px' }}>
                      <a href="/pub/login/reset-password" target="_blank" rel="noreferrer" style={{ fontSize: '11px', padding: '2px 6px', background: 'var(--pub-surface)', border: '1px solid var(--pub-border)', borderRadius: '3px' }}>기본</a>
                      <a href="/pub/login/reset-password?case=complete" target="_blank" rel="noreferrer" style={{ fontSize: '11px', padding: '2px 6px', background: 'var(--pub-surface)', border: '1px solid var(--pub-border)', borderRadius: '3px' }}>변경완료</a>
                      <a href="/pub/login/reset-password?case=expired" target="_blank" rel="noreferrer" style={{ fontSize: '11px', padding: '2px 6px', background: 'var(--pub-surface)', border: '1px solid var(--pub-border)', borderRadius: '3px' }}>링크만료</a>
                    </div>
                  </td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.07</td>
                  <td>
                    <button 
                      type="button" 
                      className="btn-history"
                      onClick={() => openHistoryPopup('비밀번호 재설정')}
                    >
                      수정내역
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>46</td>
                  <td>약관동의</td>
                  <td><a href="/pub/login/terms" target="_blank" rel="noreferrer">/pub/login/terms</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.07</td>
                  <td>
                    <button 
                      type="button" 
                      className="btn-history"
                      onClick={() => openHistoryPopup('약관동의')}
                    >
                      수정내역
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>47</td>
                  <td>가입완료</td>
                  <td><a href="/pub/login/signup-complete" target="_blank" rel="noreferrer">/pub/login/signup-complete</a></td>
                  <td>조찬기</td>
                  <td><span className="status ing">진행중</span></td>
                  <td>2026.10.07</td>
                  <td>
                    <button 
                      type="button" 
                      className="btn-history"
                      onClick={() => openHistoryPopup('가입완료')}
                    >
                      수정내역
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>48</td>
                  <td>탈퇴하기</td>
                  <td><a href="/pub/login/withdraw" target="_blank" rel="noreferrer">/pub/login/withdraw</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>49</td>
                  <td>탈퇴완료</td>
                  <td><a href="/pub/login/withdraw-complete" target="_blank" rel="noreferrer">/pub/login/withdraw-complete</a></td>
                  <td>조찬기</td>
                  <td><span className="status todo">대기</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 수정내역 팝업 */}
          <div className={`popup-overlay ${popupOpen ? 'active' : ''}`}>
            <div className="popup-content">
              <div className="popup-header">
                <h2>{popupTitle} 수정내역</h2>
                <button type="button" className="btn-close" onClick={closeHistoryPopup}>&times;</button>
              </div>
              <div className="popup-body">
                {HISTORY_DATA[popupTitle]?.length ? (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {HISTORY_DATA[popupTitle].map((item, idx) => (
                      <li key={idx} style={{ padding: '12px 0', borderBottom: '1px dashed var(--pub-border)', fontSize: '14px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--pub-text-sub)', marginBottom: '4px', display: 'block' }}>{item.date}</span>
                        <span style={{ fontWeight: 600, color: 'var(--pub-status-done)', marginRight: '6px' }}>{item.tag}</span>
                        {item.content}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--pub-text-sub)', fontSize: '14px' }}>
                    등록된 작업 내역이 없습니다.
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
          </main>
    </GuideLayout>
  );
}
