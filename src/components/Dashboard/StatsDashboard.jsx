// 데이터 통계 분석 대시보드 – 시각적으로 개선된 버전
import { useMemo, useEffect, useState, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import './StatsDashboard.css';

// Chart.js에 필요한 스케일/요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

/* ───────────────────────────────────────────────
 * CSS 변수 → 실제 색상값 변환 유틸
 * Chart.js는 var(--xxx)를 해석하지 못하므로
 * getComputedStyle로 실제 색상값을 가져옴
 * ─────────────────────────────────────────────── */
function getCSSVar(varName) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
}

/* ───────────────────────────────────────────────
 * 시대(era) 키 → CSS 변수명 매핑
 * index.css에 정의된 --era-xxx 변수를 활용
 * ─────────────────────────────────────────────── */
const ERA_CSS_MAP = {
  ancient:      '--era-ancient',
  medieval:     '--era-medieval',
  earlyModern:  '--era-early-modern',
  premodern:    '--era-early-modern',   // 전근대는 근세 색상 재사용
  modern:       '--era-modern',
  contemporary: '--era-contemporary',
  unknown:      '--text-tertiary',
};

/* ───────────────────────────────────────────────
 * 카테고리별 고유 색상 팔레트
 * 프로젝트의 따뜻한 톤에 맞춘 컬러 세트
 * ─────────────────────────────────────────────── */
const CATEGORY_COLORS = [
  '#D4A017', // 정치 – 금색
  '#E05252', // 전쟁 – 붉은색
  '#5A9069', // 문화 – 녹색
  '#5B8DB8', // 발명 – 파란색
  '#A07AB8', // 발견 – 보라색
  '#E8965A', // 사상가 – 주황
  '#C9A96E', // 왕 – 골드
  '#6BBFB5', // 과학자 – 청록
  '#B8865A', // 출판 – 갈색
  '#7A8EC9', // 실험 – 인디고
  '#D48A9E', // 기타 – 핑크
  '#8B8680', // 경제 등 – 회색
];

/* ───────────────────────────────────────────────
 * 지역별 고유 색상 팔레트
 * ─────────────────────────────────────────────── */
const REGION_COLORS = [
  '#E05252', // 한국 – 빨간색
  '#D4A017', // 동아시아 – 금색
  '#5B8DB8', // 유럽 – 파란색
  '#E8965A', // 중동 – 주황
  '#6BBFB5', // 아메리카 – 청록
  '#A07AB8', // 아프리카 – 보라
  '#5A9069', // 남아시아 – 녹색
  '#C9A96E', // 아시아 – 골드
  '#7A8EC9', // 오세아니아 – 인디고
  '#8B8680', // 기타 – 회색
];

/* ───────────────────────────────────────────────
 * 숫자 카운트업 애니메이션 훅
 * 0부터 목표값까지 부드럽게 카운트
 * ─────────────────────────────────────────────── */
function useCountUp(target, duration = 800) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const animate = (now) => {
      // 경과 시간 비율 (0→1)
      const progress = Math.min((now - start) / duration, 1);
      // ease-out 함수로 부드럽게 감속
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return value;
}

/* ───────────────────────────────────────────────
 * 요약 숫자 카드 (아이콘 + 카운트업 + 퍼센트)
 * ─────────────────────────────────────────────── */
function SummaryCard({ icon, label, count, total, delay }) {
  const animatedCount = useCountUp(count, 1000);
  const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;

  return (
    <div className="summary-card" style={{ animationDelay: `${delay}ms` }}>
      <span className="summary-icon">{icon}</span>
      <span className="summary-label">{label}</span>
      <span className="summary-value">{animatedCount}</span>
      <span className="summary-pct">{percentage}%</span>
    </div>
  );
}

/* ───────────────────────────────────────────────
 * 데이터를 내림차순으로 정렬하는 유틸
 * 라벨과 값을 함께 정렬
 * ─────────────────────────────────────────────── */
function sortDescending(labels, values, colors) {
  const combined = labels.map((label, i) => ({
    label,
    value: values[i],
    color: colors?.[i] || '#888',
  }));
  combined.sort((a, b) => b.value - a.value);
  return {
    labels: combined.map(c => c.label),
    values: combined.map(c => c.value),
    colors: combined.map(c => c.color),
  };
}

/* ═══════════════════════════════════════════════
 * 메인 컴포넌트
 * ═══════════════════════════════════════════════ */
