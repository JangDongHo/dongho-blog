function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="max-w-[1000px] mx-auto py-12 px-8 flex justify-between items-center md:flex-col md:gap-6 md:text-center md:py-8 md:px-4">
        <p className="m-0 text-text-tertiary text-sm">© {currentYear} 동호의 블로그. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="https://github.com/JangDongHo" target="_blank" rel="noopener noreferrer" className="text-text-secondary no-underline font-semibold text-sm transition-colors duration-200 hover:text-primary">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/DonghoJang/" target="_blank" rel="noopener noreferrer" className="text-text-secondary no-underline font-semibold text-sm transition-colors duration-200 hover:text-primary">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

