import type { Post } from '../types'
import { titleToSlug } from './slug'

interface FrontMatter {
  title: string
  date: string
  category: string
  excerpt: string
}

/**
 * 마크다운 파일에서 frontmatter와 본문을 분리합니다.
 */
export function parseMarkdown(content: string, filename: string): Post {
  // YAML frontmatter 파싱 (---로 감싸진 형식)
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontMatterRegex)

  if (!match) {
    throw new Error(`Frontmatter를 찾을 수 없습니다: ${filename}`)
  }

  const frontMatterText = match[1]
  const body = match[2]

  // YAML 파싱 (간단한 형식)
  const frontMatter: Partial<FrontMatter> = {}
  
  frontMatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim()
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '')
      
      if (key === 'title' || key === 'date' || key === 'category' || key === 'excerpt') {
        frontMatter[key] = value
      }
    }
  })

  // 필수 필드 검증
  if (!frontMatter.title || !frontMatter.date || !frontMatter.category || !frontMatter.excerpt) {
    throw new Error(`필수 메타데이터가 누락되었습니다: ${filename}`)
  }

  // id는 제목 기반으로 생성 (공백을 하이픈으로 변환)
  const id = titleToSlug(frontMatter.title!)

  return {
    id,
    title: frontMatter.title!,
    date: frontMatter.date!,
    category: frontMatter.category!,
    excerpt: frontMatter.excerpt!,
    filename,
    content: body.trim()
  }
}

