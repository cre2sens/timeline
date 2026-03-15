// 위키피디아 REST API 래퍼
const WIKI_API_BASE = 'https://{lang}.wikipedia.org/api/rest_v1/page/summary/'

/**
 * 위키피디아 페이지 요약 조회
 * @param {string} title - 위키피디아 문서 제목
 * @param {string} lang - 언어 코드 ('ko' | 'en')
 * @returns {Promise<Object>} 위키피디아 요약 데이터
 */
export async function fetchWikiSummary(title, lang = 'ko') {
  if (!title) return null

  const url = WIKI_API_BASE.replace('{lang}', lang) + encodeURIComponent(title)

  try {
    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' },
    })

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`Wiki API 오류: ${response.status}`)
    }

    const data = await response.json()

    return {
      title: data.title,
      extract: data.extract,
      description: data.description || '',
      thumbnail: data.thumbnail
        ? {
            url: data.thumbnail.source,
            width: data.thumbnail.width,
            height: data.thumbnail.height,
          }
        : null,
      pageUrl: data.content_urls?.desktop?.page || '',
      timestamp: data.timestamp,
    }
  } catch (error) {
    console.error('위키피디아 API 호출 실패:', error)
    return null
  }
}

/**
 * 위키피디아 페이지 URL 생성
 * @param {string} title - 위키피디아 문서 제목
 * @param {string} lang - 언어 코드
 * @returns {string} 위키피디아 URL
 */
export function getWikiUrl(title, lang = 'ko') {
  if (!title) return '#'
  return `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(title)}`
}
