import { useEffect, useRef, useState } from 'react'
import { Maximize2, Minimize2, ChevronLeft, ChevronRight } from 'lucide-react'
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

export default function TimelineView({ items }) {
  const containerRef = useRef(null)
  const timelineRef = useRef(null)
  const dataSetRef = useRef(null)
  const groupSetRef = useRef(null)
  const resizeObserverRef = useRef(null)
  const readyRef = useRef(false) // 타임라인 초기화 완료 여부
  // locale, items를 ref로 관리하여 effect 재실행 없이 최신값 참조
  const localeRef = useRef(null)
  const itemsRef = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const { selectedItem, setSelectedItem, locale } = useStore()

  // 시대 순서 배열 (내비게이션용)
  const ERA_ORDER = ['ancient', 'medieval', 'earlyModern', 'modern', 'contemporary']

  // locale, items를 항상 최신 ref로 유지
  localeRef.current = locale
  itemsRef.current = items

  // 타임라인 초기화 (마운트 시 한 번만 실행)
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
            tooltip: { followMouse: true, overflowMethod: 'cap' },
            margin: { item: { horizontal: 4, vertical: 6 } },
            verticalScroll: true,
            height: '100%',
            min: new Date(-3200, 0, 1),
            max: new Date(2030, 0, 1),
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

        // 초기 뷰: 중세~현대 (데이터 주입 후 window 설정)
        timeline.setWindow(new Date(1300, 0, 1), new Date(2020, 0, 1))

        // ResizeObserver: 컨테이너 크기 변화 시 redraw
        resizeObserverRef.current = new ResizeObserver(() => {
          if (timelineRef.current) {
            timelineRef.current.redraw()
          }
        })
        resizeObserverRef.current.observe(containerRef.current)

        // 레이아웃 확정 후 강제 redraw (flex 레이아웃 높이 계산 완료 보장)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (timelineRef.current) {
              timelineRef.current.redraw()
            }
            readyRef.current = true // 초기화 완료 마킹
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
      readyRef.current = false // 클린업 시 플래그 리셋
    }
  // 마운트 시 한 번만 실행
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // items 또는 locale 변경 시 DataSet incremental 업데이트
  useEffect(() => {
    // 타임라인이 완전히 준비된(readyRef.current) 경우에만 업데이트 수행
    if (!readyRef.current || !dataSetRef.current || !groupSetRef.current || !timelineRef.current) return

    const newItems = buildTimelineItems(items || [], locale)
    const newGroups = buildGroups(items || [], locale)

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

  // 시대 버튼 클릭 (직접 이동)
  const handleEraClick = (eraId) => {
    if (!timelineRef.current) return
    const era = ERAS[eraId]
    const startYearStr = String(era.range.start).padStart(4, '0') + '-01-01'
    const endYearStr = String(era.range.end).padStart(4, '0') + '-12-31'
    
    // Convert to absolute string passing for BC dates or standard dates
    const start = parseHistoricalDate(era.range.start < 0 ? `${era.range.start}-01-01` : startYearStr)
    const end = parseHistoricalDate(era.range.end < 0 ? `${era.range.end}-12-31` : endYearStr)

    timelineRef.current.setWindow(start, end, {
      animation: { duration: 800, easingFunction: 'easeInOutQuad' }
    })
  }

  // 앞/뒤 화살표 클릭 (현재 포커스 기준)
  const handlePrevNextEra = (direction) => {
    if (!timelineRef.current) return
    
    // 현재 보고 있는 타임라인의 중심 연도 계산
    const { start, end } = timelineRef.current.getWindow()
    const centerMs = (start.getTime() + end.getTime()) / 2
    const centerYear = new Date(centerMs).getFullYear()

    // 중심 연도 기준으로 현재 속한 시대 인덱스 찾기
    let currentIndex = 0
    for (let i = 0; i < ERA_ORDER.length; i++) {
      const era = ERAS[ERA_ORDER[i]]
      if (centerYear >= era.range.start && centerYear <= era.range.end) {
        currentIndex = i
        break
      }
    }

    // 다음/이전 인덱스
    let nextIndex = currentIndex + direction
    if (nextIndex < 0) nextIndex = 0
    if (nextIndex >= ERA_ORDER.length) nextIndex = ERA_ORDER.length - 1

    if (nextIndex !== currentIndex) {
      handleEraClick(ERA_ORDER[nextIndex])
    }
  }

  // 전체 화면으로 확장될 때 타임라인 Redraw (높이 재계산)
  useEffect(() => {
    if (timelineRef.current) {
      setTimeout(() => {
        timelineRef.current.redraw()
      }, 300) // CSS 트랜지션 시간 후 redraw
    }
  }, [isExpanded])

  return (
    <div className={`timeline-container ${isExpanded ? 'expanded' : ''}`}>
      {/* 타임라인 헤더 (토글/내비게이션) */}
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
          title={isExpanded ? "축소하기" : "전체 화면으로 펼치기"}
        >
          {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>

      <div ref={containerRef} className="timeline-wrapper" />
    </div>
  )
}
