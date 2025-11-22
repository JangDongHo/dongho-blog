---
title: Node.js로 백엔드 API 구축하기
date: 2025-10-28
category: Backend
excerpt: Node.js와 Express를 사용하여 RESTful API를 구축하는 방법을 단계별로 알아봅니다.
---

Node.js는 JavaScript를 서버 사이드에서 실행할 수 있게 해주는 런타임 환경입니다. Express 프레임워크와 함께 사용하면 빠르게 API를 구축할 수 있습니다.

## Express 프로젝트 시작하기

```bash
npm init -y
npm install express
npm install -D @types/express typescript ts-node
```

## 기본 서버 설정

```javascript
const express = require('express')
const app = express()

app.use(express.json())

app.get('/api/posts', (req, res) => {
  res.json({ posts: [] })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
```

## RESTful API 설계 원칙

- **GET**: 리소스 조회
- **POST**: 리소스 생성
- **PUT**: 리소스 전체 수정
- **PATCH**: 리소스 부분 수정
- **DELETE**: 리소스 삭제

## 미들웨어 활용

```javascript
// 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// 에러 핸들링
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message })
})
```

Node.js와 Express를 사용하면 빠르고 효율적인 백엔드 API를 구축할 수 있습니다.

