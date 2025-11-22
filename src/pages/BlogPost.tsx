import { Link, useParams } from 'react-router-dom'
import { CONTENT_MAX_WIDTH } from '../config/layout'
import { getPostById } from '../posts/posts'

function BlogPost() {
  const { id } = useParams<{ id: string }>()
  const post = getPostById(id)
  
  if (!post) {
    return (
      <div className={`${CONTENT_MAX_WIDTH} mx-auto py-12 px-8 bg-background md:py-8 md:px-4`}>
        <p>게시글을 찾을 수 없습니다.</p>
        <Link to="/blog">블로그로 돌아가기</Link>
      </div>
    )
  }

  return (
    <div className={`${CONTENT_MAX_WIDTH} mx-auto py-12 px-8 bg-background md:py-8 md:px-4`}>
      <article className="bg-background p-0">
        <header className="mb-12 pb-8 border-b border-border">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <span className="text-primary font-semibold">{post.category}</span>
            <span className="text-text-tertiary leading-[1.8] before:content-['·'] before:mr-2">{post.date}</span>
          </div>
          <h1 className="m-0 text-[2.5rem] leading-[1.3] tracking-[-0.02em] text-text-primary md:text-[2rem]">{post.title}</h1>
        </header>
        
        <div className="post-body leading-[1.8] text-text-primary text-base">
          {post.content.split('\n').map((paragraph, index) => {
            if (!paragraph.trim()) return <br key={index} />
            return (
              <p key={index} className="mb-6 whitespace-pre-wrap text-text-secondary">{paragraph}</p>
            )
          })}
        </div>
      </article>
    </div>
  )
}

export default BlogPost

