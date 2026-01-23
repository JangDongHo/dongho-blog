import { getNotionPosts, getNotionPostById } from '@/lib/notion'
import { NextResponse } from 'next/server'

// ISO 8601 날짜를 RFC 822 형식으로 변환
function toRFC822Date(dateString: string | undefined): string {
  if (!dateString) {
    return new Date().toUTCString()
  }
  
  try {
    const date = new Date(dateString)
    return date.toUTCString()
  } catch {
    return new Date().toUTCString()
  }
}

// XML 특수문자 이스케이프
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Notion 블록의 텍스트 추출
function getTextFromBlock(block: any): string {
  if (!block?.value?.properties?.title) {
    return ''
  }
  
  return block.value.properties.title
    .map((item: any) => {
      if (Array.isArray(item)) {
        return item[0] || ''
      }
      return item || ''
    })
    .join('')
}

// Notion recordMap을 HTML로 변환
function recordMapToHtml(recordMap: any): string {
  if (!recordMap?.block) {
    return ''
  }

  const blocks = Object.values(recordMap.block) as any[]
  const htmlParts: string[] = []

  // 페이지 블록을 찾아서 그 자식들을 순회
  const pageBlock = blocks.find((block: any) => block?.value?.type === 'page')
  if (!pageBlock?.value?.content) {
    return ''
  }

  const contentBlockIds = pageBlock.value.content

  for (const blockId of contentBlockIds) {
    const block = recordMap.block[blockId]
    if (!block?.value) continue

    const blockType = block.value.type
    const text = getTextFromBlock(block)

    if (!text) continue

    switch (blockType) {
      case 'heading_1':
        htmlParts.push(`<h1>${escapeXml(text)}</h1>`)
        break
      case 'heading_2':
        htmlParts.push(`<h2>${escapeXml(text)}</h2>`)
        break
      case 'heading_3':
        htmlParts.push(`<h3>${escapeXml(text)}</h3>`)
        break
      case 'text':
      case 'paragraph':
        htmlParts.push(`<p>${escapeXml(text)}</p>`)
        break
      case 'bulleted_list':
        htmlParts.push(`<li>${escapeXml(text)}</li>`)
        break
      case 'numbered_list':
        htmlParts.push(`<li>${escapeXml(text)}</li>`)
        break
      case 'quote':
        htmlParts.push(`<blockquote>${escapeXml(text)}</blockquote>`)
        break
      case 'code':
        htmlParts.push(`<pre><code>${escapeXml(text)}</code></pre>`)
        break
      default:
        // 기타 블록 타입은 paragraph로 처리
        if (text) {
          htmlParts.push(`<p>${escapeXml(text)}</p>`)
        }
    }
  }

  return htmlParts.join('\n')
}

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

    if (!baseUrl) {
      return new NextResponse('NEXT_PUBLIC_SITE_URL 환경 변수가 설정되지 않았습니다.', {
        status: 500,
      })
    }

    // Notion에서 포스트 가져오기
    const posts = await getNotionPosts()
    
    // 최신순으로 20개만 선택 (이미 날짜 내림차순으로 정렬되어 있음)
    const recentPosts = posts.slice(0, 20)

    // 각 포스트의 상세 정보 가져오기 (병렬 처리)
    const postsWithContent = await Promise.all(
      recentPosts.map(async (post) => {
        const fullPost = await getNotionPostById(post.id)
        return {
          ...post,
          recordMap: fullPost?.recordMap || null,
        }
      })
    )

    // RSS 2.0 XML 생성
    const rssItems = postsWithContent
      .map((post) => {
        const postUrl = `${baseUrl}/posts/${post.id}`
        const title = escapeXml(post.title)
        const pubDate = toRFC822Date(post.date)
        const contentHtml = post.recordMap ? recordMapToHtml(post.recordMap) : ''
        
        // CDATA로 HTML 콘텐츠 감싸기
        const description = contentHtml 
          ? `<![CDATA[${contentHtml}]]>`
          : ''

        return `    <item>
      <title>${title}</title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>${description ? `\n      <description>${description}</description>` : ''}
    </item>`
      })
      .join('\n')

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>동호의 블로그</title>
    <link>${baseUrl}</link>
    <description>Slow and steady, with pleasure.</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>`

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('RSS 피드 생성 중 오류 발생:', error)
    return new NextResponse('RSS 피드를 생성하는 중 오류가 발생했습니다.', {
      status: 500,
    })
  }
}
