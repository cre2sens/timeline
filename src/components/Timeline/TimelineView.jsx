import { useEffect, useRef, useState, useCallback } from 'react'
import { Maximize2, Minimize2, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react'
import useStore from '../../store/useStore'
import { ERAS, getEraColor, getCategoryIcon } from '../../data/categories'
import { parseHistoricalDate, formatYear } from '../../utils/dateUtils'
import './TimelineView.css'

// 타임라인 아이템을 vis-timeline 포맷으로 변환
function buildTimelineItems(rawItems, locale) {
  const seenIds = new Set()
  
  return rawItems
    .filter(item => {
      if (!item.id || seenIds.has(item.id)) return false
      if (!item.date?.start) return false
      
      if (item.date.start.startsWith('-')) {
        // BC 날짜: '-3500-01-01' 형식 → 두 번째 요소가 연도
        const bcYear = parseInt(item.date.start.split('-')[1], 10)
        if (bcYear > 3500) return false // BC 3500년보다 오래된 데이터는 성능을 위해 제외
      }
      
      seenIds.add(item.id)
      return true
    })
    .map(item => {
      const start = parseHistoricalDate(item.date.start)
      const end = item.date.end && item.date.end !== item.date.start
        ? parseHistoricalDate(item.date.end)
        : undefined
      const region = item.location?.region || item.birthPlace?.region || 'etc'
      const icon = getCategoryIcon(item.category)
      const title = item.title[locale] || item.title.ko
      const eraColor = getEraColor(item.era)

      return {
        id: item.id,
        group: region,
        content: `<div class="tl-item" style="border-left: 3px solid ${eraColor}"><span class="tl-icon">${icon}</span><span class="tl-text">${title}</span></div>`,
        start,
        end,
        type: end ? 'range' : 'box',
        title: `${icon} ${title} (${formatYear(item.date.start, locale)})`,
        className: `tl-era-${item.era}`,
      }
    })
}

const regionLabels = {
  korea: { ko: '🇰🇷 한국', en: '🇰🇷 Korea' },
  eastAsia: { ko: '🌏 동아시아', en: '🌏 East Asia' },
  europe: { ko: '🌍 유럽', en: '🌍 Europe' },
  middleEast: { ko: '🕌 중동', en: '🕌 Middle East' },
  americas: { ko: '🌎 아메리카', en: '🌎 Americas' },
  africa: { ko: '🌍 아프리카', en: '🌍 Africa' },
  southAsia: { ko: '🐘 남아시아', en: '🐘 South Asia' },
  etc: { ko: '📌 기타', en: '📌 Others' },
}
const groupOrder = ['korea', 'eastAsia', 'europe', 'middleEast', 'americas', 'africa', 'southAsia', 'etc']

function buildGroups(rawItems, locale) {
  const regionMap = {}
  rawItems.forEach(item => {
    const region = item.location?.region || item.birthPlace?.region || 'etc'
    regionMap[region] = true
  })
  return groupOrder
    .filter(r => regionMap[r])
    .map((r, i) => ({
      id: r,
      content: regionLabels[r]?.[locale] || r,
      order: i,
    }))
}

// 그룹 행 하나의 평균 높이 (px) — 스크롤 단위로 사용
const GROUP_ROW_HEIGHT = 40

// 로케일별 클러스터 제목 템플릿
const clusterTitleTemplate = (locale) =>
  locale === 'ko' ? '{count}개 항목' : '{count} items'

export default function TimelineView({ items, height }) {
  const containerRef = useRef(null)     // 타임라인 DOM 컨테이너
  const wrapperRef = useRef(null)       // timeline-wrapper (스크롤바 기준)
  const timelineRef = useRef(null)
  const dataSetRef = useRef(null)
  const groupSetRef = useRef(null)
  const resizeObserverRef = useRef(null)
  const readyRef = useRef(false)        // 타임라인 초기화 완료 여부

  // locale, items를 ref로 관리하여 effect 재실행 없이 최신값 참조
  const localeRef = useRef(null)
  const itemsRef = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const { selectedItem, setSelectedItem, locale } = useStore()

  // 시대 순서 배열 (수평 내비게이션용)
  const ERA_ORDER = ['ancient', 'medieval', 'earlyModern', 'modern', 'contemporary']

  // === 커스텀 세로 스크롤바 관련 ref ===
  const thumbRef = useRef(null)
  const trackInnerRef = useRef(null)   // 화살표 버튼 사이 트랙 영역
  const isDraggingRef = useRef(false)
  const dragStartYRef = useRef(0)
  const dragStartScrollRef = useRef(0)
  const holdTimerRef = useRef(null)    // 버튼 꾹 클릭용 타이머
  const hotZoneRafRef = useRef(null)   // 핫존 RAF ID
  const hotZoneDirRef = useRef(0)      // 핫존 스크롤 방향 (-1 위, 1 아래)

  // locale, items를 항상 최신 ref로 유지
  localeRef.current = locale
  itemsRef.current = items

  // ─────────────────────────────────────────
  // 스크롤바 썸 위치 동기화
  // ─────────────────────────────────────────
  const syncScrollbar = useCallback(() => {
    if (!timelineRef.current || !thumbRef.current || !trackInnerRef.current) return
    try {
      const scrollTop = timelineRef.current.getScrollTop()
      const trackH = trackInnerRef.current.clientHeight
      const thumbH = thumbRef.current.offsetHeight

      // vis-timeline 내부 최대 스크롤 높이 추정
      // (그룹 수 × 행 높이) - 보이는 영역
      const contentH = (groupOrder.length + 1) * GROUP_ROW_HEIGHT
      const visibleH = containerRef.current
        ? containerRef.current.clientHeight
        : 200
      const maxScroll = Math.max(contentH - visibleH, 1)

      const ratio = Math.min(scrollTop / maxScroll, 1)
      const thumbTop = ratio * (trackH - thumbH)
      thumbRef.current.style.top = `${thumbTop}px`
    } catch {
      // 무시
    }
  }, [])

  // ─────────────────────────────────────────
  // 세로 스크롤 이동 헬퍼
  // ─────────────────────────────────────────
  const scrollBy = useCallback((deltaY) => {
    if (!timelineRef.current) return
    try {
      const current = timelineRef.current.getScrollTop()
      timelineRef.current.setScrollTop(Math.max(0, current + deltaY))
      syncScrollbar()
    } catch {
      // 무시
    }
  }, [syncScrollbar])

  // ─────────────────────────────────────────
  // 타임라인 초기화 (마운트 시 한 번만 실행)
  // ─────────────────────────────────────────
  useEffect(() => {
    let cancelled = false

    const init = async () => {
      try {
        const { Timeline, DataSet } = await import('vis-timeline/standalone')
        if (cancelled || !containerRef.current) return

        const currentLocale = localeRef.current
        const currentItems = itemsRef.current || []

        // 초기 데이터로 DataSet 생성
        const dataset = new DataSet(buildTimelineItems(currentItems, currentLocale))
        const groupset = new DataSet(buildGroups(currentItems, currentLocale))
        dataSetRef.current = dataset
        groupSetRef.current = groupset

        // 타임라인 인스턴스 생성
        const timeline = new Timeline(
          containerRef.current,
          dataset,
          groupset,
          {
            zoomMin: 1000 * 60 * 60 * 24 * 365,
            zoomMax: 1000 * 60 * 60 * 24 * 365 * 6000,
            orientation: { axis: 'top' },
            stack: true,
            groupOrder: 'order',
            tooltip: { followMouse: true, overflowMethod: 'flip' },
            margin: { item: { horizontal: 10, vertical: 12 }, axis: 2 },
            cluster: {
              maxItems: 5,
              titleTemplate: clusterTitleTemplate(localeRef.current),
              showStipes: true,
              fitOnDoubleClick: true,
            },
            verticalScroll: true,
            height: '100%',
            min: parseHistoricalDate('-3200-01-01'),
            max: parseHistoricalDate('2030-01-01'),
          }
        )

        timelineRef.current = timeline

        // 선택 이벤트
        timeline.on('select', (props) => {
          if (props.items.length > 0) {
            const selectedId = props.items[0]
            const found = (itemsRef.current || []).find(i => i.id === selectedId)
            if (found) setSelectedItem(found)
          }
        })

        // 스크롤/렌더 변경 시 스크롤바 동기화
        timeline.on('changed', syncScrollbar)

        // 초기 뷰: 중세~현대
        timeline.setWindow(new Date(1300, 0, 1), new Date(2020, 0, 1))

        // ResizeObserver: 컨테이너 크기 변화 시 redraw
        resizeObserverRef.current = new ResizeObserver(() => {
          if (timelineRef.current) {
            timelineRef.current.redraw()
          }
        })
        resizeObserverRef.current.observe(containerRef.current)

        // 레이아웃 확정 후 강제 redraw
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (timelineRef.current) {
              timelineRef.current.redraw()
            }
            readyRef.current = true
            syncScrollbar()
            setIsReady(true)
          })
        })
      } catch (err) {
        console.error('vis-timeline 초기화 오류:', err)
      }
    }

    init()

    return () => {
      cancelled = true
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
        resizeObserverRef.current = null
      }
      if (timelineRef.current) {
        timelineRef.current.destroy()
        timelineRef.current = null
      }
      dataSetRef.current = null
      groupSetRef.current = null
      readyRef.current = false
    }
  // 마운트 시 한 번만 실행
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // items 또는 locale 변경 시 DataSet incremental 업데이트
  useEffect(() => {
    if (!readyRef.current || !dataSetRef.current || !groupSetRef.current || !timelineRef.current) return

    const newItems = buildTimelineItems(items || [], locale)
    const newGroups = buildGroups(items || [], locale)

    timelineRef.current.setOptions({
      cluster: { titleTemplate: clusterTitleTemplate(locale) },
    })
    groupSetRef.current.clear()
    groupSetRef.current.add(newGroups)
    dataSetRef.current.clear()
    dataSetRef.current.add(newItems)
  }, [items, locale])

  // 외부에서 선택 시 타임라인 포커스
  useEffect(() => {
    if (selectedItem && timelineRef.current) {
      try {
        timelineRef.current.setSelection([selectedItem.id])
        timelineRef.current.focus(selectedItem.id, { animation: { duration: 500 } })
      } catch {
        // 아이템이 타임라인에 없는 경우 무시
      }
    }
  }, [selectedItem])

  // 전체 화면으로 확장될 때 타임라인 Redraw (높이 재계산)
  useEffect(() => {
    if (timelineRef.current) {
      setTimeout(() => {
        timelineRef.current.redraw()
        syncScrollbar()
      }, 300)
    }
  }, [isExpanded, syncScrollbar])

  // ─────────────────────────────────────────
  // 수평 시대 네비게이션 (기존)
  // ─────────────────────────────────────────
  const handleEraClick = (eraId) => {
    if (!timelineRef.current) return
    const era = ERAS[eraId]
    const startYearStr = String(era.range.start).padStart(4, '0') + '-01-01'
    const endYearStr = String(era.range.end).padStart(4, '0') + '-12-31'
    
    const start = parseHistoricalDate(era.range.start < 0 ? `${era.range.start}-01-01` : startYearStr)
    const end = parseHistoricalDate(era.range.end < 0 ? `${era.range.end}-12-31` : endYearStr)

    timelineRef.current.setWindow(start, end, {
      animation: { duration: 800, easingFunction: 'easeInOutQuad' }
    })
  }

  const handlePrevNextEra = (direction) => {
    if (!timelineRef.current) return
    
    const { start, end } = timelineRef.current.getWindow()
    const centerMs = (start.getTime() + end.getTime()) / 2
    const centerYear = new Date(centerMs).getFullYear()

    let currentIndex = 0
    for (let i = 0; i < ERA_ORDER.length; i++) {
      const era = ERAS[ERA_ORDER[i]]
      if (centerYear >= era.range.start && centerYear <= era.range.end) {
        currentIndex = i
        break
      }
    }

    let nextIndex = currentIndex + direction
    if (nextIndex < 0) nextIndex = 0
    if (nextIndex >= ERA_ORDER.length) nextIndex = ERA_ORDER.length - 1

    if (nextIndex !== currentIndex) {
      handleEraClick(ERA_ORDER[nextIndex])
    }
  }

  // ─────────────────────────────────────────
  // 세로 스크롤바 — 썸 드래그
  // ─────────────────────────────────────────
  const handleThumbMouseDown = useCallback((e) => {
    e.preventDefault()
    isDraggingRef.current = true
    dragStartYRef.current = e.clientY
    try {
      dragStartScrollRef.current = timelineRef.current?.getScrollTop() || 0
    } catch { dragStartScrollRef.current = 0 }

    thumbRef.current?.classList.add('dragging')

    const onMouseMove = (e) => {
      if (!isDraggingRef.current || !timelineRef.current || !trackInnerRef.current || !thumbRef.current) return
      const trackH = trackInnerRef.current.clientHeight
      const thumbH = thumbRef.current.offsetHeight
      const deltaY = e.clientY - dragStartYRef.current

      const contentH = (groupOrder.length + 1) * GROUP_ROW_HEIGHT
      const visibleH = containerRef.current?.clientHeight || 200
      const maxScroll = Math.max(contentH - visibleH, 1)

      const scrollDelta = (deltaY / (trackH - thumbH)) * maxScroll
      const newScroll = Math.max(0, dragStartScrollRef.current + scrollDelta)
      try {
        timelineRef.current.setScrollTop(newScroll)
        syncScrollbar()
      } catch { /* 무시 */ }
    }

    const onMouseUp = () => {
      isDraggingRef.current = false
      thumbRef.current?.classList.remove('dragging')
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [syncScrollbar])

  // ─────────────────────────────────────────
  // 세로 스크롤바 — 화살표 버튼 (꾹 클릭 연속 스크롤)
  // ─────────────────────────────────────────
  const startHold = useCallback((direction) => {
    scrollBy(direction * GROUP_ROW_HEIGHT)
    holdTimerRef.current = setInterval(() => {
      scrollBy(direction * GROUP_ROW_HEIGHT)
    }, 120)
  }, [scrollBy])

  const stopHold = useCallback(() => {
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current)
      holdTimerRef.current = null
    }
  }, [])

  // ─────────────────────────────────────────
  // 핫존 마우스오버 — RAF 루프 자동 스크롤
  // ─────────────────────────────────────────
  const startHotZone = useCallback((direction) => {
    hotZoneDirRef.current = direction

    const loop = () => {
      scrollBy(hotZoneDirRef.current * 6) // 한 tick당 6px
      hotZoneRafRef.current = requestAnimationFrame(loop)
    }
    hotZoneRafRef.current = requestAnimationFrame(loop)
  }, [scrollBy])

  const stopHotZone = useCallback(() => {
    if (hotZoneRafRef.current) {
      cancelAnimationFrame(hotZoneRafRef.current)
      hotZoneRafRef.current = null
    }
  }, [])

  // 클린업: 타이머/RAF 해제
  useEffect(() => {
    return () => {
      stopHold()
      stopHotZone()
    }
  }, [stopHold, stopHotZone])

  // ─────────────────────────────────────────
  // JSX
  // ─────────────────────────────────────────
  return (
    <div
      className={`timeline-container ${isExpanded ? 'expanded' : ''}`}
      style={!isExpanded && height ? { height: `${height}px` } : undefined}
    >
      {/* 타임라인 헤더 (수평 시대 토글/내비게이션) */}
      <div className="timeline-header">
        <div className="timeline-era-nav">
          <button className="nav-arrow" onClick={() => handlePrevNextEra(-1)} title="이전 시대">
            <ChevronLeft size={16} />
          </button>
          
          <div className="era-pills">
            {ERA_ORDER.map(eraId => {
              const era = ERAS[eraId]
              return (
                <button 
                  key={eraId} 
                  className="era-pill" 
                  onClick={() => handleEraClick(eraId)}
                >
                  <span className="era-dot" style={{ backgroundColor: era.hex }}></span>
                  {era.label[locale]}
                </button>
              )
            })}
          </div>

          <button className="nav-arrow" onClick={() => handlePrevNextEra(1)} title="다음 시대">
            <ChevronRight size={16} />
          </button>
        </div>
        
        <button 
          className="expand-btn" 
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? '축소하기' : '전체 화면으로 펼치기'}
        >
          {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>

      {/* 타임라인 래퍼 (스크롤바/핫존 공통 기준) */}
      <div className="timeline-wrapper" ref={wrapperRef}>
        {!isReady && (
          <div className="timeline-loading">
            <div className="timeline-spinner" />
          </div>
        )}
        {/* vis-timeline 컨테이너 */}
        <div ref={containerRef} className="timeline-vis-container" />

        {/* 커스텀 세로 스크롤바 */}
        <div className="tl-scrollbar-track">
          {/* 위 화살표 버튼 */}
          <button
            className="tl-scroll-arrow"
            title="위로 스크롤"
            onMouseDown={() => startHold(-1)}
            onMouseUp={stopHold}
            onMouseLeave={stopHold}
          >
            <ChevronUp size={8} />
          </button>

          {/* 트랙 + 썸 */}
          <div className="tl-scrollbar-inner" ref={trackInnerRef}>
            <div
              className="tl-scrollbar-thumb"
              ref={thumbRef}
              onMouseDown={handleThumbMouseDown}
            />
          </div>

          {/* 아래 화살표 버튼 */}
          <button
            className="tl-scroll-arrow"
            title="아래로 스크롤"
            onMouseDown={() => startHold(1)}
            onMouseUp={stopHold}
            onMouseLeave={stopHold}
          >
            <ChevronDown size={8} />
          </button>
        </div>

        {/* 핫존 — 상단 (마우스오버 시 위로 자동 스크롤) */}
        <div
          className="tl-hotzone tl-hotzone-top"
          onMouseEnter={() => startHotZone(-1)}
          onMouseLeave={stopHotZone}
        >
          <ChevronUp size={16} className="hotzone-icon" />
        </div>

        {/* 핫존 — 하단 (마우스오버 시 아래로 자동 스크롤) */}
        <div
          className="tl-hotzone tl-hotzone-bottom"
          onMouseEnter={() => startHotZone(1)}
          onMouseLeave={stopHotZone}
        >
          <ChevronDown size={16} className="hotzone-icon" />
        </div>
      </div>
    </div>
  )
}
