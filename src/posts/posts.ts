// 마크다운 파일 import
import type { Post } from '../types'
import jsPostContent from './JavaScript 최신 기능들.md?raw'
import reactPostContent from './React 시작하기.md?raw'
import vitePostContent from './Vite로 빠른 개발 환경 구축.md?raw'
import designPostContent from './프로덕트 디자인 철학.md?raw'

// 게시글 메타데이터
export const posts: Post[] = [
  {
    id: 1,
    title: 'React 시작하기',
    date: '2025-11-20',
    displayDate: '2025년 11월 20일',
    category: 'React',
    excerpt: 'React의 기본 개념과 시작하는 방법에 대해 알아봅니다.',
    filename: 'React 시작하기.md',
    content: reactPostContent
  },
  {
    id: 2,
    title: 'Vite로 빠른 개발 환경 구축',
    date: '2025-11-18',
    displayDate: '2025년 11월 18일',
    category: 'Tools',
    excerpt: 'Vite를 사용하여 빠르고 효율적인 개발 환경을 만드는 방법을 소개합니다.',
    filename: 'Vite로 빠른 개발 환경 구축.md',
    content: vitePostContent
  },
  {
    id: 3,
    title: 'JavaScript 최신 기능들',
    date: '2025-11-15',
    displayDate: '2025년 11월 15일',
    category: 'JavaScript',
    excerpt: 'ES2024의 새로운 기능들과 활용법을 살펴봅니다.',
    filename: 'JavaScript 최신 기능들.md',
    content: jsPostContent
  },
  {
    id: 4,
    title: '프로덕트 디자인 철학',
    date: '2025-11-10',
    displayDate: '2025년 11월 10일',
    category: '디자인',
    excerpt: '사용자 중심의 프로덕트를 만들기 위한 디자인 원칙을 공유합니다.',
    filename: '프로덕트 디자인 철학.md',
    content: designPostContent
  }
]

// ID로 게시글 찾기
export function getPostById(id: string | undefined): Post | undefined {
  if (!id) return undefined
  return posts.find(post => post.id === Number(id))
}

// 모든 게시글 가져오기
export function getAllPosts(): Post[] {
  return posts
}

