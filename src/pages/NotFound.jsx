import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2>페이지를 찾을 수 없습니다</h2>
        <p>요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
        <Link to="/" className="home-button">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}

export default NotFound

