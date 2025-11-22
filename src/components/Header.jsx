import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>동호의 블로그</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">홈</Link>
          <Link to="/blog" className="nav-link">블로그</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

