// 레이아웃 너비 설정
export const LAYOUT_WIDTH = {
  CONTENT: '1000px', // 메인 콘텐츠 너비
} as const

// Tailwind 클래스로 사용하기 위한 헬퍼
export const CONTENT_MAX_WIDTH = `max-w-[${LAYOUT_WIDTH.CONTENT}]`

