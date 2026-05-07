import { useState, useMemo } from 'react'
import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import useStore from '../../store/useStore'
import { formatDateRange } from '../../utils/dateUtils'
import './MobileTimeline.css'

const ERA_ORDER = ['ancient', 'medieval', 'earlyModern', 'modern', 'contemporary']

const ERA_LABELS = {
  ancient:      { ko: '고대',   en: 'Ancient' },
  medieval:     { ko: '중세',   en: 'Medieval' },
  earlyModern:  { ko: '근세',   en: 'Early Modern' },
  modern:       { ko: '근대',   en: 'Modern' },
  contemporary: { ko: '현대',   en: 'Contemporary' },
}

const ERA_CSS_COLORS = {
  ancient:      'var(--era-ancient)',
  medieval:     'var(--era-medieval)',
  earlyModern:  'var(--era-early-modern)',
  modern:       'var(--era-modern)',
  contemporary: 'var(--era-contemporary)',
}

function parseYear(dateStr) {
  if (!dateStr) return null
  if (dateStr.startsWith('-')) {
    return -parseInt(dateStr.slice(1).split('-')[0])
  }
  return parseInt(dateStr.split('-')[0])
}

/**
 * 그룹 레이블과 시간 순 정렬키를 함께 반환
 * sortKey: 작을수록 오래된 시기 (BC는 음수)
 */
function getTimeGroup(year, era) {
  if (year === null) return { label: '미상', sortKey: Infinity }

  if (era === 'contemporary') {
    const d = Math.floor(year / 10) * 10
    return { label: `${d}년대`, sortKey: d }
  }
  if (era === 'modern') {
    const q = Math.floor(year / 25) * 25
    return { label: `${q}–${q + 24}`, sortKey: q }
  }
  if (year < 0) {
    const c = Math.ceil(Math.abs(year) / 100)
    // BC: 24세기(-2400) < 7세기(-700) < 1세기(-100) → 오름차순 정렬이면 -2400이 먼저
    return { label: `기원전 ${c}세기`, sortKey: -(c * 100) }
  }
  const c = Math.floor(year / 100) + 1
  return { label: `${c}세기`, sortKey: Math.floor(year / 100) * 100 }
}

export default function MobileTimeline({ items }) {
  const { locale, setSelectedItem, setDetailTab } = useStore()
  const { t } = useTranslation()

  const [openEras, setOpenEras] = useState(() => new Set())
  const [openGroups, setOpenGroups] = useState(() => new Set())

  const grouped = useMemo(() => {
    // 시대별 분류
    const byEra = {}
    for (const item of items) {
      const era = item.era || 'ancient'
      if (!byEra[era]) byEra[era] = []
      byEra[era].push(item)
    }

    const result = {}
    for (const era of ERA_ORDER) {
      if (!byEra[era]) continue

      // label → { sortKey, items[] }
      const byGroup = {}
      for (const item of byEra[era]) {
        const year = parseYear(item.date?.start || item.birth?.start)
        const { label, sortKey } = getTimeGroup(year, era)
        if (!byGroup[label]) byGroup[label] = { sortKey, items: [] }
        byGroup[label].items.push(item)
      }

      // 각 그룹 내 사건 시간 순 정렬
      for (const g of Object.values(byGroup)) {
        g.items.sort((a, b) => {
          const ya = parseYear(a.date?.start || a.birth?.start) ?? 0
          const yb = parseYear(b.date?.start || b.birth?.start) ?? 0
          return ya - yb
        })
      }

      // ★ 그룹 자체를 sortKey 기준으로 시간 순 정렬
      result[era] = Object.entries(byGroup)
        .sort(([, a], [, b]) => a.sortKey - b.sortKey)
        .map(([label, { items }]) => ({ label, items }))
    }
    return result
  }, [items])

  const toggleEra = (era) => {
    setOpenEras(prev => {
      const next = new Set(prev)
      next.has(era) ? next.delete(era) : next.add(era)
      return next
    })
  }

  const toggleGroup = (key) => {
    setOpenGroups(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  if (items.length === 0) {
    return (
      <div className="mt-empty">
        <p>{t('filter.noResults', '검색 결과가 없습니다.')}</p>
      </div>
    )
  }

  return (
    <div className="mobile-timeline">
      {ERA_ORDER.map(era => {
        if (!grouped[era]) return null
        const isEraOpen = openEras.has(era)
        const color = ERA_CSS_COLORS[era]
        const label = ERA_LABELS[era][locale] ?? ERA_LABELS[era].ko
        const groups = grouped[era]           // 이미 시간 순 정렬된 배열
        const totalCount = groups.reduce((s, g) => s + g.items.length, 0)

        return (
          <div key={era} className="mt-era">
            <button
              className="mt-era-header"
              style={{ borderLeftColor: color }}
              onClick={() => toggleEra(era)}
            >
              <span className="mt-era-dot" style={{ background: color }} />
              <span className="mt-era-label">{label}</span>
              <span className="mt-era-count">{totalCount}</span>
              <ChevronRight
                size={15}
                className={`mt-chevron ${isEraOpen ? 'open' : ''}`}
              />
            </button>

            {isEraOpen && (
              <div className="mt-era-body">
                {groups.map(({ label: groupLabel, items: groupItems }) => {
                  const groupKey = `${era}-${groupLabel}`
                  const isGroupOpen = openGroups.has(groupKey)

                  return (
                    <div key={groupLabel} className="mt-group">
                      <button
                        className="mt-group-header"
                        onClick={() => toggleGroup(groupKey)}
                      >
                        <span className="mt-group-label">{groupLabel}</span>
                        <span className="mt-group-count">{groupItems.length}</span>
                        <ChevronRight
                          size={13}
                          className={`mt-chevron ${isGroupOpen ? 'open' : ''}`}
                        />
                      </button>

                      {isGroupOpen && (
                        <ul className="mt-events">
                          {groupItems.map(item => (
                            <li key={item.id}>
                              <button
                                className="mt-event"
                                onClick={() => { setSelectedItem(item); setDetailTab('wiki') }}
                              >
                                <span className="mt-event-icon">
                                  {item.icon || '📋'}
                                </span>
                                <span className="mt-event-body">
                                  <span className="mt-event-title">
                                    {item.title?.[locale] || item.title?.ko}
                                  </span>
                                  <span className="mt-event-date">
                                    {formatDateRange(
                                      item.date?.start || item.birth?.start,
                                      item.date?.end   || item.death?.start,
                                      locale
                                    )}
                                  </span>
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
