import React from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { BasicSection } from '../../../components/domain/Section';
import { ProductCta } from '../product/sections/ProductCta';
import styles from './batch-processing.module.scss';

// Hero: 3 Process Steps
const HERO_STEPS = [
  {
    num: '01',
    title: '일괄 등록',
    subtitle: '대용량 파일 일괄 드래그 앤 드롭',
  },
  {
    num: '02',
    title: '병렬 처리',
    subtitle: '워크플로우 자동화 및 동시 병렬 처리',
  },
  {
    num: '03',
    title: '검수·반출',
    subtitle: '일괄 결과 검수 및 아카이브 다운로드',
  },
];

// Section 1: 대용량 파일 일괄 드래그 앤 드롭
const SECTION1_FEATURES = [
  {
    num: '01',
    title: '폴더 구조 전체 일괄 업로드',
    desc: '하위 폴더에 담긴 수백 개의 이미지와 영상까지 구조 훼손 없이 한 번의 드래그 앤 드롭으로 원스톱 업로드합니다.',
  },
  {
    num: '02',
    title: '이종 파일 포맷 동시 입력 지원',
    desc: 'JPG, PNG부터 MP4, AVI, MOV까지 다양한 확장자의 미디어를 분류 작업 없이 한 작업창에 일괄 등록할 수 있습니다.',
  },
  {
    num: '03',
    title: '대용량 파일 전송 중단 없는 안정적 네트워크 파이프라인',
    desc: '수십 십기가바이트(GB) 이상의 대용량 CCTV 및 행정 아카이브 파일도 튕김이나 전송 오류 없이 안전하게 받아냅니다.',
  },
];

// Section 2: 워크플로우 자동화 및 동시 병렬 처리
const SECTION2_FEATURES = [
  {
    num: '01',
    title: '지능형 AI 멀티 스레드 병렬 연산',
    desc: '등록된 파일들을 AI 연산 자원에 효율적으로 분배·동시 처리하여 대량의 가공 요청도 대기 없이 빠르게 해결합니다.',
  },
  {
    num: '02',
    title: '클릭 한 번으로 동일 보안 정책 일괄 적용',
    desc: '자주 사용하는 비식별 옵션(모자이크, 가우시안 블러, 가상 얼굴 변환 등)을 프리셋으로 저장해 등록된 전체 파일에 동일하게 일괄 적용합니다.',
  },
  {
    num: '03',
    title: '담당자 부재 중에도 지속되는 스마트 작업 큐',
    desc: '웹 브라우저를 닫거나 다른 업무를 보는 동안에도 서버에서 비식별화 작업이 멈춤 없이 24시간 자동 진행됩니다.',
  },
];

// Section 3: 일괄 결과 검수 및 아카이브 다운로드
const SECTION3_FEATURES = [
  {
    num: '01',
    title: '대시보드 기반 실시간 진행률 모니터링',
    desc: '전체 작업 진행률(%), 성공/실패 여부, 처리 완료된 파일 썸네일을 대시보드 한눈에 파악할 수 있습니다.',
  },
  {
    num: '02',
    title: '일괄 검수 및 빠른 개별 수정 지원',
    desc: '일괄 처리된 결과물 중 재확인이 필요한 특정 파일만 클릭하여 즉시 타임라인 검수 및 영역 수정을 진행합니다.',
  },
  {
    num: '03',
    title: '원클릭 압축 파일 반출',
    desc: '가공 완료된 수백 개의 결과물을 원본 폴더 구조 그대로 유지하며 암호화된 압축(ZIP) 파일 형태로 일괄 다운로드합니다.',
  },
];

