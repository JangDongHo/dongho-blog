'use client'

import type { BlogPost } from '@/types'
import { formatDateToKorean } from '@/utils/date'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const POSTS_PER_PAGE = 10

interface PostsListProps {
  posts: BlogPost[]
}

export default function PostsList({ posts }: PostsListProps) {
  const [displayCount, setDisplayCount] = useState<number>(POSTS_PER_PAGE)
  const router = useRouter()
  const observerTarget = useRef<HTMLDivElement>(null)

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
    <>
      <main className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 md:grid-cols-1 md:gap-4">
        {displayedPosts.length === 0 ? (
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
                <span className="text-text-tertiary">{formatDateToKorean(post.date)}</span>
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
    </>
  )
}

