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

// ---------------------------------------------------------------------------
// Notion 요청 레이트 리미터
// 공식 제한: 초당 평균 3개 (https://developers.notion.com/reference/request-limits)
// next.config.ts에서 cpus: 1로 빌드 워커를 1개로 제한해야
// 이 싱글턴이 전체 빌드에서 공유되어 제한이 올바르게 동작한다.
// ---------------------------------------------------------------------------
class NotionRateLimiter {
  private readonly queue: Array<() => void> = []
  private isProcessing = false
  private lastRequestTime = 0
  private readonly intervalMs: number

  constructor(requestsPerSecond: number) {
    this.intervalMs = Math.ceil(1000 / requestsPerSecond)
  }

  execute<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push(async () => {
        try {
          resolve(await fn())
        } catch (err) {
          reject(err)
        }
      })
      this.pump()
    })
  }

  private async pump() {
    if (this.isProcessing) return
    this.isProcessing = true

    while (this.queue.length > 0) {
      const wait = Math.max(0, this.intervalMs - (Date.now() - this.lastRequestTime))
      if (wait > 0) await new Promise<void>((r) => setTimeout(r, wait))

      const task = this.queue.shift()
      if (task) {
        this.lastRequestTime = Date.now()
        await task()
      }
    }

    this.isProcessing = false
  }
}

// 2 req/s (500ms 간격): 공식 제한 3 req/s에 충분한 안전 마진
const notionLimiter = new NotionRateLimiter(2)

// 레이트 리미터 + 429 발생 시 Retry-After 헤더 기반 재시도
async function notionFetch<T>(fn: () => Promise<T>, maxRetries = 4): Promise<T> {
  return notionLimiter.execute(async () => {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn()
      } catch (err: any) {
        const is429 =
          err?.status === 429 ||
          err?.statusCode === 429 ||
          String(err?.message).includes('429')

        if (!is429 || attempt === maxRetries) throw err

        const retryAfterSec = err?.headers?.['retry-after']
        const waitMs = retryAfterSec
          ? parseInt(retryAfterSec) * 1000
          : 5000 * (attempt + 1)

        console.warn(
          `Notion 429 rate limited. ${waitMs}ms 후 재시도 (${attempt + 1}/${maxRetries})`
        )
        await new Promise<void>((r) => setTimeout(r, waitMs))
      }
    }
    throw new Error('unreachable')
  })
}

// ---------------------------------------------------------------------------
// notion-client의 응답 구조를 react-notion-x가 기대하는 형태로 정규화
// 최신 notion-client는 { spaceId, value: { value: {...}, role } } 형태로 반환하지만
// react-notion-x는 { value: {...}, role } 형태를 기대함
// ---------------------------------------------------------------------------
function normalizeRecordMap(recordMap: any): any {
  const recordTypes = ['block', 'collection', 'collection_view', 'notion_user']
  const normalized = { ...recordMap }

  for (const type of recordTypes) {
    if (!normalized[type]) continue
    const records: Record<string, any> = {}
    for (const [id, record] of Object.entries<any>(normalized[type])) {
      if (record?.value?.value !== undefined) {
        records[id] = {
          role: record.value.role,
          value: record.value.value,
        }
      } else {
        records[id] = record
      }
    }
    normalized[type] = records
  }

  return normalized
}

// page/collection_view_page 타입이 아닌 블록들의 content ID만 수집
// (서브페이지나 DB rows로 재귀적으로 빠지는 것을 방지)
const PAGE_BLOCK_TYPES = new Set(['page', 'collection_view_page'])

function collectContentBlockIds(recordMap: any, rootPageId: string): string[] {
  const ids = new Set<string>()
  for (const [id, block] of Object.entries<any>(recordMap.block || {})) {
    const value = block?.value
    if (!value) continue
    // 루트 페이지 자신은 항상 포함, 나머지 page 타입은 content를 따라가지 않음
    if (id !== rootPageId && PAGE_BLOCK_TYPES.has(value.type)) continue
    const content: string[] = value.content || []
    for (const contentId of content) {
      ids.add(contentId)
    }
  }
  return Array.from(ids)
}

// 페이지의 블록 콘텐츠 가져오기 (누락된 블록까지 모두 가져옴)
async function getPageContent(pageId: string): Promise<any> {
  const notion = getNotionAPI()

  // getPage 내부에서도 여러 번 API 호출이 발생하므로 레이트 리미터 적용
  const raw = await notionFetch(() => notion.getPage(pageId))
  const recordMap = normalizeRecordMap(raw)

  // notion-client의 fetchMissingBlocks 로직이 구조 변경으로 인해 제대로 작동하지 않으므로
  // 정규화 이후 누락된 블록을 배치로 순차 가져옴 (레이트 리미터 통과)
  const BATCH_SIZE = 100
  let iterations = 0
  const MAX_ITERATIONS = 5

  while (iterations < MAX_ITERATIONS) {
    const allContentIds = collectContentBlockIds(recordMap, pageId)
    const missingIds = allContentIds.filter((id) => !recordMap.block[id])

    if (missingIds.length === 0) break

    const batches: string[][] = []
    for (let i = 0; i < missingIds.length; i += BATCH_SIZE) {
      batches.push(missingIds.slice(i, i + BATCH_SIZE))
    }

    let fetchedCount = 0
    for (const batch of batches) {
      const res = await notionFetch(() => notion.getBlocks(batch))
      const newBlocks = res?.recordMap?.block || {}
      const normalized = normalizeRecordMap({ block: newBlocks }).block
      Object.assign(recordMap.block, normalized)
      fetchedCount += Object.keys(normalized).length
    }

    if (fetchedCount === 0) break
    iterations++
  }

  return recordMap
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

