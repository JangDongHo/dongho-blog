import { REVALIDATE_TIME } from '@/config/constants';
import type { BlogPost, Post } from '@/types';
import { Client } from '@notionhq/client';
import { unstable_cache } from 'next/cache';
import { NotionAPI } from 'notion-client';

// Notion 클라이언트 초기화
export function getNotionClient() {
  const notionToken = process.env.NOTION_API_KEY
  if (!notionToken) {
    throw new Error('NOTION_API_KEY 환경 변수가 설정되지 않았습니다.')
  }
  return new Client({ auth: notionToken })
}

// Notion API 초기화
export function getNotionAPI() {
  return new NotionAPI()
}

// Notion 페이지의 속성을 Post 타입으로 변환
 
export function notionPageToBlogPost(page: any): BlogPost | null {
  try {
    const properties = page.properties;

    // 제목 추출
    const title = properties['이름'].title[0].plain_text;

    // 날짜 추출
    const date = properties['생성일'].date?.start;

    return {
      id: page.id,
      title,
      date,
    }
  } catch (error) {
    console.error('Notion 페이지를 Post로 변환하는 중 오류 발생:', error)
    return null
  }
}

 
function notionPageToPost(page: any, recordMap: any): Post | null {
  try {
    const properties = page.properties
    const title = properties['이름']?.title?.[0]?.plain_text || '제목 없음'
    const date = properties['생성일']?.date?.start || new Date().toISOString().split('T')[0]

    return {
      id: page.id,
      title,
      date,
      recordMap: recordMap || {},
    }
  } catch (error) {
    console.error('Notion 페이지를 Post로 변환하는 중 오류 발생:', error)
    return null
  }
}

// Notion 데이터베이스에서 모든 포스트 가져오기 (내부 함수)
async function _getNotionPosts(): Promise<BlogPost[]> {
  const databaseId = process.env.NOTION_DATABASE_ID
  if (!databaseId) {
    throw new Error('NOTION_DATABASE_ID 환경 변수가 설정되지 않았습니다.')
  }

  const notion = getNotionClient()
  const posts: BlogPost[] = []

  try {
    // 1. 데이터베이스 정보 가져오기 (data_sources 확인)
     
    const database = await notion.databases.retrieve({
      database_id: databaseId
    }) as any

    // 2. data_sources가 없으면 에러
    if (!database.data_sources || database.data_sources.length === 0) {
      throw new Error('데이터베이스에 data source가 없습니다.')
    }

    // 3. 첫 번째 data source ID 사용
    const dataSourceId = database.data_sources[0].id
    let cursor: string | undefined = undefined

    // 4. dataSources.query()로 페이지 가져오기
    do {
      const response = await notion.dataSources.query({
        data_source_id: dataSourceId,
        start_cursor: cursor,
        filter_properties: ['이름', '생성일'],
        sorts: [
          {
            property: '생성일',
            direction: 'descending',
          },
        ],
        page_size: 100, // 한 번에 가져올 최대 페이지 수
      })

      const pages = response.results || []
      for (const page of pages) {
        const post = notionPageToBlogPost(page)
        if (post) {
          posts.push(post)
        }
      }

      cursor = response.next_cursor || undefined
    } while (cursor)

    return posts
  } catch (error) {
    console.error('Notion에서 포스트를 가져오는 중 오류 발생:', error)
    throw error
  }
}

// 캐싱된 Notion 포스트 목록 가져오기
export const getNotionPosts = unstable_cache(
  _getNotionPosts,
  ['notion-posts'],
  {
    revalidate: REVALIDATE_TIME,
    tags: ['notion-posts'],
  }
)

// 캐싱된 Notion 포스트 가져오기 (id별로 캐싱)
export async function getNotionPostById(pageId: string): Promise<Post | null> {
  const cachedFn = unstable_cache(
    async () => _getNotionPostById(pageId),
    ['notion-post', pageId],
    {
      revalidate: REVALIDATE_TIME,
      tags: ['notion-post', `notion-post-${pageId}`],
    }
  )
  return cachedFn()
}

// 페이지의 블록 콘텐츠 가져오기
async function getPageContent(pageId: string): Promise<any> {
  const notion = getNotionAPI()
  const recordMap = await notion.getPage(pageId);

  return recordMap;
}

// Notion 페이지 ID로 특정 포스트 가져오기
async function _getNotionPostById(pageId: string): Promise<Post | null> {
  const notion = getNotionClient()

  try {
    // 1. 페이지 properties 가져오기
    const page = await notion.pages.retrieve({ page_id: pageId })
    
    // 2. 페이지 블록 콘텐츠 가져오기
    const recordMap = await getPageContent(pageId)
    
    // 3. Post 객체로 변환
    return notionPageToPost(page, recordMap)
  } catch (error) {
    console.error('Notion에서 포스트를 가져오는 중 오류 발생:', error)
    return null
  }
}

