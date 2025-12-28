# 동호의 블로그

Next.js 15와 React 19를 사용한 개인 블로그 프로젝트입니다.

## 🚀 기술 스택

- **Next.js 15** - React 프레임워크 (App Router)
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Tailwind CSS 4** - 유틸리티 기반 CSS 프레임워크
- **Notion API** - 동적 콘텐츠 관리 (선택사항)

## 📁 프로젝트 구조

```
dongho-blog/
├── src/
│   ├── app/              # Next.js App Router 페이지
│   │   ├── layout.tsx    # 루트 레이아웃
│   │   ├── page.tsx      # 홈 페이지
│   │   ├── about/        # About 페이지
│   │   └── posts/[id]/   # 블로그 포스트 페이지
│   ├── components/        # 재사용 가능한 컴포넌트
│   ├── contexts/          # React Context
│   ├── lib/              # 유틸리티 함수
│   ├── posts/            # 마크다운 포스트 파일
│   └── types/            # TypeScript 타입 정의
├── public/               # 정적 파일
└── next.config.ts        # Next.js 설정
```

## 💻 시작하기

### 필요 조건

- Node.js 18.0 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 코드 검사
npm run lint
```

## 📝 주요 기능

- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 화면에서 최적화
- 🎨 **다크 모드 지원**: 사용자 설정에 따른 테마 전환
- 🔍 **파일 기반 라우팅**: Next.js App Router를 통한 자동 라우팅
- 📝 **마크다운 블로그**: 마크다운 파일로 블로그 포스트 관리
- 🚀 **빠른 로딩**: Next.js의 최적화된 빌드 및 서버 사이드 렌더링

## 🛠️ 커스터마이징

### Notion API 설정

블로그 포스트를 Notion에서 동적으로 가져오려면 다음 환경 변수를 설정하세요:

1. **Notion API 키 생성**
   - [Notion Integrations](https://www.notion.so/my-integrations)에서 새 integration 생성
   - Internal integration 선택
   - 생성된 API 키를 복사

2. **Notion 데이터베이스 설정**
   - Notion에서 블로그 포스트용 데이터베이스 생성
   - 다음 속성(Properties) 추가:
     - `title` 또는 `Title` 또는 `제목` (Title 타입)
     - `date` 또는 `Date` 또는 `날짜` (Date 타입)
     - `category` 또는 `Category` 또는 `카테고리` (Select 또는 Multi-select 타입)
     - `excerpt` 또는 `Excerpt` 또는 `요약` (Rich text 타입)
   - 데이터베이스 페이지에서 "Connections" → 생성한 integration 연결
   - 데이터베이스 URL에서 ID 복사 (32자리 문자열, 하이픈 포함)

3. **환경 변수 설정**
   - 프로젝트 루트에 `.env.local` 파일 생성:
   ```env
   NOTION_API_KEY=secret_xxxxxxxxxxxxx
   NOTION_DATABASE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```

4. **개발 서버 재시작**
   ```bash
   npm run dev
   ```

### 블로그 게시글 추가 (정적 파일 방식)

정적 파일 방식을 사용하려면 `src/posts/` 폴더에 마크다운 파일을 추가하고, `src/lib/posts.ts`에 import를 추가하세요.

마크다운 파일 형식:
```markdown
---
title: 게시글 제목
date: 2025-01-01
category: 카테고리
excerpt: 요약 내용
---

게시글 본문...
```

## 📄 라이센스

이 프로젝트는 개인 학습 및 포트폴리오 목적으로 제작되었습니다.