export default function PubSubFeaturesBatchProcessing() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        
        {/* ===================================================================
            Hero Section: 대량의 영상 데이터, 대기 시간 없이 초고속 병렬 가공
        =================================================================== */}
        <BasicSection
          className={styles.heroSection}
          bg="white"
          layout="vertical"
          align="center"
          eyebrow="FEATURES"
          title={
            <>
              대량의 영상 데이터,<br />
              대기 시간 없이 초고속 병렬 가공
            </>
          }
          description={
            <>
              반복적이고 소모적인 개별 가공 작업 없이, 다수의 이미지와 영상을 한꺼번에 등록하여<br />
              탐지부터 비식별 처리까지 한 번에 완료합니다.
            </>
          }
        >
          {/* Action Button */}
          <div className={styles.heroAction}>
            <a href="/pub/demo" className={styles.btnTrial}>
              무료 체험 시작
            </a>
          </div>

          {/* 3 Step Process Cards */}
          <div className={styles.processSteps}>
            {HERO_STEPS.map((step, idx) => (
              <React.Fragment key={step.num}>
                <div className={styles.stepCard}>
                  <span className={styles.stepNum}>{step.num}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepSubtitle}>{step.subtitle}</p>
                </div>
                {idx < HERO_STEPS.length - 1 && (
                  <span className={styles.stepArrow}>→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </BasicSection>

        {/* ===================================================================
            Section 1: 대용량 파일 일괄 드래그 앤 드롭 (Gray Bg, Mockup Left, Text Right)
        =================================================================== */}
        <BasicSection
          className={styles.featureSection}
          bg="gray"
          layout="horizontal-reverse"
          align="left"
          eyebrow="WHY XPRIVACY"
          title={
            <>
              대용량 파일<br />
              일괄 드래그 앤 드롭
            </>
          }
          description={
            <>
              폴더 단위 대용량 업로드를 지원하여 수많은 이미지와 영상 파일을<br />
              일일이 개별 등록할 필요 없이 한 번에 세팅합니다.
            </>
          }
          headerExtra={
            <div className={styles.featureList}>
              {SECTION1_FEATURES.map((item) => (
                <div key={item.num} className={styles.featureItem}>
                  <span className={styles.num}>{item.num}</span>
                  <h4 className={styles.title}>{item.title}</h4>
                  <p className={styles.desc}>{item.desc}</p>
                </div>
              ))}
            </div>
          }
        >
          {/* BATCH UPLOAD Mockup */}
          <div className={styles.mockupCard}>
            <div className={styles.mockupHeader}>
              <span className={styles.headerTitle}>BATCH UPLOAD</span>
              <span className={styles.disclaimerBadge}>설명용 표현 · 실제 제품 화면 아님</span>
            </div>

            <div className={styles.uploadMockupBody}>
              {/* Left Folder Tree */}
              <div className={styles.sourceTree}>
                <span className={styles.treeTitle}>SOURCE FOLDER</span>
                <div className={styles.treeNode}>
                  <div className={styles.folderRow}>📁 archive</div>
                  <div className={styles.subNode}>
                    <div className={styles.folderRow}>📁 cam_A</div>
                    <div className={styles.subNode}>
                      <div className={styles.fileRow}>
                        <span>clip_01</span>
                        <span className={styles.typeTag}>영상</span>
                      </div>
                      <div className={styles.fileRow}>
                        <span>clip_02</span>
                        <span className={styles.typeTag}>영상</span>
                      </div>
                      <div className={styles.fileRow}>
                        <span>frame_01</span>
                        <span className={styles.typeTag}>이미지</span>
                      </div>
                    </div>

                    <div className={styles.folderRow}>📁 cam_B</div>
                    <div className={styles.subNode}>
                      <div className={styles.fileRow}>
                        <span>clip_03</span>
                        <span className={styles.typeTag}>영상</span>
                      </div>
                      <div className={styles.fileRow}>
                        <span>frame_02</span>
                        <span className={styles.typeTag}>이미지</span>
                      </div>
                    </div>

                    <div className={styles.folderRow}>📁 docs_scan</div>
                    <div className={styles.subNode}>
                      <div className={styles.fileRow}>
                        <span>scan_01</span>
                        <span className={styles.typeTag}>이미지</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transfer Indicator */}
              <div className={styles.transferIndicator}>
                <span className={styles.arrow}>→</span>
                <span className={styles.label}>Drag &amp; Drop</span>
              </div>

              {/* Drop Zone */}
              <div className={styles.dropZone}>
                <div className={styles.dropIcon}>📁</div>
                <div className={styles.dropText}>
                  폴더째 끌어다 놓기
                  <small>작업창에 일괄 등록</small>
                </div>
                <div className={styles.registeredFolders}>
                  <span>archive / cam_A</span>
                  <span>archive / cam_B</span>
                  <span>archive / docs_scan</span>
                </div>
              </div>
            </div>

            <div className={styles.mockupFooter}>
              <span>폴더 구조 유지 표시 · 파일 수·용량은 표시하지 않음</span>
            </div>
          </div>
        </BasicSection>

        {/* ===================================================================
            Section 2: 워크플로우 자동화 및 동시 병렬 처리 (White Bg, Text Left, Mockup Right)
        =================================================================== */}
        <BasicSection
          className={styles.featureSection}
          bg="white"
          layout="horizontal"
          align="left"
          eyebrow="WHY XPRIVACY"
          title={
            <>
              워크플로우 자동화 및<br />
              동시 병렬 처리
            </>
          }
          description={
            <>
              대기 시간 없는 초고속 AI 동시 병렬 가공 엔진<br />
              여러 대의 AI 작업 큐(Queue)가 동시 가동되어 다량의 파일이 입력되더라도<br />
              멈춤 없이 실시간급으로 일괄 탐지 및 비식별 처리를 완료합니다.
            </>
          }
          headerExtra={
            <div className={styles.featureList}>
              {SECTION2_FEATURES.map((item) => (
                <div key={item.num} className={styles.featureItem}>
                  <span className={styles.num}>{item.num}</span>
                  <h4 className={styles.title}>{item.title}</h4>
                  <p className={styles.desc}>{item.desc}</p>
                </div>
              ))}
            </div>
          }
        >
          {/* PARALLEL QUEUE Mockup */}
          <div className={styles.mockupCard}>
            <div className={styles.mockupHeader}>
              <span className={styles.headerTitle}>PARALLEL QUEUE</span>
              <span className={styles.disclaimerBadge}>설명용 표현 · 실제 제품 화면 아님</span>
            </div>

            <div className={styles.queueMockupBody}>
              {/* Input Files */}
              <div className={styles.inputFilesBox}>
                <span className={styles.boxLabel}>입력 파일</span>
                <span className={styles.itemPill}>clip_01</span>
                <span className={styles.itemPill}>clip_02</span>
                <span className={styles.itemPill}>clip_03</span>
                <span className={styles.itemPill}>frame_01</span>
                <span className={styles.itemPill}>frame_02</span>
                <span className={styles.itemPill}>scan_01</span>
                <span className={styles.itemPill}>...</span>
              </div>

              {/* Preset Column */}
              <div className={styles.presetBadgeColumn}>
                <div className={styles.presetBox}>
                  <span className={styles.presetTag}>PRESET</span>
                  <span className={styles.presetText}>보안 정책<br />일괄 적용</span>
                </div>
                <div className={styles.distributeArrow}>
                  <span>분배</span>
                  <span>→</span>
                </div>
              </div>

              {/* Queue Cluster */}
              <div className={styles.queueCluster}>
                <span className={styles.clusterTitle}>AI 작업 큐 (QUEUE)</span>
                <div className={styles.queueRow}>
                  <span className={styles.qName}>Queue A</span>
                  <span className={styles.qFile}>clip_01</span>
                  <span className={`${styles.statusTag} ${styles.processing}`}>처리 중</span>
                </div>
                <div className={styles.queueRow}>
                  <span className={styles.qName}>Queue B</span>
                  <span className={styles.qFile}>clip_02</span>
                  <span className={`${styles.statusTag} ${styles.processing}`}>처리 중</span>
                </div>
                <div className={styles.queueRow}>
                  <span className={styles.qName}>Queue C</span>
                  <span className={styles.qFile}>frame_01</span>
                  <span className={`${styles.statusTag} ${styles.processing}`}>처리 중</span>
                </div>
                <div className={styles.queueRow}>
                  <span className={styles.qName}>Queue D</span>
                  <span className={styles.qFile}>clip_03</span>
                  <span className={`${styles.statusTag} ${styles.waiting}`}>대기</span>
                </div>
                <div className={styles.clusterFooterText}>
                  서버 측 작업 큐 (동시 가동 표시)
                </div>
              </div>

              {/* Result Indicator */}
              <div className={styles.resultColumn}>
                <span className={styles.arrow}>→</span>
                <div className={styles.resultBox}>
                  <div className={styles.icon} />
                  <span className={styles.label}>결과</span>
                </div>
              </div>
            </div>

            <div className={styles.mockupFooter}>
              <span className={`${styles.footerBadge} ${styles.badgeBlue}`}>처리 중</span>
              <span className={`${styles.footerBadge} ${styles.badgeGray}`}>대기</span>
              <span>진행률·처리 시간은 표시하지 않음</span>
            </div>
          </div>
        </BasicSection>

        {/* ===================================================================
            Section 3: 일괄 결과 검수 및 아카이브 다운로드 (Gray Bg, Mockup Left, Text Right)
        =================================================================== */}
        <BasicSection
          className={styles.featureSection}
          bg="gray"
          layout="horizontal-reverse"
          align="left"
          eyebrow="WHY XPRIVACY"
          title={
            <>
              일괄 결과 검수 및<br />
              아카이브 다운로드
            </>
          }
          description={
            <>
              파일별 가공 상태를 대시보드에서 한눈에 확인하고,<br />
              검수 완료된 결과물 전체를 원클릭 압축 파일 형태로 즉시 반출할 수 있습니다.
            </>
          }
          headerExtra={
            <div className={styles.featureList}>
              {SECTION3_FEATURES.map((item) => (
                <div key={item.num} className={styles.featureItem}>
                  <span className={styles.num}>{item.num}</span>
                  <h4 className={styles.title}>{item.title}</h4>
                  <p className={styles.desc}>{item.desc}</p>
                </div>
              ))}
            </div>
          }
        >
          {/* REVIEW & EXPORT Mockup */}
          <div className={styles.mockupCard}>
            <div className={styles.mockupHeader}>
              <span className={styles.headerTitle}>REVIEW &amp; EXPORT</span>
              <span className={styles.disclaimerBadge}>설명용 표현 · 실제 제품 화면 아님</span>
            </div>

            <div className={styles.reviewMockupBody}>
              {/* Result List */}
              <div className={styles.resultListBox}>
                <span className={styles.boxTitle}>결과 목록</span>
                <div className={styles.resultRow}>
                  <span>clip_01</span>
                  <span className={`${styles.statusTag} ${styles.done}`}>완료</span>
                </div>
                <div className={styles.resultRow}>
                  <span>clip_02</span>
                  <span className={`${styles.statusTag} ${styles.done}`}>완료</span>
                </div>
                <div className={`${styles.resultRow} ${styles.highlightReview}`}>
                  <span>clip_03</span>
                  <span className={`${styles.statusTag} ${styles.needReview}`}>검수 필요</span>
                </div>
                <div className={styles.resultRow}>
                  <span>frame_01</span>
                  <span className={`${styles.statusTag} ${styles.done}`}>완료</span>
                </div>
                <div className={styles.resultRow}>
                  <span>frame_02</span>
                  <span className={`${styles.statusTag} ${styles.done}`}>완료</span>
                </div>
                <div className={styles.resultRow}>
                  <span>scan_01</span>
                  <span className={`${styles.statusTag} ${styles.done}`}>완료</span>
                </div>
              </div>

              {/* Review Filter */}
              <div className={styles.reviewBadgeColumn}>
                <span className={styles.arrow}>→</span>
                <div className={styles.reviewBox}>
                  <span className={styles.rTitle}>개별 검수</span>
                  <span className={styles.rSub}>필요한 파일만</span>
                </div>
                <span className={styles.arrow}>→</span>
              </div>

              {/* Export Archive Box */}
              <div className={styles.exportArchiveBox}>
                <div className={styles.archiveIcon}>📦</div>
                <div className={styles.archiveTitle}>
                  압축 파일
                  <small>일괄 반출</small>
                </div>
                <div className={styles.archiveTree}>
                  <span className={styles.folder}>📁 archive</span>
                  <span className={styles.subFolder}>📁 cam_A</span>
                  <span className={styles.subFolder}>📁 cam_B</span>
                </div>
              </div>
            </div>

            <div className={styles.mockupFooter}>
              <span className={`${styles.footerBadge} ${styles.badgeGreen}`}>완료</span>
              <span className={`${styles.footerBadge} ${styles.badgeOrange}`}>검수 필요</span>
              <span>진행률(%)·암호화 방식은 표시하지 않음</span>
            </div>
          </div>
        </BasicSection>

        {/* ===================================================================
            Section 4: Bottom Product CTA
        =================================================================== */}
        <ProductCta />

      </div>
    </FrontLayout>
  );
}
