'use client'

import type { BlogPost } from '@/types'
import { formatDateToKorean } from '@/utils/date'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const POSTS_PER_PAGE = 10
const HEADER_MAX_WIDTH = 'max-w-[1000px]'

export default function Home() {
  const [displayCount, setDisplayCount] = useState<number>(POSTS_PER_PAGE)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()
  const observerTarget = useRef<HTMLDivElement>(null)

  // Notion API에서 포스트 목록 가져오기 (캐시 사용)
  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true)
        const response = await fetch('/api/notion/posts', {
          cache: 'force-cache' // 브라우저 캐시 사용
        })
        if (!response.ok) {
          throw new Error('포스트를 가져오는데 실패했습니다.')
        }
        const data = await response.json()
        const formattedPosts: BlogPost[] = data.posts.map((post: BlogPost) => ({
          id: post.id,
          title: post.title,
          date: formatDateToKorean(post.date)
        }))
        setPosts(formattedPosts)
      } catch (error) {
        console.error('포스트 로딩 오류:', error)
        // 오류 발생 시 빈 배열로 설정
        setPosts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const displayedPosts = posts.slice(0, displayCount)
  const hasMore = displayCount < posts.length

  // Intersection Observer로 무한 스크롤 구현
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setDisplayCount((prev) => prev + POSTS_PER_PAGE)
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [hasMore])

  return (
    <div className="p-0 bg-background">
      <header className="bg-background pt-12 px-8 pb-8 mb-8 border-b border-border md:pt-8 md:px-4 md:pb-6">
        <h1 className={`mb-2 ${HEADER_MAX_WIDTH} mx-auto`}>장동호</h1>
        <p className={`text-text-secondary text-lg ${HEADER_MAX_WIDTH} mx-auto md:text-base`}>
          Slow and steady, with pleasure.
        </p>
      </header>

      <div className={`${HEADER_MAX_WIDTH} mx-auto px-8 pb-16 bg-background md:px-4 md:pb-12`}>
        <main className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 md:grid-cols-1 md:gap-4">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="text-text-tertiary text-sm">포스트를 불러오는 중...</div>
            </div>
          ) : displayedPosts.length === 0 ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="text-text-tertiary text-sm">표시할 포스트가 없습니다.</div>
            </div>
          ) : (
            displayedPosts.map((post, index) => (
            <article 
              key={post.id} 
              onClick={() => router.push(`/posts/${post.id}`)}
              className="post-card bg-background p-8 rounded-xl border border-border transition-all duration-200 cursor-pointer flex flex-col hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:border-text-tertiary md:p-6"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="flex items-center gap-2 mb-4 text-sm">
                <span className="text-text-tertiary">{post.date}</span>
              </div>
              <h2 className="mb-3 text-xl leading-[1.4] text-text-primary">
                {post.title}
              </h2>
            </article>
            ))
          )}
        </main>
        
        {/* 무한 스크롤 감지용 요소 */}
        {hasMore && (
          <div ref={observerTarget} className="h-20 flex items-center justify-center">
            <div className="text-text-tertiary text-sm">로딩 중...</div>
          </div>
        )}
      </div>
    </div>
  )
}

