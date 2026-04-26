import { useTranslation } from 'react-i18next'
import useStore from '../../store/useStore'
import { getEraColor, getCategoryIcon } from '../../data/categories'
import { formatYear } from '../../utils/dateUtils'

export default function ListTab({ items = [], totalItems = 0 }) {
  const { t } = useTranslation()
  const { locale, setSelectedItem } = useStore()

  if (items.length === 0) {
    return (
      <div className="list-tab-empty">
        <p>{t('filter.noResults', '검색 결과가 없습니다.')}</p>
      </div>
    )
  }

  return (
    <div className="list-tab">
      <div className="list-tab-count">
        {t('filter.results', { count: items.length })}
        {items.length < totalItems && (
          <span className="list-tab-total"> / {totalItems}</span>
        )}
      </div>
      <div className="list-tab-grid">
        {items.map((item) => {
          const title = item.title[locale] || item.title.ko
          const desc = item.description?.[locale] || item.description?.ko || ''
          const eraColor = getEraColor(item.era)
          const icon = getCategoryIcon(item.category)

          return (
            <div
              key={item.id}
              className="list-tab-card"
              onClick={() => setSelectedItem(item)}
              style={{ borderLeftColor: eraColor }}
            >
              <div className="list-tab-card-header">
                <span className="list-tab-icon">{icon}</span>
                <span className="list-tab-title">{title}</span>
                <span className="list-tab-date">{formatYear(item.date.start, locale)}</span>
              </div>
              {desc && <p className="list-tab-desc">{desc}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
