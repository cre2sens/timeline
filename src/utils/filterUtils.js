/**
 * 필터 조건에 따라 이벤트/인물 데이터를 필터링
 * @param {Array} items - 전체 아이템 배열
 * @param {Object} filters - 필터 상태 객체
 * @param {string} locale - 현재 언어 코드
 * @returns {Array} 필터링된 아이템
 */
export function filterItems(items, filters, locale = 'ko', mediaData = []) {
  return items.filter((item) => {
    // 시대 필터
    if (filters.eras.length > 0 && !filters.eras.includes(item.era)) {
      return false
    }

    // 지역 필터
    if (filters.regions.length > 0) {
      const region = item.location?.region || item.birthPlace?.region
      if (!region || !filters.regions.includes(region)) {
        return false
      }
    }

    // 카테고리 필터
    if (filters.categories.length > 0 && !filters.categories.includes(item.category)) {
      return false
    }

    // 유형 필터 (이벤트/인물)
    if (filters.itemType !== 'all' && item.type !== filters.itemType) {
      return false
    }

    // 미디어 유형 필터
    if (filters.mediaTypes.length > 0) {
      if (!item.relatedMedia || item.relatedMedia.length === 0) return false
      
      const itemMedia = mediaData.filter(m => item.relatedMedia.includes(m.id))
      const hasMatchingMedia = itemMedia.some(m => filters.mediaTypes.includes(m.type))
      
      if (!hasMatchingMedia) {
        return false
      }
    }

    // 중요도 필터
    if (item.importance && item.importance < filters.importance) {
      return false
    }

    // 키워드 검색
    if (filters.search) {
      const query = filters.search.toLowerCase()
      const title = (item.title?.[locale] || '').toLowerCase()
      const desc = (item.description?.[locale] || '').toLowerCase()
      
      // 지명 검색 추가 (이벤트의 location 또는 인물의 birthPlace)
      const locationName = (
        item.location?.name?.[locale] || 
        item.location?.name?.ko || 
        item.birthPlace?.name?.[locale] || 
        item.birthPlace?.name?.ko || 
        ''
      ).toLowerCase()

      if (!title.includes(query) && !desc.includes(query) && !locationName.includes(query)) {
        return false
      }
    }

    return true
  })
}

/**
 * 선택된 아이템과 관련된 미디어 필터링
 * @param {Array} allMedia - 전체 미디어 배열
 * @param {Object} selectedItem - 선택된 이벤트/인물
 * @param {Array} mediaTypeFilter - 미디어 유형 필터
 * @returns {Array} 관련 미디어
 */
export function getRelatedMedia(allMedia, selectedItem, mediaTypeFilter = []) {
  if (!selectedItem || !selectedItem.relatedMedia) return []

  let related = allMedia.filter((m) => selectedItem.relatedMedia.includes(m.id))

  if (mediaTypeFilter.length > 0) {
    related = related.filter((m) => mediaTypeFilter.includes(m.type))
  }

  return related
}
