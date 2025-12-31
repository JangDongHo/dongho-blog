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
              className="flex items-start justify-between gap-4 py-1 px-2 rounded cursor-pointer hover:bg-hover hover:text-primary transition-colors"
            >
              <div className="flex items-start gap-2 flex-1">
                <span className="self-center text-lg">📄</span>
                <span className="text-lg font-medium text-text-primary leading-tight">
                  {post.title}
                </span>
              </div>
              <span className="text-sm text-text-tertiary whitespace-nowrap self-center">
                {post.date ? formatDateToKorean(post.date) : ''}
              </span>
            </article>
          </li>
        ))
      )}
    </ul>
  )
}

