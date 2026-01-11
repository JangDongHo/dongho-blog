'use client'

import type { BlogPost } from '@/types'
import { formatDateToKorean } from '@/utils/date'
import { useRouter } from 'next/navigation'

interface PostsListProps {
  posts: BlogPost[]
}

export default function PostsList({ posts }: PostsListProps) {
  const router = useRouter()

  return (
    <ul className="space-y-1">
      {posts.length === 0 ? (
        <li className="flex items-center justify-center py-12">
          <div className="text-text-tertiary text-sm">표시할 포스트가 없습니다.</div>
        </li>
      ) : (
        posts.map((post) => (
          <li 
            key={post.id}
          >
            <article 
              onClick={() => router.push(`/posts/${post.id}`)}
              className="flex gap-2 py-1 px-2 rounded cursor-pointer hover:bg-hover hover:text-primary transition-colors md:items-start md:justify-between md:gap-4 select-none"
            >
              <span className="self-start text-base md:text-lg md:self-center">📄</span>
              <div className="flex flex-col gap-2 flex-1 md:flex-row md:items-start md:justify-between md:gap-4">
                <span className="text-base font-medium text-text-primary leading-tight md:text-lg">
                  {post.title}
                </span>
                <span className="text-xs text-text-tertiary md:text-sm md:whitespace-nowrap md:self-center">
                  {post.date ? formatDateToKorean(post.date) : ''}
                </span>
              </div>
            </article>
          </li>
        ))
      )}
    </ul>
  )
}

