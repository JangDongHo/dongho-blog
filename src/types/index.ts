// 게시글 타입 정의
export interface Post {
  id: number
  title: string
  date: string
  displayDate: string
  category: string
  excerpt: string
  filename: string
  content: string
}

// 테마 컨텍스트 타입 정의
export interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
}

// 블로그 목록용 게시글 타입
export interface BlogPost {
  id: number
  title: string
  date: string
  excerpt: string
  category: string
}

