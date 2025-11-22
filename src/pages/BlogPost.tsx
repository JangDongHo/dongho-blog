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
        
        <div className="post-body leading-[1.8] text-text-primary text-[1.1rem]">
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
              img: ({ src, alt, ...props }: any) => {
                // 경로 변환 로직
                let imageSrc = src || ''
                
                // 외부 URL인 경우 그대로 사용
                if (imageSrc.startsWith('http://') || imageSrc.startsWith('https://')) {
                  // 외부 이미지 그대로 사용
                }
                // 절대 경로(/images/...)인 경우 그대로 사용
                else if (imageSrc.startsWith('/images/')) {
                  // 이미 절대 경로면 그대로 사용
                }
                // 상대 경로인 경우 게시글 ID 기반 폴더로 변환
                else {
                  // ./images/file.png 또는 images/file.png 또는 file.png
                  const filename = imageSrc
                    .replace(/^\.\/images\//, '')
                    .replace(/^images\//, '')
                    .replace(/^\.\//, '')
                  imageSrc = `/images/${post.id}/${filename}`
                }
                
                return (
                  <div className="my-8">
                    <img 
                      src={imageSrc} 
                      alt={alt || ''} 
                      className="w-full h-auto rounded-xl shadow-lg"
                      loading="lazy"
                      onError={() => {
                        // 이미지 로드 실패 시 기본 이미지 또는 에러 처리
                        console.warn(`이미지를 로드할 수 없습니다: ${imageSrc}`)
                      }}
                      {...props}
                    />
                    {alt && alt !== 'image.png' && (
                      <p className="text-center text-text-tertiary text-sm mt-2 italic">{alt}</p>
                    )}
                  </div>
                )
              },
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

