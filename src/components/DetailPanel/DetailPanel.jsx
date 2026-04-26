import { useTranslation } from 'react-i18next'
import useStore from '../../store/useStore'
import WikiTab from './WikiTab'
import MediaTab from './MediaTab'
import ListTab from './ListTab'
import { formatDateRange } from '../../utils/dateUtils'
import { getCategoryIcon } from '../../data/categories'
import './DetailPanel.css'

export default function DetailPanel({ mediaData, filteredItems, totalItems }) {
  const { t } = useTranslation()
  const { selectedItem, setSelectedItem, detailTab, setDetailTab, locale } = useStore()

  const tabs = [
    { id: 'list', label: `📋 ${t('detail.list')}` },
    { id: 'wiki', label: `📖 ${t('detail.wiki')}` },
    { id: 'media', label: `🎬 ${t('detail.media')}${selectedItem ? ` (${selectedItem.relatedMedia?.length || 0})` : ''}` },
  ]

  return (
    <div className="detail-panel">
      {/* 선택 아이템 헤더 (아이템이 선택된 경우에만) */}
      {selectedItem && (
        <div className="detail-item-header fade-in">
          <div className="detail-item-icon">
            {selectedItem.icon || getCategoryIcon(selectedItem.category)}
          </div>
          <div className="detail-item-info">
            <h3 className="detail-item-title">
              {selectedItem.title[locale] || selectedItem.title.ko}
            </h3>
            <button 
              className="detail-close-btn" 
              onClick={() => setSelectedItem(null)}
              title="Close Panel"
            >
              ✕
            </button>
            <div className="detail-item-meta">
              <span className="detail-meta-badge">
                {formatDateRange(selectedItem.date.start, selectedItem.date.end, locale)}
              </span>
              {(selectedItem.location?.name?.[locale] || selectedItem.birthPlace?.name?.[locale]) && (
                <span className="detail-meta-badge">
                  📍 {selectedItem.location?.name?.[locale] || selectedItem.birthPlace?.name?.[locale]}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 탭 전환 */}
      <div className="detail-tabs">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            className={`detail-tab ${detailTab === id ? 'active' : ''}`}
            onClick={() => setDetailTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div className="detail-content">
        {detailTab === 'list' && (
          <ListTab items={filteredItems} totalItems={totalItems} />
        )}
        {detailTab === 'wiki' && (
          selectedItem
            ? <WikiTab item={selectedItem} />
            : <p className="detail-empty-text">{t('detail.noSelection')}</p>
        )}
        {detailTab === 'media' && (
          selectedItem
            ? <MediaTab item={selectedItem} mediaData={mediaData} />
            : <p className="detail-empty-text">{t('detail.noSelection')}</p>
        )}
      </div>
    </div>
  )
}
