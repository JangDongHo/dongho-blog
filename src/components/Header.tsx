import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

const GITHUB_USERNAME = 'JangDongHo' // GitHub 사용자명을 여기에 입력하세요

function Header() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-100 bg-background border-b border-border">
      <div className="max-w-[1000px] mx-auto px-8 py-5 flex justify-between items-center md:px-4">
        <Link to="/" className="text-inherit no-underline flex items-center">
          <img
            src={`https://github.com/${GITHUB_USERNAME}.png`}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-border hover:border-text-tertiary transition-colors duration-200"
            onError={(e) => {
              // 이미지 로드 실패 시 기본 아바타 표시
              const target = e.target as HTMLImageElement
              target.src = `https://ui-avatars.com/api/?name=${GITHUB_USERNAME}&background=3182F6&color=fff&size=128`
            }}
          />
        </Link>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-border bg-background text-text-primary hover:bg-hover transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header

