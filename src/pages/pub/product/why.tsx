import React from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { ProductCta } from './sections/ProductCta';
import styles from './why.module.scss';

type FilterType = 'mosaic' | 'masking' | 'blur';
type FaceFilterType = 'mosaic' | 'masking' | 'blur' | 'virtualFace';

export default function PubSubProductWhy() {
  const [faceOption, setFaceOption] = React.useState<FaceFilterType>('mosaic');
  const [bodyOption, setBodyOption] = React.useState<FilterType>('masking');
  const [plateOption, setPlateOption] = React.useState<FilterType>('mosaic');

  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        
        {/* Hero Section */}
        <HeroSection
          className={styles.heroSectionWhy}
          title={
            <>
              개인정보는 보호하고<br />
              활용할 데이터의 가치는 그대로
            </>
          }
          description="xPrivacy(엑스프라이버시)는 개인정보를 가명/익명처리하여 빅데이터 분석, 인공지능 학습 등 데이터 활용에 필요한 가치를 안전하게 보존하는 개인정보 비식별 조치 솔루션입니다."
        >
          <div className={styles.heroFeatureList}>
            <div className={styles.itemCard}>
              <span className={styles.num}>01</span>
              <h4>정밀한 객체 분석</h4>
              <p>얼굴, 신체, 번호판 등 다양한 객체에 대한 고정밀 탐지 및 추적</p>
            </div>
            <div className={styles.itemCard}>
              <span className={styles.num}>02</span>
              <h4>운영 효율 극대화</h4>
              <p>대용량 고화질 영상도 지연 없이 신속하게 처리하여 업무 효율 극대화</p>
            </div>
            <div className={styles.itemCard}>
              <span className={styles.num}>03</span>
              <h4>비가역적 보안 변형</h4>
              <p>가상 얼굴 합성 및 지능형 블러를 통해 원본 복원이 불가능한 완벽한 보안 제공</p>
            </div>
          </div>
        </HeroSection>

        {/* Section 1: 정밀 AI 탐지 */}
        <BasicSection 
          layout="horizontal"
          eyebrow="DETECTION & TRACKING"
          title="정밀 AI 탐지 · 트랙 단위 추적"
          description="얼굴(Face)부터 전신(Body), 차량 번호판(License Plate)까지 고화질 영상에서 미세한 크기의 객체까지 빈틈없이 탐지합니다."
          headerExtra={
            <div className={styles.featureBlockList}>
              <div className={styles.fBlock}>
                <h4 className={styles.title}>Face Detection</h4>
                <p>원거리 얼굴, 가려진 얼굴까지 고정밀 탐지</p>
              </div>
              <div className={styles.fBlock}>
                <h4 className={styles.title}>Body Detection</h4>
                <p>보행자 전신 및 이동 궤적을 트랙 단위로 연속 추적</p>
              </div>
              <div className={styles.fBlock}>
                <h4 className={styles.title}>License Plate</h4>
                <p>국내외 다양한 차종의 번호판 규격 완벽 인식</p>
              </div>
            </div>
          }
        >
          <div className={styles.trackingVisual}>
            {/* Visual Bounding Boxes overlay */}
            <div className={styles.pedestrianBox}>
              <span className={styles.boxTag}>Person 98%</span>
              
              <div className={styles.pedestrianInner}>
                {/* Face Target Filter Area */}
                <div className={styles.pedestrianFaceBox}>
                  <div className={`${styles.filterLayer} ${styles[faceOption]}`}>
                    {faceOption === 'virtualFace' && (
                      <div className={styles.virtualFaceGraphic}>
                        <svg viewBox="0 0 24 24" className={styles.virtualFaceIcon} fill="none" stroke="currentColor">
                          <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                          <path d="M9 10h.01M15 10h.01M9 15c1 1.5 5 1.5 6 0" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Body Target Filter Area */}
                <div className={styles.pedestrianBodyBox}>
                  <div className={`${styles.filterLayer} ${styles[bodyOption]}`} />
                </div>
              </div>
            </div>

            {/* Car Plate Filter Area */}
            <div className={styles.carPlateBox}>
              <span className={styles.boxTag}>Plate 99%</span>
              <div className={styles.plateInner}>
                <div className={`${styles.filterLayer} ${styles[plateOption]}`} />
              </div>
            </div>

            {/* Floating Mock UI - Dark Panel */}
            <div className={styles.floatingPanel}>
              <h4 className={styles.panelTitle}>Privacy Options</h4>
              
              {/* Group 1: Face */}
              <div className={styles.optGroup}>
                <h5>Face</h5>
                <div className={styles.radioGroup}>
                  <label className={`${styles.radioItem} ${faceOption === 'mosaic' ? styles.active : ''}`}>
                    <span className={styles.radioText}>Mosaic</span>
                    <input 
                      type="radio" 
                      name="privacy_face" 
                      value="mosaic" 
                      checked={faceOption === 'mosaic'} 
                      onChange={() => setFaceOption('mosaic')}
                      className={styles.radioInput} 
                    />
                    <span className={styles.radioCircle} aria-hidden="true" />
                  </label>

                  <label className={`${styles.radioItem} ${faceOption === 'masking' ? styles.active : ''}`}>
                    <span className={styles.radioText}>Masking</span>
                    <input 
                      type="radio" 
                      name="privacy_face" 
                      value="masking" 
                      checked={faceOption === 'masking'} 
                      onChange={() => setFaceOption('masking')}
                      className={styles.radioInput} 
                    />
                    <span className={styles.radioCircle} aria-hidden="true" />
                  </label>

                  <label className={`${styles.radioItem} ${faceOption === 'blur' ? styles.active : ''}`}>
                    <span className={styles.radioText}>Blur</span>
                    <input 
                      type="radio" 
                      name="privacy_face" 
                      value="blur" 
                      checked={faceOption === 'blur'} 
                      onChange={() => setFaceOption('blur')}
                      className={styles.radioInput} 
                    />
                    <span className={styles.radioCircle} aria-hidden="true" />
                  </label>

                  <label className={`${styles.radioItem} ${faceOption === 'virtualFace' ? styles.active : ''}`}>
                    <span className={styles.radioText}>Virtual Face</span>
                    <input 
                      type="radio" 
                      name="privacy_face" 
                      value="virtualFace" 
                      checked={faceOption === 'virtualFace'} 
                      onChange={() => setFaceOption('virtualFace')}
                      className={styles.radioInput} 
                    />
                    <span className={styles.radioCircle} aria-hidden="true" />
                  </label>
                </div>
              </div>

              {/* Group 2: Body */}
              <div className={styles.optGroup}>
                <h5>Body</h5>
                <div className={styles.radioGroup}>
                  <label className={`${styles.radioItem} ${bodyOption === 'mosaic' ? styles.active : ''}`}>
                    <span className={styles.radioText}>Mosaic</span>
                    <input 
                      type="radio" 
                      name="privacy_body" 
                      value="mosaic" 
                      checked={bodyOption === 'mosaic'} 
                      onChange={() => setBodyOption('mosaic')}
                      className={styles.radioInput} 
                    />
                    <span className={styles.radioCircle} aria-hidden="true" />
                  </label>

                  <label className={`${styles.radioItem} ${bodyOption === 'masking' ? styles.active : ''}`}>
                    <span className={styles.radioText}>Masking</span>
                    <input 
                      type="radio" 
                      name="privacy_body" 
                      value="masking" 
                      checked={bodyOption === 'masking'} 
                      onChange={() => setBodyOption('masking')}
                      className={styles.radioInput} 
                    />
                    <span className={styles.radioCircle} aria-hidden="true" />
                  </label>

                  <label className={`${styles.radioItem} ${bodyOption === 'blur' ? styles.active : ''}`}>
                    <span className={styles.radioText}>Blur</span>
                    <input 
                      type="radio" 
                      name="privacy_body" 
                      value="blur" 
                      checked={bodyOption === 'blur'} 
                      onChange={() => setBodyOption('blur')}
                      className={styles.radioInput} 
                    />
                    <span className={styles.radioCircle} aria-hidden="true" />
                  </label>
                </div>
              </div>

              {/* Group 3: Plate */}
              <div className={styles.optGroup}>
                <h5>Plate</h5>
                <div className={styles.radioGroup}>
                  <label className={`${styles.radioItem} ${plateOption === 'mosaic' ? styles.active : ''}`}>
                    <span className={styles.radioText}>Mosaic</span>
                    <input 
                      type="radio" 
                      name="privacy_plate" 
                      value="mosaic" 
                      checked={plateOption === 'mosaic'} 
                      onChange={() => setPlateOption('mosaic')}
                      className={styles.radioInput} 
                    />
                    <span className={styles.radioCircle} aria-hidden="true" />
                  </label>

                  <label className={`${styles.radioItem} ${plateOption === 'masking' ? styles.active : ''}`}>
                    <span className={styles.radioText}>Masking</span>
                    <input 
                      type="radio" 
                      name="privacy_plate" 
                      value="masking" 
                      checked={plateOption === 'masking'} 
                      onChange={() => setPlateOption('masking')}
                      className={styles.radioInput} 
                    />
                    <span className={styles.radioCircle} aria-hidden="true" />
                  </label>

                  <label className={`${styles.radioItem} ${plateOption === 'blur' ? styles.active : ''}`}>
                    <span className={styles.radioText}>Blur</span>
                    <input 
                      type="radio" 
                      name="privacy_plate" 
                      value="blur" 
                      checked={plateOption === 'blur'} 
                      onChange={() => setPlateOption('blur')}
                      className={styles.radioInput} 
                    />
                    <span className={styles.radioCircle} aria-hidden="true" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </BasicSection>

        {/* Section 2: 작은·원거리 얼굴 재현율 강화 */}
        <BasicSection 
          layout="vertical"
          align="center"
          bg="gray"
          className={styles.sectionAlt}
          eyebrow="ACCURACY CRITERIA"
          title="작은 · 원거리 얼굴 재현율 강화"
          description="초소형 객체와 왜곡된 화각의 영상에서도 탁월한 인식률을 자랑합니다. 고해상도 CCTV부터 모바일 영상까지 어떤 환경에서도 안정적인 비식별 처리를 지원합니다."
        >
          <div className={styles.splitContentWrap}>
            <div className={styles.tableCard}>
              <table className={styles.metricTableSmall}>
                <thead>
                  <tr>
                    <th>비식별 방식</th>
                    <th>얼굴</th>
                    <th>전신</th>
                    <th>번호판</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mosaic</td>
                    <td><span className={styles.dashIcon}></span></td>
                    <td><span className={styles.dashIcon}></span></td>
                    <td><span className={styles.dashIcon}></span></td>
                  </tr>
                  <tr>
                    <td>Masking</td>
                    <td><span className={styles.chkIcon}></span></td>
                    <td><span className={styles.chkIcon}></span></td>
                    <td><span className={styles.chkIcon}></span></td>
                  </tr>
                  <tr>
                    <td>Blur</td>
                    <td><span className={styles.dashIcon}></span></td>
                    <td><span className={styles.dashIcon}></span></td>
                    <td><span className={styles.dashIcon}></span></td>
                  </tr>
                  <tr>
                    <td>Virtual Face</td>
                    <td><span className={styles.chkIcon}></span></td>
                    <td><span className={styles.dashIcon}></span></td>
                    <td><span className={styles.dashIcon}></span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.distanceVisualRight}>
              {/* Face detection bounding boxes for the 4 people */}
              <div className={styles.faceDetectBox1}></div>
              <div className={styles.faceDetectBox2}></div>
              <div className={styles.faceDetectBox3}></div>
              <div className={styles.faceDetectBox4}></div>
            </div>
          </div>
        </BasicSection>

        {/* Section 3: 원본 얼굴을 가상의 얼굴로 바꿉니다 */}
        <BasicSection 
          layout="horizontal"
          eyebrow="SYNTHETIC FACE"
          title={<>원본 얼굴을<br/>가상의 얼굴로 바꿉니다</>}
          description="단순한 모자이크나 블러가 아닌 생성형 AI 기반 가상 얼굴 대체 기술로 영상의 자연스러움을 완벽하게 유지합니다."
          headerExtra={
            <div className={styles.featureBlockList}>
              <div className={styles.fBlock}>
                <h4 className={styles.title}>Face Replacement</h4>
                <p>자연스러운 가상 얼굴 생성으로 원본 손상 최소화</p>
              </div>
              <div className={styles.fBlock}>
                <h4 className={styles.title}>Motion Preservation</h4>
                <p>미세한 표정 변화까지 자연스럽게 유지되는 프레임 처리</p>
              </div>
            </div>
          }
        >
          <div className={styles.virtualFaceVisualDevice}>
            <div className={styles.deviceFrame}>
              <div className={styles.faceWrap}>
                <span className={styles.faceLabel}>원본 얼굴</span>
                <div className={styles.faceBefore}></div>
              </div>
              <div className={styles.faceArrow}>
                <span>▶</span>
              </div>
              <div className={styles.faceWrap}>
                <span className={styles.faceLabel}>가상의 얼굴 생성 결과</span>
                <div className={styles.faceAfter}></div>
              </div>
            </div>
          </div>
        </BasicSection>

        {/* Section 4: 객체 크기와 무관한 일괄적인 블러 강도 적용 */}
        <BasicSection 
          layout="vertical"
          align="center"
          bg="gray"
          className={styles.sectionAlt}
          eyebrow="BALANCED BLUR TECHNOLOGY"
          title="객체 크기와 무관한 일괄적인 블러 강도 적용"
          description="xPrivacy는 객체의 크기와 무관하게 일괄적인 블러 강도를 적용하여 영상 내 모든 객체를 빈틈없이 비식별 처리합니다."
        >
          <div className={styles.splitContentWrap}>
            <div className={styles.tableCard}>
              <table className={styles.speedTable}>
                <thead>
                  <tr>
                    <th>항목</th>
                    <th>처리 속도</th>
                    <th>1080p FPS 현황</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mosaic</td>
                    <td>약 120 fps</td>
                    <td>120</td>
                  </tr>
                  <tr>
                    <td>Masking</td>
                    <td>약 110 fps</td>
                    <td>110</td>
                  </tr>
                  <tr>
                    <td>Blur</td>
                    <td>약 60 fps</td>
                    <td>60</td>
                  </tr>
                  <tr>
                    <td>Virtual Face</td>
                    <td>약 38 fps</td>
                    <td>38</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.chartCard}>
              <div className={styles.chartArea}>
                <div className={styles.barItem}>
                  <span className={styles.barValue}>120</span>
                  <div className={styles.bar} style={{height: '100%'}}></div>
                  <span className={styles.barLabel}>Mosaic</span>
                </div>
                <div className={styles.barItem}>
                  <span className={styles.barValue}>110</span>
                  <div className={styles.bar} style={{height: '91%'}}></div>
                  <span className={styles.barLabel}>Masking</span>
                </div>
                <div className={styles.barItem}>
                  <span className={styles.barValue}>60</span>
                  <div className={styles.bar} style={{height: '50%'}}></div>
                  <span className={styles.barLabel}>Blur</span>
                </div>
                <div className={styles.barItem}>
                  <span className={styles.barValue}>38</span>
                  <div className={styles.bar} style={{height: '31%'}}></div>
                  <span className={styles.barLabel}>Virtual Face</span>
                </div>
              </div>
            </div>
          </div>
          <p className={styles.speedNote}>
            * 기준: 1080p 영상 / 1CH, 당사 내부 테스트 기준으로 시스템 환경에 따라 차이가 있을 수 있습니다.
          </p>
        </BasicSection>

        {/* Cta Section */}
        <ProductCta
          eyebrow="WHY XPRIVACY"
          title={<>업무 환경에 맞는 xPrivacy를<br />직접 확인해보세요</>}
          description="무료 체험으로 Web 버전과 On-Premise 버전 중 적합한 방식을 선택할 수 있습니다."
          solidButtonText="구매 지원 / 시연"
          outlineButtonText="도입 문의"
        />
      </div>
    </FrontLayout>
  );
}
