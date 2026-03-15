import { useTranslation } from 'react-i18next'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import useStore from '../../store/useStore'
import { getEraColor, getCategoryIcon } from '../../data/categories'
import { formatYear } from '../../utils/dateUtils'
import './FilterListView.css'

export default function FilterListView({ items, totalItems }) {
  const { t } = useTranslation()
  const { locale, setSelectedItem } = useStore()
  const [isExpanded, setIsExpanded] = useState(true)

  // Only show if there are applied filters (items < totalItems)
  if (items.length === totalItems) return null

  return (
    <div className={`filter-list-view ${isExpanded ? 'expanded' : 'collapsed'} glass`}>
      <div className="filter-list-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="list-title">
          <span>{t('filter.results', { count: items.length })}</span>
        </div>
        <button className="list-toggle-btn">
          {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="filter-list-content">
          {items.length === 0 ? (
            <div className="empty-results">{t('filter.noResults', '검색 결과가 없습니다.')}</div>
          ) : (
            <div className="list-grid">
              {items.map((item) => {
                const title = item.title[locale] || item.title.ko
                const desc = item.description[locale] || item.description.ko
                const eraColor = getEraColor(item.era)
                const icon = getCategoryIcon(item.category)
                const dateRange = formatYear(item.date.start, locale)

                return (
                  <div 
                    key={item.id} 
                    className="list-card"
                    onClick={() => setSelectedItem(item)}
                    style={{ borderLeftColor: eraColor }}
                  >
                    <div className="list-card-header">
                      <span className="list-icon" title={t(`filter.${item.category}`)}>{icon}</span>
                      <h4 className="list-title-text">{title}</h4>
                      <span className="list-date">{dateRange}</span>
                    </div>
                    <p className="list-desc">{desc}</p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
