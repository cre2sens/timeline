import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import useStore from '../../store/useStore'
import { ERAS, REGIONS, CATEGORIES, MEDIA_TYPES } from '../../data/categories'
import './FilterPanel.css'

export default function FilterPanel({ visible, onClose, resultCount }) {
  const { t } = useTranslation()
  const { filters, setFilter, resetFilters, locale } = useStore()

  const toggleArrayFilter = (key, value) => {
    const current = filters[key]
    if (current.includes(value)) {
      setFilter(key, current.filter((v) => v !== value))
    } else {
      setFilter(key, [...current, value])
    }
  }

  if (!visible) return null

  return (
    <div className="filter-panel glass fade-in">
      <div className="filter-header">
        <h3 className="filter-title">{t('header.filter')}</h3>
        <div className="filter-header-actions">
          <span className="filter-count">{t('filter.results', { count: resultCount })}</span>
          <button className="filter-reset" onClick={resetFilters}>{t('filter.reset')}</button>
          <button className="filter-close" onClick={onClose}><X size={16} /></button>
        </div>
      </div>

      {/* 유형 토글 */}
      <div className="filter-section">
        <label className="filter-label">{t('filter.type')}</label>
        <div className="filter-toggles">
          {['all', 'event', 'person'].map((type) => (
            <button
              key={type}
              className={`filter-toggle ${filters.itemType === type ? 'active' : ''}`}
              onClick={() => setFilter('itemType', type)}
            >
              {t(`filter.${type}`)}
            </button>
          ))}
        </div>
      </div>

      {/* 시대 */}
      <div className="filter-section">
        <label className="filter-label">{t('filter.era')}</label>
        <div className="filter-chips">
          {Object.values(ERAS).map((era) => (
            <button
              key={era.id}
              className={`filter-chip ${filters.eras.includes(era.id) ? 'active' : ''}`}
              style={filters.eras.includes(era.id) ? { background: era.hex, borderColor: era.hex, color: '#fff' } : {}}
              onClick={() => toggleArrayFilter('eras', era.id)}
            >
              {era.label[locale]}
            </button>
          ))}
        </div>
      </div>

      {/* 지역 */}
      <div className="filter-section">
        <label className="filter-label">{t('filter.region')}</label>
        <div className="filter-chips">
          {Object.values(REGIONS).map((region) => (
            <button
              key={region.id}
              className={`filter-chip ${filters.regions.includes(region.id) ? 'active' : ''}`}
              onClick={() => toggleArrayFilter('regions', region.id)}
            >
              {region.label[locale]}
            </button>
          ))}
        </div>
      </div>

      {/* 카테고리 */}
      <div className="filter-section">
        <label className="filter-label">{t('filter.category')}</label>
        <div className="filter-chips">
          {Object.values(CATEGORIES).map((cat) => (
            <button
              key={cat.id}
              className={`filter-chip ${filters.categories.includes(cat.id) ? 'active' : ''}`}
              onClick={() => toggleArrayFilter('categories', cat.id)}
            >
              {cat.icon} {cat.label[locale]}
            </button>
          ))}
        </div>
      </div>

      {/* 미디어 유형 */}
      <div className="filter-section">
        <label className="filter-label">{t('filter.mediaType')}</label>
        <div className="filter-chips">
          {Object.values(MEDIA_TYPES).map((mt) => (
            <button
              key={mt.id}
              className={`filter-chip ${filters.mediaTypes.includes(mt.id) ? 'active' : ''}`}
              onClick={() => toggleArrayFilter('mediaTypes', mt.id)}
            >
              {mt.icon} {mt.label[locale]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
