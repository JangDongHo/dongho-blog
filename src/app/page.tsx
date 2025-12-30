import PostsList from '@/components/PostsList'
import { getNotionPosts } from '@/lib/notion'
import type { BlogPost } from '@/types'

const HEADER_MAX_WIDTH = 'max-w-[1000px]'

// ISR 설정: 1시간마다 재검증
// 첫 방문자가 페이지를 요청하면 서버에서 Notion API를 호출하고 캐싱
// 이후 1시간 동안은 캐싱된 페이지를 반환하여 API 호출을 방지
// 1시간 후 다음 요청 시 백그라운드에서 자동으로 재검증하여 최신 데이터로 갱신
export const revalidate = 3600

export default async function Home() {
  let posts: BlogPost[] = []
  
  try {
    // 서버 컴포넌트에서 직접 Notion API 호출 (ISR로 캐싱됨)
    posts = await getNotionPosts()
  } catch (error) {
    console.error('포스트 로딩 오류:', error)
    // 오류 발생 시 빈 배열로 설정
    posts = []
  }

  return (
    <div className="p-0 bg-background">
      <header className="bg-background pt-12 px-8 pb-8 mb-8 border-b border-border md:pt-8 md:px-4 md:pb-6">
        <h1 className={`mb-2 ${HEADER_MAX_WIDTH} mx-auto`}>장동호</h1>
        <p className={`text-text-secondary text-lg ${HEADER_MAX_WIDTH} mx-auto md:text-base`}>
          Slow and steady, with pleasure.
        </p>
      </header>

      <div className={`${HEADER_MAX_WIDTH} mx-auto px-8 pb-16 bg-background md:px-4 md:pb-12`}>
        <PostsList posts={posts} />
      </div>
    </div>
  )
}

