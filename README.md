# 동호의 블로그

React와 Vite를 사용한 개인 블로그 프로젝트입니다.

## 🚀 기술 스택

- **React 18.3** - UI 라이브러리
- **Vite 5.4** - 빌드 도구 및 개발 서버
- **React Router 6.28** - 클라이언트 사이드 라우팅
- **CSS3** - 스타일링

## 📁 프로젝트 구조

```
dongho-blog/
├── public/
│   └── vite.svg
├── src/
│   ├── components/       # 재사용 가능한 컴포넌트
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── Home.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogPost.jsx
│   │   ├── About.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

## 🎯 주요 기능

- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 화면에서 최적화
- 🎨 **다크 모드 지원**: 시스템 설정에 따른 자동 테마 전환
- 🔍 **라우팅**: React Router를 통한 SPA 라우팅
- 📝 **블로그 게시글**: 카테고리별 게시글 관리
- 🚀 **빠른 로딩**: Vite의 빠른 HMR과 최적화된 빌드

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

# 빌드 결과 미리보기
npm run preview
```

## 📝 사용 가능한 스크립트

- `npm run dev` - 개발 서버 시작
- `npm run build` - 프로덕션 빌드
- `npm run preview` - 빌드된 앱 미리보기
- `npm run lint` - ESLint로 코드 검사

## 🛠️ 커스터마이징

### 블로그 게시글 추가

`src/pages/Blog.jsx`에서 게시글 배열을 수정하여 새로운 게시글을 추가할 수 있습니다.

### 스타일 변경

각 컴포넌트와 페이지는 별도의 CSS 파일을 가지고 있어 독립적으로 스타일을 수정할 수 있습니다.

### 테마 커스터마이징

`src/index.css`의 CSS 변수를 수정하여 전체적인 테마 색상을 변경할 수 있습니다.

## 📄 라이센스

이 프로젝트는 개인 학습 및 포트폴리오 목적으로 제작되었습니다.

## 🤝 기여

피드백과 제안은 언제나 환영합니다!

---

⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!
