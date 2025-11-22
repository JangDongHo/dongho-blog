import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()
  
  return (
    <header className="bg-background border-b border-border sticky top-0 z-[100]">
      <div className="max-w-[1200px] mx-auto px-8 py-5 flex justify-between items-center md:px-4">
        <Link to="/" className="text-inherit no-underline">
          <h1 className="text-2xl m-0 font-bold text-text-primary tracking-tight md:text-xl">
            동호의 블로그
          </h1>
        </Link>
        <nav className="flex gap-10 md:gap-6">
          <Link 
            to="/" 
            className={`text-text-secondary no-underline font-semibold text-base transition-colors duration-200 relative md:text-sm ${
              location.pathname === '/' 
                ? 'text-text-primary after:content-[""] after:absolute after:-bottom-5 after:left-0 after:right-0 after:h-0.5 after:bg-primary' 
                : 'hover:text-text-primary'
            }`}
          >
            홈
          </Link>
          <Link 
            to="/blog" 
            className={`text-text-secondary no-underline font-semibold text-base transition-colors duration-200 relative md:text-sm ${
              location.pathname.startsWith('/blog') 
                ? 'text-text-primary after:content-[""] after:absolute after:-bottom-5 after:left-0 after:right-0 after:h-0.5 after:bg-primary' 
                : 'hover:text-text-primary'
            }`}
          >
            블로그
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

