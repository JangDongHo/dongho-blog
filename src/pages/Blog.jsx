import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Blog.css'

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
    <div className="blog">
      <header className="blog-header">
        <h1>블로그</h1>
        <p>개발과 기술에 대한 생각과 경험을 공유합니다</p>
      </header>

      <div className="blog-content">
        <aside className="blog-sidebar">
          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category}
                className={`category-button ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </aside>

        <main className="blog-posts">
          {filteredPosts.map(post => (
            <article key={post.id} className="blog-post">
              <div className="post-meta">
                <span className="post-category">{post.category}</span>
                <span className="post-date">{post.date}</span>
              </div>
              <h2>
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </h2>
              <p className="post-excerpt">{post.excerpt}</p>
              <Link to={`/blog/${post.id}`} className="read-more">
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

