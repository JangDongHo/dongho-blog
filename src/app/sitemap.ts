import { getNotionPosts } from '@/lib/notion'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 사이트 URL (환경 변수에서 가져오거나 기본값 사용)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_SITE_URL 환경 변수가 설정되지 않았습니다.')
  }

  // 정적 페이지들
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // 동적 포스트 페이지들
  let postPages: MetadataRoute.Sitemap = []
  
  try {
    const posts = await getNotionPosts()
    postPages = posts.map((post) => ({
      url: `${baseUrl}/posts/${post.id}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('포스트 목록을 가져오는 중 오류 발생:', error)
    // 오류 발생 시 포스트 없이 정적 페이지만 반환
  }

  return [...staticPages, ...postPages]
}

