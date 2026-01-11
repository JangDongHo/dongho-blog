'use client'

import { GITHUB_USERNAME } from '@/config/constants'
import { HEADER_MAX_WIDTH } from '@/config/layout'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/' || pathname?.startsWith('/posts/')
    }
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-100 bg-background">
      <div className={`${HEADER_MAX_WIDTH} mx-auto px-8 py-5 flex justify-between items-center md:px-4`}>
        <Link href="/" className="text-inherit no-underline flex items-center">
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
        <nav className="flex items-center gap-4 md:gap-3">
          <Link
            href="/"
            className={`px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200 ${
              isActive('/')
                ? 'text-text-primary'
                : 'text-text-secondary'
            } hover:text-text-primary hover:bg-hover`}
          >
            Post
          </Link>
          <Link
            href="/about"
            className={`px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200 ${
              isActive('/about')
                ? 'text-text-primary'
                : 'text-text-secondary'
            } hover:text-text-primary hover:bg-hover`}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}
