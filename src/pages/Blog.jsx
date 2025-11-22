import { useState } from 'react'
import { Link } from 'react-router-dom'

function Blog() {
  const [activeCategory, setActiveCategory] = useState('전체')
  
  const posts = [
    {
      id: 1,
      title: 'React 시작하기',
      date: '2025년 11월 20일',
      excerpt: 'React의 기본 개념과 시작하는 방법에 대해 알아봅니다.',
      category: '개발',
      author: '동호'
    },
    {
      id: 2,
      title: 'Vite로 빠른 개발 환경 구축',
      date: '2025년 11월 18일',
      excerpt: 'Vite를 사용하여 빠르고 효율적인 개발 환경을 만드는 방법을 소개합니다.',
      category: '개발',
      author: '동호'
    },
    {
      id: 3,
      title: 'JavaScript 최신 기능들',
      date: '2025년 11월 15일',
      excerpt: 'ES2024의 새로운 기능들과 활용법을 살펴봅니다.',
      category: '개발',
      author: '동호'
    },
    {
      id: 4,
      title: '프로덕트 디자인 철학',
      date: '2025년 11월 10일',
      excerpt: '사용자 중심의 프로덕트를 만들기 위한 디자인 원칙을 공유합니다.',
      category: '디자인',
      author: '동호'
    },
  ]

  const categories = ['전체', 'FE', 'BE', '회고']
  
  const filteredPosts = activeCategory === '전체' 
    ? posts 
    : posts.filter(post => post.category === activeCategory)

  return (
    <div className="p-0 bg-background">
      <header className="bg-background pt-12 px-8 pb-8 mb-8 border-b border-border md:pt-8 md:px-4 md:pb-6">
        <h1 className="mb-2 max-w-[1200px] mx-auto">블로그</h1>
        <p className="text-text-secondary text-lg max-w-[1200px] mx-auto">
          개발과 기술에 대한 생각과 경험을 공유합니다
        </p>
      </header>

      <div className="max-w-[1200px] mx-auto px-8 pb-16 bg-background md:px-4 md:pb-12">
        <aside className="sticky top-[100px] h-fit mb-8">
          <div className="flex gap-3 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                className={`px-5 py-2.5 bg-background border border-border rounded-3xl font-semibold text-sm cursor-pointer transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-text-primary text-white border-text-primary'
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
              className="bg-background p-8 rounded-xl border border-border transition-all duration-200 cursor-pointer flex flex-col hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:border-text-tertiary md:p-6"
            >
              <div className="flex items-center gap-2 mb-4 text-sm">
                <span className="text-primary font-semibold">{post.category}</span>
                <span className="text-text-tertiary before:content-['·'] before:mr-2">
                  {post.date}
                </span>
              </div>
              <h2 className="mb-3 text-xl leading-snug">
                <Link 
                  to={`/blog/${post.id}`}
                  className="text-text-primary no-underline hover:text-primary"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-text-secondary leading-relaxed mb-5 text-[0.9375rem] flex-1">
                {post.excerpt}
              </p>
              <Link 
                to={`/blog/${post.id}`} 
                className="text-primary font-semibold no-underline text-sm hover:text-[#1B64DA]"
              >
                더 알아보기 →
              </Link>
            </article>
          ))}
        </main>
      </div>
    </div>
  )
}

export default Blog

