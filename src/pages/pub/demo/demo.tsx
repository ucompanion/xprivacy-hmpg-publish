import React, { useState, useRef } from 'react';
import DemoLayout from '../layouts/DemoLayout';
import styles from './demo.module.scss';

// 3D 블루 폴더 아이콘 SVG
const FolderIcon: React.FC = () => (
  <svg
    viewBox="0 0 80 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.folder_svg}
  >
    <defs>
      <linearGradient id="folderBackGrad" x1="10" y1="8" x2="70" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="1" stopColor="#2563EB" />
      </linearGradient>
      <linearGradient id="folderFrontGrad" x1="6" y1="20" x2="74" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#93C5FD" />
        <stop offset="0.3" stopColor="#3B82F6" />
        <stop offset="1" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="folderTabGrad" x1="6" y1="8" x2="36" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#1D4ED8" />
      </linearGradient>
      <filter id="folderGlow" x="0" y="0" width="80" height="64" filterUnits="userSpaceOnUse">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* 뒷면 바디 */}
    <rect x="8" y="14" width="64" height="44" rx="8" fill="url(#folderBackGrad)" />
    {/* 상단 탭 */}
    <path
      d="M10 14C10 10.6863 12.6863 8 16 8H30.5C33.2 8 35.6 9.4 37 11.6L38.8 14.4C39.5 15.4 40.7 16 42 16H64C67.3137 16 70 18.6863 70 22V24H10V14Z"
      fill="url(#folderTabGrad)"
    />
    {/* 앞면 본체 (입체감 있는 커버) */}
    <path
      d="M6 24C6 20.6863 8.68629 18 12 18H68C71.3137 18 74 20.6863 74 24V52C74 55.3137 71.3137 58 68 58H12C8.68629 58 6 55.3137 6 52V24Z"
      fill="url(#folderFrontGrad)"
    />
    {/* 내부 하이라이트 광택선 */}
    <path
      d="M12 20H68C70.2091 20 72 21.7909 72 24V25C72 22.7909 70.2091 21 68 21H12C9.79086 21 8 22.7909 8 25V24C8 21.7909 9.79086 20 12 20Z"
      fill="#FFFFFF"
      fillOpacity="0.4"
    />
  </svg>
);

// 정보(ⓘ) 아이콘 SVG
const InfoIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

// 셀렉트 드롭다운 화살표 SVG
const ChevronDownIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function PubDemoDemo() {
  const [method, setMethod] = useState('얼굴 블러 (Face Blur)');
  const [intensity, setIntensity] = useState<number>(5);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 선택 버튼 클릭 핸들러
  const handleSelectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  // 파일 인풋 변경 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  // 선택된 파일 해제
  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 파일 크기 포맷
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // 슬라이더 진행 퍼센트 (1~10 기준: (val - 1) / 9 * 100)
  const fillPercent = ((intensity - 1) / 9) * 100;

  return (
    <DemoLayout>
      <div className={styles.demo_container}>
        {/* ==================================================================
            좌측 메인 작업 영역: 파일 업로드 드롭존
            ================================================================== */}
        <section className={styles.content_area}>
          <div
            className={`${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className={styles.hidden_input}
              accept=".mp4,.mov,.avi,.jpg,.jpeg,.png,.gif"
              onChange={handleFileChange}
            />

            {/* 3D 블루 폴더 아이콘 */}
            <div className={styles.folder_icon_wrap}>
              <FolderIcon />
            </div>

            {/* 타이틀 및 서브텍스트 */}
            <h1 className={styles.title}>파일을 드롭하거나 클릭하여 선택하세요</h1>
            <p className={styles.desc}>
              이미지 또는 비디오 파일을 선택하세요
              <span className={styles.bullet}>•</span>
              최대 50MB
            </p>

            {/* 지원 포맷 태그 목록 */}
            <div className={styles.format_tags}>
              <span className={styles.tag}>MP4</span>
              <span className={styles.tag}>MOV</span>
              <span className={styles.tag}>AVI</span>
              <span className={styles.tag}>JPG</span>
              <span className={styles.tag}>PNG</span>
              <span className={styles.tag}>GIF</span>
            </div>

            {/* 파일 선택 상태 분기 */}
            {selectedFile ? (
              <div className={styles.file_preview_card} onClick={(e) => e.stopPropagation()}>
                <div className={styles.file_info_badge}>
                  <span className={styles.file_name}>{selectedFile.name}</span>
                  <span className={styles.file_size}>({formatFileSize(selectedFile.size)})</span>
                </div>
                <div className={styles.file_actions}>
                  <button type="button" className={styles.btn_select} onClick={handleSelectClick}>
                    다른 파일 선택
                  </button>
                  <button type="button" className={styles.btn_remove} onClick={handleRemoveFile}>
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className={styles.btn_select}
                onClick={handleSelectClick}
              >
                파일 선택
              </button>
            )}
          </div>
        </section>

        {/* ==================================================================
            우측 처리 옵션 사이드바
            ================================================================== */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebar_header}>
            <h2>처리 옵션</h2>
          </div>

          <div className={styles.sidebar_body}>
            {/* 비식별화 방법 선택 */}
            <div className={styles.option_group}>
              <label htmlFor="deid-method" className={styles.group_label}>
                비식별화 방법
              </label>
              <div className={styles.select_wrap}>
                <select
                  id="deid-method"
                  className={styles.select_input}
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="얼굴 블러 (Face Blur)">얼굴 블러 (Face Blur)</option>
                  <option value="얼굴 모자이크 (Face Mosaic)">얼굴 모자이크 (Face Mosaic)</option>
                  <option value="얼굴 마스킹 (Face Masking)">얼굴 마스킹 (Face Masking)</option>
                  <option value="차량 번호판 블러 (Plate Blur)">차량 번호판 블러 (Plate Blur)</option>
                  <option value="전체 비식별화 (Full De-id)">전체 비식별화 (Full De-id)</option>
                </select>
                <span className={styles.select_arrow}>
                  <ChevronDownIcon />
                </span>
              </div>
            </div>

            {/* 흐림 강도 설정 */}
            <div className={styles.option_group}>
              <div className={styles.label_row}>
                <div className={styles.title_with_icon}>
                  <span>흐림 강도</span>
                  <span className={styles.info_icon} title="흐림 강도를 설정합니다.">
                    <InfoIcon />
                  </span>
                </div>
                <span className={styles.current_value}>{intensity}</span>
              </div>
              <div className={styles.sub_label}>(Blur Intensity)</div>
              <p className={styles.group_desc}>
                검출된 면적의 흐림 강도를 조절하여 식별 수준을 설정합니다.
              </p>

              {/* 레인지 슬라이더 */}
              <div className={styles.slider_wrap}>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className={styles.range_slider}
                  style={{ '--fill-percent': `${fillPercent}%` } as React.CSSProperties}
                  aria-label="흐림 강도 조절"
                />
                <div className={styles.slider_labels}>
                  <span>약하게(Light)</span>
                  <span>강하게(Strong)</span>
                </div>
              </div>
            </div>

            {/* 하단 안내 카드 */}
            <div className={styles.info_card}>
              파일을 업로드한 뒤 처리가 시작됩니다. 옵션은 언제든 변경 가능합니다.
            </div>
          </div>
        </aside>
      </div>
    </DemoLayout>
  );
}
