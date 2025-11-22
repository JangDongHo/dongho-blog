/**
 * 제목을 URL-friendly slug로 변환합니다.
 * 공백은 하이픈(-)으로 변환합니다.
 */
export function titleToSlug(title: string): string {
  return title
    .trim()
    .replace(/\s+/g, '-') // 공백을 하이픈으로 변환
    .toLowerCase()
}

