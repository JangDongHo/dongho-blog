// 마크다운 파일 import
import type { Post } from '../types'
import { parseMarkdown } from '../utils/parseMarkdown'
import jsPostContent from './JavaScript 최신 기능들.md?raw'
import reactPostContent from './React 시작하기.md?raw'
import vitePostContent from './Vite로 빠른 개발 환경 구축.md?raw'
import designPostContent from './프로덕트 디자인 철학.md?raw'

// 게시글 메타데이터 (마크다운 파일의 frontmatter에서 파싱)
export const posts: Post[] = [
  parseMarkdown(reactPostContent, 'React 시작하기.md'),
  parseMarkdown(vitePostContent, 'Vite로 빠른 개발 환경 구축.md'),
  parseMarkdown(jsPostContent, 'JavaScript 최신 기능들.md'),
  parseMarkdown(designPostContent, '프로덕트 디자인 철학.md')
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // 날짜순 정렬

// ID(slug)로 게시글 찾기
export function getPostById(id: string | undefined): Post | undefined {
  if (!id) return undefined
  return posts.find(post => post.id === id)
}

// 모든 게시글 가져오기
export function getAllPosts(): Post[] {
  return posts
}

