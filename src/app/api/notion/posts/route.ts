import { getNotionPosts } from '@/lib/notion'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const posts = await getNotionPosts()
    return NextResponse.json(
      { posts }
    )
  } catch (error) {
    console.error('Notion API 오류:', error)
    return NextResponse.json(
      { error: '포스트를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

