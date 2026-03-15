/**
 * 날짜 문자열을 Date 객체로 변환 (BC 연도 지원)
 * @param {string} dateStr - 'YYYY-MM-DD' 또는 '-YYYY-MM-DD' (BC)
 * @returns {Date}
 */
export function parseHistoricalDate(dateStr) {
  if (!dateStr) return new Date()

  // BC 연도 처리: 음수 연도
  if (dateStr.startsWith('-')) {
    const parts = dateStr.substring(1).split('-')
    const year = -parseInt(parts[0], 10)
    const month = parseInt(parts[1] || '1', 10) - 1
    const day = parseInt(parts[2] || '1', 10)
    const d = new Date(0)
    d.setFullYear(year, month, day)
    return d
  }

  const parts = dateStr.split('-')
  const year = parseInt(parts[0], 10)
  const month = parseInt(parts[1] || '1', 10) - 1
  const day = parseInt(parts[2] || '1', 10)
  const d = new Date(0)
  d.setFullYear(year, month, day)
  return d
}

/**
 * 연도를 사용자 표시용 문자열로 변환
 * @param {string} dateStr - 날짜 문자열
 * @param {string} locale - 언어 코드
 * @returns {string}
 */
export function formatYear(dateStr, locale = 'ko') {
  if (!dateStr) return ''

  let year
  if (dateStr.startsWith('-')) {
    year = -parseInt(dateStr.substring(1).split('-')[0], 10)
  } else {
    year = parseInt(dateStr.split('-')[0], 10)
  }

  if (year < 0) {
    return locale === 'ko' ? `BC ${Math.abs(year)}년` : `${Math.abs(year)} BC`
  }
  return locale === 'ko' ? `${year}년` : `${year} AD`
}

/**
 * 두 날짜 사이의 기간 텍스트 생성
 * @param {string} start - 시작 날짜
 * @param {string} end - 종료 날짜
 * @param {string} locale - 언어 코드
 * @returns {string}
 */
export function formatDateRange(start, end, locale = 'ko') {
  const s = formatYear(start, locale)
  const e = formatYear(end, locale)
  if (s === e || !end) return s
  return `${s} ~ ${e}`
}
