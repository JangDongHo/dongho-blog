import { getNotionPosts } from '@/lib/notion'
import { NextResponse } from 'next/server'

// 캐시 설정: 60초마다 재검증 (ISR)
export const revalidate = 60

export async function GET() {
  try {
    const posts = await getNotionPosts()
    return NextResponse.json(
      { posts }, 
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
        }
      }
    )
  } catch (error) {
    console.error('Notion API 오류:', error)
    return NextResponse.json(
      { error: '포스트를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

