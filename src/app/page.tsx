import PostsList from '@/components/PostsList'
import { GITHUB_USERNAME } from '@/config/constants'
import { HEADER_MAX_WIDTH } from '@/config/layout'
import { getNotionPosts } from '@/lib/notion'
import type { BlogPost } from '@/types'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'

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
      <header className="bg-background md:pt-4 md:px-4 md:pb-6">
        <h1 className={`mb-2 text-3xl font-bold ${HEADER_MAX_WIDTH} mx-auto text-center flex items-center justify-center gap-4 border-b border-border pb-8`}>
          백엔드 개발자 장동호입니다
          <Link 
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center hover:text-gray-500 transition-colors"
            aria-label="GitHub 프로필"
          >
            <FaGithub className="w-6 h-6" />
          </Link>
        </h1>
      </header>

      <div className={`mx-auto px-8 pb-16 bg-background md:px-4 md:pb-12`}>
        <h1 className="text-3xl font-bold mb-8">최근 포스트</h1>
        <PostsList posts={posts} />
      </div>
    </div>
  )
}

