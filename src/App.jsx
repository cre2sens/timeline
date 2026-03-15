import { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import useStore from './store/useStore'
import { filterItems } from './utils/filterUtils'
import Header from './components/Layout/Header'
import GlobeView from './components/Globe/GlobeView'
import TimelineView from './components/Timeline/TimelineView'
import FilterPanel from './components/Filter/FilterPanel'
import FilterListView from './components/Filter/FilterListView'
import DetailPanel from './components/DetailPanel/DetailPanel'
import StatsDashboard from './components/Dashboard/StatsDashboard'
import eventsData from './data/events.json'
import peopleData from './data/people.json'
import mediaData from './data/media.json'

export default function App() {
  const { i18n } = useTranslation()
  const { locale, theme, filters } = useStore()
  const [filterVisible, setFilterVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)

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
          <GlobeView items={filteredItems} />
          <TimelineView items={filteredItems} />
          <FilterListView items={filteredItems} totalItems={allItems.length} />
        </div>

        <DetailPanel mediaData={mediaData} />

        <FilterPanel
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          resultCount={filteredItems.length}
        />

        {statsVisible && (
          <StatsDashboard onClose={() => setStatsVisible(false)} />
        )}
      </div>
    </div>
  )
}
