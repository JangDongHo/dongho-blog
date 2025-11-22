import { Link, useParams } from 'react-router-dom'
import './BlogPost.css'

function BlogPost() {
  const { id } = useParams()
  
  // 실제로는 API나 데이터베이스에서 가져올 데이터
  const posts = {
    '1': {
      title: 'React 시작하기',
      date: '2025-11-20',
      category: 'React',
      content: `
        React는 Facebook에서 개발한 사용자 인터페이스를 만들기 위한 JavaScript 라이브러리입니다.
        
        ## 주요 특징
        
        1. **컴포넌트 기반**: UI를 독립적이고 재사용 가능한 컴포넌트로 분할합니다.
        2. **가상 DOM**: 성능을 최적화하기 위해 가상 DOM을 사용합니다.
        3. **단방향 데이터 흐름**: 데이터가 부모에서 자식으로 흐르는 단방향 구조입니다.
        
        ## 시작하기
        
        React를 시작하려면 다음과 같이 설치할 수 있습니다:
        
        \`\`\`bash
        npm create vite@latest my-app -- --template react
        cd my-app
        npm install
        npm run dev
        \`\`\`
        
        이제 React 개발을 시작할 준비가 되었습니다!
      `
    },
    '2': {
      title: 'Vite로 빠른 개발 환경 구축',
      date: '2025-11-18',
      category: 'Tools',
      content: `
        Vite는 빠른 개발 서버와 최적화된 빌드를 제공하는 차세대 프론트엔드 빌드 도구입니다.
        
        ## Vite의 장점
        
        1. **빠른 서버 시작**: ES 모듈을 사용하여 즉시 서버가 시작됩니다.
        2. **빠른 HMR**: Hot Module Replacement가 매우 빠릅니다.
        3. **최적화된 빌드**: Rollup을 사용한 프로덕션 빌드.
        
        ## 설치 및 사용
        
        \`\`\`bash
        npm create vite@latest
        \`\`\`
        
        Vite는 React, Vue, Svelte 등 다양한 프레임워크를 지원합니다.
      `
    },
    '3': {
      title: 'JavaScript 최신 기능들',
      date: '2025-11-15',
      category: 'JavaScript',
      content: `
        JavaScript는 계속해서 발전하고 있으며, 매년 새로운 기능들이 추가됩니다.
        
        ## ES2024의 주요 기능
        
        1. **Optional Chaining**: 안전하게 중첩된 객체 속성에 접근
        2. **Nullish Coalescing**: null 또는 undefined 체크를 간단하게
        3. **Promise.allSettled**: 모든 Promise의 결과를 기다림
        
        ## 예제 코드
        
        \`\`\`javascript
        // Optional Chaining
        const name = user?.profile?.name ?? 'Anonymous'
        
        // Nullish Coalescing
        const port = config.port ?? 3000
        \`\`\`
        
        이러한 기능들을 활용하면 더 안전하고 읽기 쉬운 코드를 작성할 수 있습니다.
      `
    }
  }
  
  const post = posts[id]
  
  if (!post) {
    return (
      <div className="blog-post-page">
        <p>게시글을 찾을 수 없습니다.</p>
        <Link to="/blog">블로그로 돌아가기</Link>
      </div>
    )
  }

  return (
    <div className="blog-post-page">
      <Link to="/blog" className="back-link">← 블로그로 돌아가기</Link>
      
      <article className="post-content">
        <header className="post-header">
          <div className="post-meta">
            <span className="post-category">{post.category}</span>
            <span className="post-date">{post.date}</span>
          </div>
          <h1>{post.title}</h1>
        </header>
        
        <div className="post-body">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  )
}

export default BlogPost

