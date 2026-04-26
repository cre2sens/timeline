import React, { useMemo, useRef, useEffect } from 'react';
import useStore from '../../store/useStore';
import EventCard from './EventCard';
import './VerticalTimeline.css';

// 연도 파싱 함수
const parseYear = (dateStr) => {
  if (!dateStr) return 0;
  let sign = 1;
  let str = dateStr;
  if (str.startsWith('-')) {
    sign = -1;
    str = str.substring(1);
  }
  const parts = str.split('-');
  return sign * parseInt(parts[0], 10);
};

// 지역 목록 및 레이블
const REGIONS = [
  { id: 'korea', label: 'Korea' },
  { id: 'eastAsia', label: 'East Asia' },
  { id: 'asia', label: 'Asia' },
  { id: 'middleEast', label: 'Middle East' },
  { id: 'europe', label: 'Europe' },
  { id: 'americas', label: 'Americas' },
  { id: 'africa', label: 'Africa' },
  { id: 'etc', label: 'Others' }
];

export default function VerticalTimeline({ items }) {
  const { setSelectedItem } = useStore();
  const scrollRef = useRef(null);
  
  const getStartDate = (item) => item.date?.start || item.date?.birth;

  // 이벤트를 연도별로 그룹화 및 역순 정렬
  const groupedByYear = useMemo(() => {
    const groups = {};
    
    items.forEach(item => {
      const yearStr = getStartDate(item);
      if (!yearStr) return; // 유효하지 않은 날짜 제외
      
      const parsed = parseYear(yearStr);
      // CE 표기 제거, BCE는 BC로 변경
      const displayYear = parsed < 0 ? `BC ${Math.abs(parsed)}` : `${parsed}`;
      
      if (!groups[displayYear]) {
        groups[displayYear] = {
           yearStr: displayYear,
           parsedYear: parsed,
           regions: {
             korea: [], eastAsia: [], asia: [], middleEast: [],
             europe: [], americas: [], africa: [], etc: []
           }
        };
      }
      
      const region = item.location?.region || item.birthPlace?.region || 'etc';
      if (groups[displayYear].regions[region]) {
        groups[displayYear].regions[region].push(item);
      } else {
        groups[displayYear].regions['etc'].push(item);
      }
    });
    
    // 객체를 배열로 변환 후 내림차순(현재->과거) 정렬
    return Object.values(groups).sort((a, b) => b.parsedYear - a.parsedYear);
  }, [items]);

  const handleEventClick = (event) => {
    setSelectedItem(event);
    // 지구본 연동 이벤트 (선택 사항)
    const customEvent = new CustomEvent('focusGlobeTo', { detail: event });
    window.dispatchEvent(customEvent);
  };

  // 초기 스크롤 위치를 맨 위로
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div className="vt-container">
      {/* 헤더 (컬럼명 표시) */}
      <div className="vt-header-row">
        <div className="vt-year-header">Year</div>
        {REGIONS.map(r => (
          <div key={`header-${r.id}`} className="vt-swimlane-header">
            {r.label}
          </div>
        ))}
      </div>
      
      {/* 스크롤 영역 (그리드 본문) */}
      <div className="vt-scroll-area" ref={scrollRef}>
        {groupedByYear.map((group) => (
          <div key={`row-${group.yearStr}`} className="vt-row">
            {/* 연도 셀 */}
            <div className="vt-year-cell">{group.yearStr}</div>
            
            {/* 대륙별 셀 */}
            {REGIONS.map(region => (
              <div key={`cell-${group.yearStr}-${region.id}`} className="vt-region-cell">
                {group.regions[region.id].map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onFocus={handleEventClick} 
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
