import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import { CONTENT_MAX_WIDTH } from '../config/layout'
import { getPostById } from '../posts/posts'
import { formatDateToKorean } from '../utils/date'
import NotFound from './NotFound'

function BlogPost() {
  const { id } = useParams<{ id: string }>()
  const post = getPostById(id)

  if (!post) {
    return <NotFound />
  }

  return (
    <div className={`${CONTENT_MAX_WIDTH} mx-auto py-12 px-8 bg-background md:py-8 md:px-4`}>
      <article className="bg-background p-0">
        <header className="mb-12 pb-8 border-b border-border">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <span className="text-primary font-semibold">{post.category}</span>
            <span className="text-text-tertiary leading-[1.8] before:content-['·'] before:mr-2">{formatDateToKorean(post.date)}</span>
          </div>
          <h1 className="m-0 text-[2.5rem] leading-[1.3] tracking-[-0.02em] text-text-primary md:text-[2rem]">{post.title}</h1>
        </header>
        
        <div className="post-body leading-[1.8] text-text-primary text-base">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => <h2 className="mt-12 mb-4 text-[1.75rem] text-text-primary md:text-2xl md:mt-8">{children}</h2>,
              h3: ({ children }) => <h3 className="mt-8 mb-3 text-xl text-text-primary">{children}</h3>,
              p: ({ children }) => <p className="mb-6 text-text-secondary">{children}</p>,
              ul: ({ children }) => <ul className="mb-6 ml-6 list-disc text-text-secondary space-y-2">{children}</ul>,
              ol: ({ children }) => <ol className="mb-6 ml-6 list-decimal text-text-secondary space-y-2">{children}</ol>,
              li: ({ children }) => <li className="leading-[1.8] pl-1">{children}</li>,
              code: ({ className, children, ...props }: any) => {
                const isInline = !className
                if (isInline) {
                  return (
                    <code className="bg-background-secondary px-2 py-1 rounded text-primary text-sm font-mono" {...props}>
                      {children}
                    </code>
                  )
                }
                // 코드 블록의 경우 pre에서 스타일링 (pre 안에 있으므로 흰색 텍스트)
                return <code className="text-white text-sm font-mono" {...props}>{children}</code>
              },
              pre: ({ children }: any) => {
                return (
                  <pre className="bg-black text-white p-6 rounded-xl overflow-x-auto my-8">
                    {children}
                  </pre>
                )
              },
              a: ({ href, children }) => (
                <a href={href} className="text-primary underline hover:text-[#1B64DA]" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              strong: ({ children }) => <strong className="font-bold text-text-primary">{children}</strong>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-text-secondary">
                  {children}
                </blockquote>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  )
}

export default BlogPost

