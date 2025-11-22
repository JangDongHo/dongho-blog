import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">안녕하세요! 👋</h1>
        <p className="hero-description">
          개발과 기술에 대한 이야기를 공유하는 공간입니다.
        </p>
        <Link to="/blog" className="cta-button">
          블로그 둘러보기
        </Link>
      </section>

      <section className="featured">
        <h2>최근 게시글</h2>
        <div className="post-grid">
          <article className="post-card">
            <h3>React 시작하기</h3>
            <p className="post-excerpt">
              React의 기본 개념과 시작하는 방법에 대해 알아봅니다.
            </p>
            <Link to="/blog/1" className="read-more">더 읽기 →</Link>
          </article>
          
          <article className="post-card">
            <h3>Vite로 빠른 개발 환경 구축</h3>
            <p className="post-excerpt">
              Vite를 사용하여 빠르고 효율적인 개발 환경을 만드는 방법을 소개합니다.
            </p>
            <Link to="/blog/2" className="read-more">더 읽기 →</Link>
          </article>
          
          <article className="post-card">
            <h3>JavaScript 최신 기능들</h3>
            <p className="post-excerpt">
              ES2024의 새로운 기능들과 활용법을 살펴봅니다.
            </p>
            <Link to="/blog/3" className="read-more">더 읽기 →</Link>
          </article>
        </div>
      </section>
    </div>
  )
}

export default Home

