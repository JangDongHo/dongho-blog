import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!baseUrl) {
    // 환경 변수가 없으면 기본 설정 반환 (개발 환경용)
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

