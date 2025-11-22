import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="p-0 bg-background">
      <section className="bg-background text-center py-20 px-8 mb-12 border-b border-border md:py-12 md:px-6">
        <h1 className="text-6xl mb-6 text-text-primary font-bold tracking-tight md:text-4xl">
          안녕하세요! 👋
        </h1>
        <p className="text-xl text-text-secondary mb-0 leading-relaxed md:text-lg">
          개발과 기술에 대한 이야기를 공유하는 공간입니다.
        </p>
        <Link 
          to="/blog" 
          className="inline-block px-8 py-4 bg-primary text-white rounded-lg no-underline font-bold text-base transition-all duration-200 hover:bg-[#1B64DA] hover:-translate-y-0.5 hover:text-white"
        >
          블로그 둘러보기
        </Link>
      </section>

      <section className="max-w-[1200px] mx-auto px-8 pb-16 bg-background md:px-4 md:pb-12">
        <h2 className="mb-8 text-2xl text-text-primary">최근 게시글</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 md:grid-cols-1 md:gap-4">
          <article className="bg-background p-8 rounded-xl border border-border transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:border-text-tertiary md:p-6">
            <h3 className="mb-3 text-text-primary text-xl font-bold leading-snug tracking-tight">
              React 시작하기
            </h3>
            <p className="text-text-secondary leading-relaxed mb-5 text-[0.9375rem]">
              React의 기본 개념과 시작하는 방법에 대해 알아봅니다.
            </p>
            <Link 
              to="/blog/1" 
              className="text-primary font-semibold no-underline text-sm hover:text-[#1B64DA]"
            >
              더 읽기 →
            </Link>
          </article>
          
          <article className="bg-background p-8 rounded-xl border border-border transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:border-text-tertiary md:p-6">
            <h3 className="mb-3 text-text-primary text-xl font-bold leading-snug tracking-tight">
              Vite로 빠른 개발 환경 구축
            </h3>
            <p className="text-text-secondary leading-relaxed mb-5 text-[0.9375rem]">
              Vite를 사용하여 빠르고 효율적인 개발 환경을 만드는 방법을 소개합니다.
            </p>
            <Link 
              to="/blog/2" 
              className="text-primary font-semibold no-underline text-sm hover:text-[#1B64DA]"
            >
              더 읽기 →
            </Link>
          </article>
          
          <article className="bg-background p-8 rounded-xl border border-border transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:border-text-tertiary md:p-6">
            <h3 className="mb-3 text-text-primary text-xl font-bold leading-snug tracking-tight">
              JavaScript 최신 기능들
            </h3>
            <p className="text-text-secondary leading-relaxed mb-5 text-[0.9375rem]">
              ES2024의 새로운 기능들과 활용법을 살펴봅니다.
            </p>
            <Link 
              to="/blog/3" 
              className="text-primary font-semibold no-underline text-sm hover:text-[#1B64DA]"
            >
              더 읽기 →
            </Link>
          </article>
        </div>
      </section>
    </div>
  )
}

export default Home

