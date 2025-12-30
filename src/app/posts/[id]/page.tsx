import { Renderer } from '@/components/notion/Renderer'
import { getNotionPostById, getNotionPosts } from '@/lib/notion'
import { formatDateToKorean } from '@/utils/date'
import "katex/dist/katex.min.css"
import { notFound } from 'next/navigation'
import "prismjs/themes/prism-tomorrow.css"
import "react-notion-x/src/styles.css"

interface PageProps {
  params: Promise<{ id: string }>
}

// SSG + ISR: 빌드 타임에 모든 포스트 페이지를 미리 생성 (SSG)
// generateStaticParams로 모든 포스트 ID를 가져와서 정적 페이지로 빌드
export async function generateStaticParams() {
  try {
    const posts = await getNotionPosts()
    return posts.map((post) => ({
      id: post.id,
    }))
  } catch (error) {
    console.error('포스트 목록을 가져오는 중 오류 발생:', error)
    return []
  }
}

// ISR 설정: 1시간마다 재검증
// 빌드 시 생성된 페이지가 1시간 후 다음 요청 시 백그라운드에서 자동으로 재검증
// 새 포스트가 추가되면 1시간 내에 자동으로 반영됨
export const revalidate = 3600

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getNotionPostById(id);

  if (!post) {
    notFound()
  }

  return (
    <div className={`mx-auto py-12 px-8 bg-background md:py-8 md:px-4`}>
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
