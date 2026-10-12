# dongho-blog

구 Notion 블로그(`dongho-blog.kro.kr`)의 리디렉션 전용 저장소입니다. 모든 요청은 `https://dongho.me`로 301 이동합니다.
새 블로그: `blog-dongho` (Astro).

- `scripts/migration-map.json`: Notion 페이지 UUID → 새 글 slug 매핑
- `pnpm build-redirects`: 매핑에서 `vercel.json` 생성
