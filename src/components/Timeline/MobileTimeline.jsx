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

function getTimeGroup(year, era) {
  if (year === null) return '미상'
  if (era === 'contemporary') {
    const d = Math.floor(year / 10) * 10
    return `${d}년대`
  }
  if (era === 'modern') {
    const q = Math.floor(year / 25) * 25
    return `${q}–${q + 24}`
  }
  if (year < 0) {
    const c = Math.ceil(Math.abs(year) / 100)
    return `기원전 ${c}세기`
  }
  const c = Math.floor(year / 100) + 1
  return `${c}세기`
}

export default function MobileTimeline({ items }) {
  const { locale } = useStore()
  const { t } = useTranslation()
  const { setSelectedItem } = useStore()

  // 시대 열림 상태 — 기본 모두 열림
  const [openEras, setOpenEras] = useState(
    () => new Set(ERA_ORDER)
  )
  const [openGroups, setOpenGroups] = useState(() => new Set())

  const grouped = useMemo(() => {
    const byEra = {}
    for (const item of items) {
      const era = item.era || 'ancient'
      if (!byEra[era]) byEra[era] = []
      byEra[era].push(item)
    }

    const result = {}
    for (const era of ERA_ORDER) {
      if (!byEra[era]) continue
      const byGroup = {}
      for (const item of byEra[era]) {
        const year = parseYear(item.date?.start || item.birth?.start)
        const group = getTimeGroup(year, era)
        if (!byGroup[group]) byGroup[group] = []
        byGroup[group].push(item)
      }
      // 시간 순 정렬
      for (const g of Object.keys(byGroup)) {
        byGroup[g].sort((a, b) => {
          const ya = parseYear(a.date?.start || a.birth?.start) ?? 0
          const yb = parseYear(b.date?.start || b.birth?.start) ?? 0
          return ya - yb
        })
      }
      result[era] = byGroup
    }
    return result
  }, [items])

  const toggleEra = (era) => {
    setOpenEras(prev => {
      const next = new Set(prev)
      if (next.has(era)) next.delete(era)
      else next.add(era)
      return next
    })
  }

  const toggleGroup = (key) => {
    setOpenGroups(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  if (items.length === 0) {
    return (
      <div className="mt-empty">
        <p>{t('filter.noResults')}</p>
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
        const groups = grouped[era]
        const totalCount = Object.values(groups).reduce((s, g) => s + g.length, 0)

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
                {Object.entries(groups).map(([groupLabel, groupItems]) => {
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
                                onClick={() => setSelectedItem(item)}
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
                                      item.date?.end   || item.death?.end,
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
