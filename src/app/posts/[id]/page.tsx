import { Renderer } from '@/components/notion/Renderer'
import { CONTENT_MAX_WIDTH } from '@/config/layout'
import { getNotionPostById } from '@/lib/notion'
import { formatDateToKorean } from '@/utils/date'
import "katex/dist/katex.min.css"
import { notFound } from 'next/navigation'
import "prismjs/themes/prism-tomorrow.css"
import "react-notion-x/src/styles.css"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getNotionPostById(id);

  if (!post) {
    notFound()
  }

  return (
    <div className={`${CONTENT_MAX_WIDTH} mx-auto py-12 px-8 bg-background md:py-8 md:px-4`}>
      <article className="bg-background p-0">
        <header className="mb-12 pb-8 border-b border-border">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <span className="text-text-tertiary">{formatDateToKorean(post.date)}</span>
          </div>
          <h1 className="m-0 text-[2.5rem] leading-[1.3] tracking-[-0.02em] text-text-primary md:text-[2rem]">{post.title}</h1>
        </header>
        <Renderer recordMap={post.recordMap} />
      </article>
    </div>
  )
}
