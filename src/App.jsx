import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

