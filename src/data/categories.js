// 시대 구분
export const ERAS = {
  ancient: {
    id: 'ancient',
    label: { ko: '고대', en: 'Ancient' },
    range: { start: -3000, end: 476 },
    color: 'var(--era-ancient)',
    hex: '#C9A96E',
  },
  medieval: {
    id: 'medieval',
    label: { ko: '중세', en: 'Medieval' },
    range: { start: 476, end: 1453 },
    color: 'var(--era-medieval)',
    hex: '#8B5E3C',
  },
  earlyModern: {
    id: 'earlyModern',
    label: { ko: '근세', en: 'Early Modern' },
    range: { start: 1453, end: 1789 },
    color: 'var(--era-early-modern)',
    hex: '#4A7C59',
  },
  modern: {
    id: 'modern',
    label: { ko: '근대', en: 'Modern' },
    range: { start: 1789, end: 1945 },
    color: 'var(--era-modern)',
    hex: '#4A6FA5',
  },
  contemporary: {
    id: 'contemporary',
    label: { ko: '현대', en: 'Contemporary' },
    range: { start: 1945, end: 2030 },
    color: 'var(--era-contemporary)',
    hex: '#7B73FF',
  },
}

// 지역 구분
export const REGIONS = {
  eastAsia: { id: 'eastAsia', label: { ko: '동아시아', en: 'East Asia' } },
  europe: { id: 'europe', label: { ko: '유럽', en: 'Europe' } },
  middleEast: { id: 'middleEast', label: { ko: '중동', en: 'Middle East' } },
  americas: { id: 'americas', label: { ko: '아메리카', en: 'Americas' } },
  africa: { id: 'africa', label: { ko: '아프리카', en: 'Africa' } },
  southAsia: { id: 'southAsia', label: { ko: '남아시아', en: 'South Asia' } },
  korea: { id: 'korea', label: { ko: '한국', en: 'Korea' } },
}

// 카테고리 (이벤트·인물)
export const CATEGORIES = {
  battle: { id: 'battle', icon: '⚔️', label: { ko: '전투·전쟁', en: 'Battle & War' } },
  treaty: { id: 'treaty', icon: '📜', label: { ko: '조약·협정', en: 'Treaty' } },
  discovery: { id: 'discovery', icon: '🧭', label: { ko: '발견·탐험', en: 'Discovery' } },
  invention: { id: 'invention', icon: '💡', label: { ko: '발명·기술', en: 'Invention' } },
  culture: { id: 'culture', icon: '🎭', label: { ko: '문화·예술', en: 'Culture & Art' } },
  politics: { id: 'politics', icon: '🏛️', label: { ko: '정치·혁명', en: 'Politics' } },
  ruler: { id: 'ruler', icon: '👑', label: { ko: '왕·지도자', en: 'Ruler' } },
  thinker: { id: 'thinker', icon: '📖', label: { ko: '사상가·학자', en: 'Thinker' } },
  explorer: { id: 'explorer', icon: '🗺️', label: { ko: '탐험가', en: 'Explorer' } },
  scientist: { id: 'scientist', icon: '🔬', label: { ko: '과학자', en: 'Scientist' } },
}

// 미디어 유형
export const MEDIA_TYPES = {
  movie: { id: 'movie', icon: '🎬', label: { ko: '영화·드라마', en: 'Movie & Drama' } },
  novel: { id: 'novel', icon: '📚', label: { ko: '소설·문학', en: 'Novel & Literature' } },
  music: { id: 'music', icon: '🎵', label: { ko: '음악·오페라', en: 'Music & Opera' } },
}

// 시대 색상 가져오기 헬퍼
export function getEraColor(eraId) {
  return ERAS[eraId]?.hex || '#888888'
}

// 카테고리 아이콘 가져오기 헬퍼
export function getCategoryIcon(categoryId) {
  return CATEGORIES[categoryId]?.icon || '📌'
}

// 미디어 아이콘 가져오기 헬퍼
export function getMediaIcon(mediaType) {
  return MEDIA_TYPES[mediaType]?.icon || '🔗'
}
