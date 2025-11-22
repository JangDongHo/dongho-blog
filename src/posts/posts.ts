import type { Post } from '../types'
import { parseMarkdown } from '../utils/parseMarkdown'

// src/posts 폴더의 모든 .md 파일을 자동으로 import (posts.ts 제외)
const markdownModules = import.meta.glob('./*.md', { 
  eager: true, 
  query: '?raw',
  import: 'default'
}) as Record<string, string>

// 게시글 메타데이터 (마크다운 파일의 frontmatter에서 파싱)
export const posts: Post[] = Object.entries(markdownModules)
  .map(([path, content]) => {
    // 경로에서 파일명 추출 (예: './React 시작하기.md' -> 'React 시작하기.md')
    const filename = path.replace('./', '')
    return parseMarkdown(content, filename)
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // 날짜순 정렬

// ID(slug)로 게시글 찾기
export function getPostById(id: string | undefined): Post | undefined {
  if (!id) return undefined
  return posts.find(post => post.id === id)
}

// 모든 게시글 가져오기
export function getAllPosts(): Post[] {
  return posts
}

