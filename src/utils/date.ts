/**
 * ISO 날짜 형식(YYYY-MM-DD)을 한국어 형식으로 변환합니다.
 * 예: "2025-11-15" -> "2025년 11월 15일"
 */
export function formatDateToKorean(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  return `${year}년 ${month}월 ${day}일`
}

