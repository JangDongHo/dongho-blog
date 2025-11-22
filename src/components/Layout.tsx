import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import ScrollToTop from './ScrollToTop'

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ScrollToTop />
      <Header />
      <main className="flex-1 max-w-[1000px] w-full mx-auto p-0 bg-background">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout

