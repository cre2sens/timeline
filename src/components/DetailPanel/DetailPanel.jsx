import { useTranslation } from 'react-i18next'
import useStore from '../../store/useStore'
import WikiTab from './WikiTab'
import MediaTab from './MediaTab'
import { formatDateRange } from '../../utils/dateUtils'
import { getCategoryIcon } from '../../data/categories'
import './DetailPanel.css'

export default function DetailPanel({ mediaData }) {
  const { t } = useTranslation()
  const { selectedItem, detailTab, setDetailTab, locale } = useStore()

  if (!selectedItem) {
    return (
      <div className="detail-panel">
        <div className="detail-empty">
          <p className="detail-empty-text">{t('detail.noSelection')}</p>
        </div>
      </div>
    )
  }

  const title = selectedItem.title[locale] || selectedItem.title.ko
  const icon = getCategoryIcon(selectedItem.category)
  const period = formatDateRange(selectedItem.date.start, selectedItem.date.end, locale)
  const locationName = selectedItem.location?.name?.[locale] || selectedItem.birthPlace?.name?.[locale] || ''

  return (
    <div className="detail-panel">
      {/* 선택 아이템 헤더 */}
      <div className="detail-item-header fade-in">
        <div className="detail-item-icon">{selectedItem.icon || icon}</div>
        <div className="detail-item-info">
          <h3 className="detail-item-title">{title}</h3>
          <div className="detail-item-meta">
            <span className="detail-meta-badge">{period}</span>
            {locationName && <span className="detail-meta-badge">📍 {locationName}</span>}
          </div>
        </div>
      </div>

      {/* 탭 전환 */}
      <div className="detail-tabs">
        <button
          className={`detail-tab ${detailTab === 'wiki' ? 'active' : ''}`}
          onClick={() => setDetailTab('wiki')}
        >
          📖 {t('detail.wiki')}
        </button>
        <button
          className={`detail-tab ${detailTab === 'media' ? 'active' : ''}`}
          onClick={() => setDetailTab('media')}
        >
          🎬 {t('detail.media')} ({selectedItem.relatedMedia?.length || 0})
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="detail-content">
        {detailTab === 'wiki' ? (
          <WikiTab item={selectedItem} />
        ) : (
          <MediaTab item={selectedItem} mediaData={mediaData} />
        )}
      </div>
    </div>
  )
}
