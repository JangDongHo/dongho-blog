function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="max-w-[1200px] mx-auto px-8 py-12 flex justify-between items-center md:flex-col md:gap-6 md:text-center md:px-4 md:py-8">
        <p className="m-0 text-text-tertiary text-sm">
          © {currentYear} 동호의 블로그. All rights reserved.
        </p>
        <div className="flex gap-8">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-secondary no-underline font-semibold text-sm transition-colors duration-200 hover:text-primary"
          >
            GitHub
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-secondary no-underline font-semibold text-sm transition-colors duration-200 hover:text-primary"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

