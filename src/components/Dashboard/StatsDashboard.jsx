import { useMemo } from 'react';
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
import { Bar, Pie, Doughnut, PolarArea } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import './StatsDashboard.css';

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

const StatsDashboard = ({ onClose, eventsData, peopleData, mediaData }) => {
  const { t } = useTranslation();

  const stats = useMemo(() => {

    // 1. Era distribution (for events & people)
    const eraCounts = {};
    [...eventsData, ...peopleData].forEach(item => {
      const era = item.era || 'unknown';
      eraCounts[era] = (eraCounts[era] || 0) + 1;
    });

    // 2. Category distribution
    const categoryCounts = {};
    [...eventsData, ...peopleData].forEach(item => {
      const cat = item.category || 'other';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    // 3. Region distribution (for events)
    const regionCounts = {};
    eventsData.forEach(event => {
      const region = event.location?.region || 'unknown';
      regionCounts[region] = (regionCounts[region] || 0) + 1;
    });

    // 4. Content Type counts
    const typeCounts = {
      event: eventsData.length,
      person: peopleData.length,
      media: mediaData.length
    };

    return { eraCounts, categoryCounts, regionCounts, typeCounts };
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'var(--text-primary)',
          font: { size: 11 }
        }
      }
    },
    scales: {
      y: {
        ticks: { color: 'var(--text-secondary)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      x: {
        ticks: { color: 'var(--text-secondary)' },
        grid: { display: false }
      }
    }
  };

  const eraData = {
    labels: Object.keys(stats.eraCounts).map(k => t(`filters.eras.${k}`)),
    datasets: [{
      label: t('stats.count'),
      data: Object.values(stats.eraCounts),
      backgroundColor: 'rgba(99, 102, 241, 0.7)',
      borderColor: 'rgba(99, 102, 241, 1)',
      borderWidth: 1,
    }]
  };

  const categoryData = {
    labels: Object.keys(stats.categoryCounts).map(k => t(`filters.categories.${k}`)),
    datasets: [{
      data: Object.values(stats.categoryCounts),
      backgroundColor: [
        'rgba(239, 68, 68, 0.7)',
        'rgba(59, 130, 246, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(139, 92, 246, 0.7)',
        'rgba(236, 72, 153, 0.7)',
        'rgba(14, 165, 233, 0.7)',
        'rgba(34, 197, 94, 0.7)',
        'rgba(251, 146, 60, 0.7)',
        'rgba(168, 162, 158, 0.7)',
      ],
      borderWidth: 0,
    }]
  };

  const regionData = {
    labels: Object.keys(stats.regionCounts).map(k => t(`filters.regions.${k}`)),
    datasets: [{
      data: Object.values(stats.regionCounts),
      backgroundColor: [
        'rgba(239, 68, 68, 0.6)',
        'rgba(59, 130, 246, 0.6)',
        'rgba(16, 185, 129, 0.6)',
        'rgba(245, 158, 11, 0.6)',
        'rgba(139, 92, 246, 0.6)',
        'rgba(236, 72, 153, 0.6)',
        'rgba(14, 165, 233, 0.6)',
        'rgba(34, 197, 94, 0.6)',
        'rgba(251, 146, 60, 0.6)',
        'rgba(168, 162, 158, 0.6)',
      ],
      borderWidth: 0,
    }]
  };

  const typeData = {
    labels: [t('common.events'), t('common.people'), t('common.media')],
    datasets: [{
      label: t('stats.total'),
      data: [stats.typeCounts.event, stats.typeCounts.person, stats.typeCounts.media],
      backgroundColor: [
        'rgba(99, 102, 241, 0.5)',
        'rgba(16, 185, 129, 0.5)',
        'rgba(245, 158, 11, 0.5)',
      ],
      borderColor: 'transparent',
    }]
  };

  return (
    <div className="stats-dashboard-overlay">
      <div className="stats-dashboard-container">
        <div className="stats-header">
          <div className="stats-title-area">
            <h2>📊 {t('stats.title')}</h2>
            <span className="last-updated">{t('stats.lastUpdated')}</span>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card bar">
            <h3>{t('stats.eraDistribution')}</h3>
            <div className="chart-wrapper">
              <Bar data={eraData} options={chartOptions} />
            </div>
          </div>

          <div className="stat-card">
            <h3>{t('stats.categoryShare')}</h3>
            <div className="chart-wrapper">
              <Doughnut data={categoryData} options={{...chartOptions, scales: {}}} />
            </div>
          </div>

          <div className="stat-card">
            <h3>{t('stats.regionShare')}</h3>
            <div className="chart-wrapper">
              <Pie data={regionData} options={{...chartOptions, scales: {}}} />
            </div>
          </div>

          <div className="stat-card">
            <h3>{t('stats.contentTypes')}</h3>
            <div className="chart-wrapper">
              <PolarArea data={typeData} options={{...chartOptions, scales: { r: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { display: false } } }}} />
            </div>
          </div>
        </div>

        <div className="stats-summary">
          <div className="summary-item">
            <span className="label">{t('common.events')}</span>
            <span className="value">{stats.typeCounts.event}</span>
          </div>
          <div className="summary-item">
            <span className="label">{t('common.people')}</span>
            <span className="value">{stats.typeCounts.person}</span>
          </div>
          <div className="summary-item">
            <span className="label">{t('common.media')}</span>
            <span className="value">{stats.typeCounts.media}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
