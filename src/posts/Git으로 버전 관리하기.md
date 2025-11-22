---
title: Git으로 버전 관리하기
date: 2025-10-25
category: Tools
excerpt: Git의 기본 개념과 실무에서 자주 사용하는 명령어들을 정리합니다.
---

Git은 분산 버전 관리 시스템으로, 코드의 변경 이력을 추적하고 협업을 용이하게 만들어줍니다.

## Git의 핵심 개념

1. **Repository**: 프로젝트의 모든 파일과 변경 이력이 저장되는 곳
2. **Commit**: 변경사항을 저장하는 단위
3. **Branch**: 독립적인 작업 공간
4. **Merge**: 브랜치를 합치는 작업

## 기본 명령어

```bash
# 저장소 초기화
git init

# 파일 스테이징
git add .

# 커밋 생성
git commit -m "커밋 메시지"

# 상태 확인
git status

# 변경 이력 확인
git log
```

## 브랜치 관리

```bash
# 브랜치 생성 및 이동
git checkout -b feature/new-feature

# 브랜치 병합
git merge feature/new-feature

# 브랜치 삭제
git branch -d feature/new-feature
```

## 원격 저장소와 동기화

```bash
# 원격 저장소 추가
git remote add origin https://github.com/user/repo.git

# 푸시
git push origin main

# 풀
git pull origin main
```

Git을 잘 활용하면 효율적인 협업과 코드 관리가 가능합니다.

