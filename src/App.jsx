import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import useStore from './store/useStore'
import { filterItems } from './utils/filterUtils'
import Header from './components/Layout/Header'
import ModeDock from './components/Layout/ModeDock'
import GlobeView from './components/Globe/GlobeView'
import VerticalTimeline from './components/Timeline/VerticalTimeline'
import MobileTimeline from './components/Timeline/MobileTimeline'
import FilterPanel from './components/Filter/FilterPanel'
import DetailPanel from './components/DetailPanel/DetailPanel'
import StatsDashboard from './components/Dashboard/StatsDashboard'
import eventsData from './data/events.json'
import peopleData from './data/people.json'
import mediaData from './data/media.json'

// 뷰 모드별 기본 분할 비율 (왼쪽 패널 %)
const DEFAULT_LEFT_RATIO = {
  'split-cg': 58,
  'split-cd': 55,
  'split-gd': 50,
}

export default function App() {
  const { i18n } = useTranslation()
  const {
    locale, theme, filters,
    selectedItem, clearSelected,
    viewMode, setViewMode,
  } = useStore()

  // --- UI 상태 ---
  const [filterVisible, setFilterVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const [fading, setFading] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  // 분할 모드 드래그 리사이즈 비율 (null = 기본값 사용)
  const [splitRatio, setSplitRatio] = useState(null)
  const dragRef = useRef({ active: false, startX: 0, startRatio: 0 })

  // --- 모바일 감지 ---
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // --- 언어/테마 동기화 ---
  useEffect(() => { i18n.changeLanguage(locale) }, [locale, i18n])
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // --- 실제 적용되는 모드 (모바일에서 분할 모드 → 단일 모드) ---
  const effectiveMode = useMemo(() => {
    if (!isMobile) return viewMode
    if (viewMode.startsWith('split-')) return 'chronicle'
    return viewMode
  }, [viewMode, isMobile])

  const isSplit = effectiveMode.startsWith('split-')

  // 패널 표시 여부
  const showChronicle = ['chronicle', 'split-cg', 'split-cd'].includes(effectiveMode)
  const showGlobe     = ['globe',     'split-cg', 'split-gd'].includes(effectiveMode)
  const showDetail    = ['detail',    'split-cd', 'split-gd'].includes(effectiveMode)

  // 현재 분할 비율 (LEFT 패널 기준)
  const leftRatio = splitRatio ?? DEFAULT_LEFT_RATIO[effectiveMode] ?? 100

  // --- 모드 전환 (크로스페이드) ---
  const handleSetMode = useCallback((newMode) => {
    if (newMode === viewMode) return
    setFading(true)
    setSplitRatio(null) // 새 모드의 기본 비율로 초기화
    setTimeout(() => {
      setViewMode(newMode)
      setFading(false)
      // Cesium 리사이즈 트리거
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'))
      })
    }, 150)
  }, [viewMode, setViewMode])

  // 아이템 선택 시 상세 패널이 있는 모드로 자동 전환 (데스크탑)
  const prevSelectedRef = useRef(null)
  useEffect(() => {
    if (!isMobile && selectedItem && selectedItem !== prevSelectedRef.current) {
      if (effectiveMode === 'split-cg' || effectiveMode === 'chronicle') {
        handleSetMode('split-cd')
      } else if (effectiveMode === 'globe') {
        handleSetMode('split-gd')
      }
    }
    prevSelectedRef.current = selectedItem
  }, [selectedItem]) // eslint-disable-line react-hooks/exhaustive-deps

  // --- 키보드 단축키 ---
  useEffect(() => {
    const handler = (e) => {
      const tag = e.target.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      switch (e.key) {
        case 't': case 'T': handleSetMode('chronicle'); break
        case 'g': case 'G': handleSetMode('globe');     break
        case 'd': case 'D': handleSetMode('detail');    break
        case '1': handleSetMode('split-cg'); break
        case '2': handleSetMode('split-cd'); break
        case '3': handleSetMode('split-gd'); break
        default: break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleSetMode])

  // --- 리사이즈 핸들 드래그 ---
  const handleResizeMouseDown = useCallback((e) => {
    e.preventDefault()
    const startRatio = splitRatio ?? DEFAULT_LEFT_RATIO[effectiveMode] ?? 50
    dragRef.current = { active: true, startX: e.clientX, startRatio }

    const onMove = (mv) => {
      if (!dragRef.current.active) return
      const delta = ((mv.clientX - dragRef.current.startX) / window.innerWidth) * 100
      const next = Math.min(Math.max(dragRef.current.startRatio + delta, 20), 80)
      setSplitRatio(next)
    }
    const onUp = () => {
      dragRef.current.active = false
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [splitRatio, effectiveMode])

  // --- 데이터 ---
  const allItems = useMemo(() => [...eventsData, ...peopleData], [])
  const filteredItems = useMemo(
    () => filterItems(allItems, filters, locale, mediaData),
    [allItems, filters, locale]
  )

  // --- 렌더 ---
  return (
    <div className="app">
      <Header
        onToggleFilter={() => setFilterVisible(v => !v)}
        onToggleStats={() => setStatsVisible(v => !v)}
        isMobile={isMobile}
      />

      <div className={`app-workspace${fading ? ' ws-fading' : ''}`}>

        {/* ── 연대기 패널 (항상 LEFT 위치) ── */}
        <div
          className={`ws-panel${!showChronicle ? ' ws-hidden' : ''}`}
          style={showChronicle
            ? { flex: isSplit ? `0 0 ${leftRatio}%` : 1 }
            : undefined}
        >
          {isMobile
            ? <MobileTimeline items={filteredItems} />
            : <VerticalTimeline items={filteredItems} />
          }
        </div>

        {/* 연대기↔오른쪽 리사이즈 핸들 (split-cg, split-cd) */}
        {isSplit && !isMobile && showChronicle && (showGlobe || showDetail) && (
          <div className="ws-resize-handle" onMouseDown={handleResizeMouseDown} />
        )}

        {/* ── 지구본 패널 (Cesium 유지를 위해 항상 DOM에 존재) ── */}
        {/* split-gd에서는 LEFT, split-cg에서는 RIGHT(flex:1), 단독은 flex:1 */}
        <div
          className={`ws-panel${!showGlobe ? ' ws-hidden' : ''}`}
          style={showGlobe
            ? { flex: effectiveMode === 'split-gd' ? `0 0 ${leftRatio}%` : 1 }
            : undefined}
        >
          <GlobeView items={filteredItems} />
        </div>

        {/* 지구본↔상세 리사이즈 핸들 (split-gd 전용) */}
        {effectiveMode === 'split-gd' && !isMobile && (
          <div className="ws-resize-handle" onMouseDown={handleResizeMouseDown} />
        )}

        {/* ── 상세 패널 (데스크탑, 항상 RIGHT 위치 → flex:1) ── */}
        {!isMobile && showDetail && (
          <div className="ws-panel" style={{ flex: 1 }}>
            <DetailPanel
              mediaData={mediaData}
              filteredItems={filteredItems}
              totalItems={allItems.length}
            />
          </div>
        )}

        {/* ── 상세 패널 (모바일 상세 탭) ── */}
        {isMobile && effectiveMode === 'detail' && (
          <div className="ws-panel" style={{ flex: 1 }}>
            <DetailPanel
              mediaData={mediaData}
              filteredItems={filteredItems}
              totalItems={allItems.length}
            />
          </div>
        )}

        {/* ── 모바일 바텀 시트 (아이템 선택 시) ── */}
        {isMobile && selectedItem && effectiveMode !== 'detail' && (
          <div
            className="mobile-sheet-overlay"
            onClick={() => clearSelected()}
          >
            <div
              className="mobile-sheet"
              onClick={e => e.stopPropagation()}
            >
              <div className="mobile-sheet-handle" />
              <DetailPanel
                mediaData={mediaData}
                filteredItems={filteredItems}
                totalItems={allItems.length}
              />
            </div>
          </div>
        )}

        {/* ── 필터 / 통계 모달 ── */}
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

      {/* ── 하단 모드 독 / 모바일 탭 바 ── */}
      <ModeDock
        viewMode={effectiveMode}
        onSetMode={handleSetMode}
        isMobile={isMobile}
      />
    </div>
  )
}
