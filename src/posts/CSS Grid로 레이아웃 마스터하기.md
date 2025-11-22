---
title: CSS Grid로 레이아웃 마스터하기
date: 2025-11-01
category: CSS
excerpt: CSS Grid를 활용하여 복잡한 레이아웃을 쉽고 효율적으로 구성하는 방법을 배워봅니다.
---

CSS Grid는 2차원 레이아웃 시스템으로, Flexbox보다 더 강력하고 유연한 레이아웃을 만들 수 있습니다.

## Grid의 기본 개념

Grid는 컨테이너와 아이템으로 구성됩니다. 컨테이너에 `display: grid`를 설정하면 자식 요소들이 Grid 아이템이 됩니다.

## 기본 사용법

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
}
```

## 반응형 Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
```

이렇게 하면 화면 크기에 따라 자동으로 열의 개수가 조정됩니다.

## Grid vs Flexbox

- **Grid**: 2차원 레이아웃 (행과 열)
- **Flexbox**: 1차원 레이아웃 (행 또는 열)

복잡한 레이아웃이 필요할 때는 Grid를, 간단한 정렬이 필요할 때는 Flexbox를 사용하는 것이 좋습니다.

