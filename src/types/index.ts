// 게시글 타입 정의
export interface Post {
  id: string // 제목 기반 slug (공백은 하이픈으로 변환)
  title: string
  date: string
   
  recordMap: any
}

// 테마 컨텍스트 타입 정의
export interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
}

// 블로그 목록용 게시글 타입
export interface BlogPost {
  id: string // 제목 기반 slug
  title: string
  date: string
}