const StatsDashboard = ({ onClose, eventsData, peopleData, mediaData }) => {
  const { t } = useTranslation();

  /* ── 통계 데이터 계산 ── */
  const stats = useMemo(() => {
    // 1. 시대별 분포 (이벤트 + 인물)
    const eraCounts = {};
    [...eventsData, ...peopleData].forEach(item => {
      const era = item.era || 'unknown';
      eraCounts[era] = (eraCounts[era] || 0) + 1;
    });

    // 2. 카테고리별 분포
    const categoryCounts = {};
    [...eventsData, ...peopleData].forEach(item => {
      const cat = item.category || 'other';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    // 3. 지역별 분포 (이벤트만)
    const regionCounts = {};
    eventsData.forEach(event => {
      const region = event.location?.region || 'unknown';
      regionCounts[region] = (regionCounts[region] || 0) + 1;
    });

    // 4. 유형별 개수
    const typeCounts = {
      event: eventsData.length,
      person: peopleData.length,
      media: mediaData.length,
    };

    return { eraCounts, categoryCounts, regionCounts, typeCounts };
  }, [eventsData, peopleData, mediaData]);

  /* ── 테마 색상 가져오기 (CSS 변수 → 실제 값) ── */
  const themeColors = useMemo(() => ({
    textPrimary:   getCSSVar('--text-primary'),
    textSecondary: getCSSVar('--text-secondary'),
    textTertiary:  getCSSVar('--text-tertiary'),
    bgPrimary:     getCSSVar('--bg-primary'),
    bgSecondary:   getCSSVar('--bg-secondary'),
    border:        getCSSVar('--border'),
    accentPrimary: getCSSVar('--accent-primary'),
  }), []);

  /* ── 시대별 바 차트 데이터 ── */
  const eraChartData = useMemo(() => {
    const eraKeys = Object.keys(stats.eraCounts);
    const eraLabels = eraKeys.map(k => t(`filters.eras.${k}`));
    const eraValues = eraKeys.map(k => stats.eraCounts[k]);
    // 각 시대에 맞는 CSS 색상을 가져옴
    const eraColors = eraKeys.map(k => getCSSVar(ERA_CSS_MAP[k] || '--text-tertiary'));

    // 내림차순 정렬
    const sorted = sortDescending(eraLabels, eraValues, eraColors);

    return {
      labels: sorted.labels,
      datasets: [{
        label: t('stats.count'),
        data: sorted.values,
        backgroundColor: sorted.colors.map(c => c + 'CC'),    // 80% 불투명
        borderColor: sorted.colors,
        borderWidth: 2,
        borderRadius: 6,        // 둥근 모서리
        borderSkipped: false,   // 아래쪽도 둥글게
      }],
    };
  }, [stats.eraCounts, t]);

  /* ── 카테고리 도넛 차트 데이터 ── */
  const categoryChartData = useMemo(() => {
    const catKeys = Object.keys(stats.categoryCounts);
    const catLabels = catKeys.map(k => t(`filters.categories.${k}`));
    const catValues = catKeys.map(k => stats.categoryCounts[k]);

    const sorted = sortDescending(catLabels, catValues, CATEGORY_COLORS);

    return {
      labels: sorted.labels,
      datasets: [{
        data: sorted.values,
        backgroundColor: sorted.colors.map(c => c + 'DD'),
        hoverBackgroundColor: sorted.colors,
        borderWidth: 0,
        hoverOffset: 8,     // 호버 시 슬라이스 확대
      }],
    };
  }, [stats.categoryCounts, t]);

  /* ── 지역별 수평 바 차트 데이터 ── */
  const regionChartData = useMemo(() => {
    const regKeys = Object.keys(stats.regionCounts);
    const regLabels = regKeys.map(k => t(`filters.regions.${k}`));
    const regValues = regKeys.map(k => stats.regionCounts[k]);

    const sorted = sortDescending(regLabels, regValues, REGION_COLORS);

    return {
      labels: sorted.labels,
      datasets: [{
        label: t('stats.count'),
        data: sorted.values,
        backgroundColor: sorted.colors.map(c => c + 'CC'),
        borderColor: sorted.colors,
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      }],
    };
  }, [stats.regionCounts, t]);

  /* ── 시대별 바 차트 옵션 (수직) ── */
  const eraBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },   // 단일 데이터셋이므로 레전드 불필요
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.85)',
        titleFont: { size: 13, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 4,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: themeColors.textSecondary,
          font: { size: 11 },
        },
        grid: { color: themeColors.border },
      },
      x: {
        ticks: {
          color: themeColors.textSecondary,
          font: { size: 11 },
          maxRotation: 0,  // 라벨 수평 유지
        },
        grid: { display: false },
      },
    },
  };

  /* ── 도넛 차트 옵션 ── */
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '62%',   // 도넛 구멍 크기
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: themeColors.textSecondary,
          font: { size: 10 },
          padding: 5,
          usePointStyle: true,    // ● 원형 마커
          pointStyleWidth: 8,
          boxWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.85)',
        titleFont: { size: 13, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          // 퍼센트와 건수를 동시 표시
          label: (ctx) => {
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            const pct = ((ctx.parsed / total) * 100).toFixed(1);
            return ` ${ctx.label}: ${ctx.parsed}건 (${pct}%)`;
          },
        },
      },
    },
  };

  /* ── 지역별 수평 바 차트 옵션 ── */
  const regionBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',   // 수평 바
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.85)',
        titleFont: { size: 13, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 4,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: themeColors.textSecondary,
          font: { size: 11 },
        },
        grid: { color: themeColors.border },
      },
      y: {
        ticks: {
          color: themeColors.textSecondary,
          font: { size: 11 },
        },
        grid: { display: false },
      },
    },
  };

  /* ── 도넛 중앙 텍스트 플러그인 ──
   * 도넛 차트의 빈 중앙에 전체 합계를 표시 */
  const centerTextPlugin = useMemo(() => ({
    id: 'centerText',
    afterDraw: (chart) => {
      const { ctx, width, height } = chart;
      const dataset = chart.data.datasets[0];
      if (!dataset) return;

      const total = dataset.data.reduce((a, b) => a + b, 0);

      ctx.save();
      // "합계" 라벨 (작은 글씨)
      ctx.font = `500 11px ${getComputedStyle(document.body).fontFamily}`;
      ctx.fillStyle = themeColors.textTertiary;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(t('stats.total'), width / 2, height / 2 - 2);

      // 숫자 (큰 글씨)
      ctx.font = `800 22px 'JetBrains Mono', monospace`;
      ctx.fillStyle = themeColors.accentPrimary;
      ctx.textBaseline = 'top';
      ctx.fillText(total.toLocaleString(), width / 2, height / 2 + 2);
      ctx.restore();
    },
  }), [themeColors, t]);

  /* ── 전체 합계 (요약 카드에서 사용) ── */
  const totalCount = stats.typeCounts.event + stats.typeCounts.person + stats.typeCounts.media;

  return (
    <div className="stats-dashboard-overlay" onClick={onClose}>
      {/* 모달 바깥 클릭 시 닫기, 안쪽은 stopPropagation */}
      <div className="stats-dashboard-container" onClick={e => e.stopPropagation()}>

        {/* ── 헤더 영역 ── */}
        <div className="stats-header">
          <div className="stats-title-area">
            <h2>📊 {t('stats.title')}</h2>
            <span className="last-updated">{t('stats.lastUpdated')}</span>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* ── 스크롤 가능한 본문 영역 ── */}
        <div className="stats-body">

          {/* ── 요약 카드 3장 (이벤트 / 인물 / 미디어) ── */}
          <div className="stats-summary-row">
            <SummaryCard
              icon="📅"
              label={t('common.events')}
              count={stats.typeCounts.event}
              total={totalCount}
              delay={0}
            />
            <SummaryCard
              icon="👤"
              label={t('common.people')}
              count={stats.typeCounts.person}
              total={totalCount}
              delay={100}
            />
            <SummaryCard
              icon="🎬"
              label={t('common.media')}
              count={stats.typeCounts.media}
              total={totalCount}
              delay={200}
            />
          </div>

          {/* ── 시대별 분포 (풀 와이드 바 차트) ── */}
          <div className="stat-card stat-card-wide" style={{ animationDelay: '150ms' }}>
            <h3>{t('stats.eraDistribution')}</h3>
            <div className="chart-wrapper chart-wrapper-bar">
              <Bar data={eraChartData} options={eraBarOptions} />
            </div>
          </div>

          {/* ── 하단 2열: 카테고리 + 지역 ── */}
          <div className="stats-two-col">
            {/* 카테고리 도넛 */}
            <div className="stat-card" style={{ animationDelay: '250ms' }}>
              <h3>{t('stats.categoryShare')}</h3>
              <div className="chart-wrapper chart-wrapper-doughnut">
                <Doughnut
                  data={categoryChartData}
                  options={doughnutOptions}
                  plugins={[centerTextPlugin]}
                />
              </div>
            </div>

            {/* 지역별 수평 바 */}
            <div className="stat-card" style={{ animationDelay: '350ms' }}>
              <h3>{t('stats.regionShare')}</h3>
              <div className="chart-wrapper chart-wrapper-hbar">
                <Bar data={regionChartData} options={regionBarOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
