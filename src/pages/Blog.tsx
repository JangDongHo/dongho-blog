import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CONTENT_MAX_WIDTH } from '../config/layout'
import { useTheme } from '../contexts/ThemeContext'
import { getAllPosts } from '../posts/posts'
import type { BlogPost } from '../types'
import { formatDateToKorean } from '../utils/date'

function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>('전체')
  const navigate = useNavigate()
  const { isDark } = useTheme()
  
  const posts: BlogPost[] = getAllPosts().map(post => ({
    id: post.id,
    title: post.title,
    date: formatDateToKorean(post.date),
    excerpt: post.excerpt,
    category: post.category ?? "-"
  }))

  const categories = ['전체', 'FE', 'BE', '회고']
  
  const filteredPosts = activeCategory === '전체' 
    ? posts 
    : posts.filter(post => post.category === activeCategory)

  return (
    <div className="p-0 bg-background">
      <header className="bg-background pt-12 px-8 pb-8 mb-8 border-b border-border md:pt-8 md:px-4 md:pb-6">
        <h1 className={`mb-2 ${CONTENT_MAX_WIDTH} mx-auto`}>장동호</h1>
        <p className={`text-text-secondary text-lg ${CONTENT_MAX_WIDTH} mx-auto md:text-base`}>
          Slow and steady, with pleasure.
        </p>
      </header>

      <div className={`${CONTENT_MAX_WIDTH} mx-auto px-8 pb-16 bg-background md:px-4 md:pb-12`}>
        <aside className="top-[100px] h-fit mb-8">
          <div className="flex gap-3 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                className={`px-5 py-2.5 bg-background border border-border rounded-full font-semibold text-sm cursor-pointer transition-all duration-200 ${
                  activeCategory === category 
                    ? `bg-text-primary border-text-primary ${isDark ? 'text-black' : 'text-white'}` 
                    : 'text-text-secondary hover:bg-hover hover:text-text-primary'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </aside>

        <main className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 md:grid-cols-1 md:gap-4">
          {filteredPosts.map(post => (
            <article 
              key={post.id} 
              onClick={() => navigate(`/posts/${post.id}`)}
              className="bg-background p-8 rounded-xl border border-border transition-all duration-200 cursor-pointer flex flex-col hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:border-text-tertiary md:p-6"
            >
              <div className="flex items-center gap-2 mb-4 text-sm">
                <span className="text-primary font-semibold">{post.category}</span>
                <span className="text-text-tertiary before:content-['·'] before:mr-2">{post.date}</span>
              </div>
              <h2 className="mb-3 text-xl leading-[1.4] text-text-primary">
                {post.title}
              </h2>
              <p className="text-text-secondary leading-[1.6] mb-5 text-[0.9375rem] flex-1">{post.excerpt}</p>
            </article>
          ))}
        </main>
      </div>
    </div>
  )
}

export default Blog

