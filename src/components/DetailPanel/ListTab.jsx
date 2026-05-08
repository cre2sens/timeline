import { useTranslation } from 'react-i18next'
import useStore from '../../store/useStore'
import { getEraColor, getCategoryIcon } from '../../data/categories'
import { formatYear } from '../../utils/dateUtils'

export default function ListTab({ items = [], totalItems = 0 }) {
  const { t } = useTranslation()
  const { 
    locale, setSelectedItem, setDetailTab,
    selectedClusterItems, clearSelectedClusterItems
  } = useStore()

  // 클러스터 아이템이 있으면 그것을, 없으면 필터링된 전체 아이템을 사용
  const displayItems = selectedClusterItems || items
  const isClusterMode = selectedClusterItems !== null

  if (displayItems.length === 0) {
    return (
      <div className="list-tab-empty">
        <p>{t('filter.noResults', '검색 결과가 없습니다.')}</p>
      </div>
    )
  }

  return (
    <div className="list-tab">
      {isClusterMode ? (
        <div className="list-tab-cluster-header">
          <div className="list-tab-count">
            📍 선택된 지역의 항목 ({displayItems.length}개)
          </div>
          <button 
            className="list-tab-back-btn"
            onClick={clearSelectedClusterItems}
          >
            ← 전체 목록으로 돌아가기
          </button>
        </div>
      ) : (
        <div className="list-tab-count">
          {t('filter.results', { count: displayItems.length })}
          {displayItems.length < totalItems && (
            <span className="list-tab-total"> / {totalItems}</span>
          )}
        </div>
      )}
      <div className="list-tab-grid">
        {displayItems.map((item) => {
          const title = item.title[locale] || item.title.ko
          const desc = item.description?.[locale] || item.description?.ko || ''
          const eraColor = getEraColor(item.era)
          const icon = getCategoryIcon(item.category)

          return (
            <div
              key={item.id}
              className="list-tab-card"
              onClick={() => { setSelectedItem(item); setDetailTab('wiki') }}
              style={{ borderLeftColor: eraColor }}
            >
              <div className="list-tab-card-header">
                <span className="list-tab-icon">{icon}</span>
                <span className="list-tab-title">{title}</span>
                <span className="list-tab-date">{formatYear(item.date?.start, locale)}</span>
              </div>
              {desc && <p className="list-tab-desc">{desc}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
