import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import useStore from './store/useStore'
import { filterItems } from './utils/filterUtils'
import Header from './components/Layout/Header'
import GlobeView from './components/Globe/GlobeView'
import VerticalTimeline from './components/Timeline/VerticalTimeline'
import FilterPanel from './components/Filter/FilterPanel'
import DetailPanel from './components/DetailPanel/DetailPanel'
import StatsDashboard from './components/Dashboard/StatsDashboard'
import eventsData from './data/events.json'
import peopleData from './data/people.json'
import mediaData from './data/media.json'

export default function App() {
  const { i18n } = useTranslation()
  const { locale, theme, filters, selectedItem } = useStore()
  const [filterVisible, setFilterVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)

  // 리사이즈 핸들: Timeline ↔ Globe 너비 조절
  const [timelineWidth, setTimelineWidth] = useState(60)
  const dragRef = useRef({ active: false, startX: 0, startW: 0 })

  const handleResizeMouseDown = useCallback((e) => {
    e.preventDefault()
    dragRef.current = { active: true, startX: e.clientX, startW: timelineWidth }

    const onMove = (e) => {
      if (!dragRef.current.active) return
      const delta = ((e.clientX - dragRef.current.startX) / window.innerWidth) * 100
      const next = Math.min(Math.max(dragRef.current.startW + delta, 20), 80)
      setTimelineWidth(next)
    }

    const onUp = () => {
      dragRef.current.active = false
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [timelineWidth])

  // 언어 변경 시 i18next 동기화
  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale, i18n])

  // 테마 적용
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // 전체 아이템 (이벤트 + 인물)
  const allItems = useMemo(() => [...eventsData, ...peopleData], [])

  // 필터링된 아이템
  const filteredItems = useMemo(
    () => filterItems(allItems, filters, locale, mediaData),
    [allItems, filters, locale]
  )

  return (
    <div className="app">
      <Header 
        onToggleFilter={() => setFilterVisible(!filterVisible)} 
        onToggleStats={() => setStatsVisible(!statsVisible)}
      />

      <div className="app-body">
        <div className="app-main">
          <div className="timeline-container" style={{ width: `${timelineWidth}%` }}>
            <VerticalTimeline items={filteredItems} />
          </div>
          <div className="resize-handle" onMouseDown={handleResizeMouseDown} />
          <div className="globe-container">
            <GlobeView items={filteredItems} />
          </div>
        </div>

        {selectedItem && (
          <DetailPanel
            mediaData={mediaData}
            filteredItems={filteredItems}
            totalItems={allItems.length}
          />
        )}

        <FilterPanel
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          resultCount={filteredItems.length}
        />

        {statsVisible && (
          <StatsDashboard
            onClose={() => setStatsVisible(false)}
            eventsData={eventsData}
            peopleData={peopleData}
            mediaData={mediaData}
          />
        )}
      </div>
    </div>
  )
}
