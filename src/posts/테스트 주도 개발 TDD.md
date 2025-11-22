---
title: 테스트 주도 개발 TDD
date: 2025-10-15
category: Testing
excerpt: TDD 방법론을 통해 더 안정적이고 신뢰할 수 있는 코드를 작성하는 방법을 알아봅니다.
---

TDD(Test-Driven Development)는 테스트를 먼저 작성하고, 그 테스트를 통과하는 코드를 작성하는 개발 방법론입니다.

## TDD 사이클

1. **Red**: 실패하는 테스트 작성
2. **Green**: 테스트를 통과하는 최소한의 코드 작성
3. **Refactor**: 코드 개선 및 리팩토링

## Jest로 테스트 작성하기

```javascript
// sum.test.js
describe('sum 함수', () => {
  test('두 숫자를 더한다', () => {
    expect(sum(1, 2)).toBe(3)
  })
  
  test('음수도 처리한다', () => {
    expect(sum(-1, -2)).toBe(-3)
  })
})
```

## React 컴포넌트 테스트

```javascript
import { render, screen } from '@testing-library/react'
import Button from './Button'

test('버튼이 클릭되면 이벤트가 발생한다', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>클릭</Button>)
  
  fireEvent.click(screen.getByText('클릭'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

## TDD의 장점

- **자신감 있는 리팩토링**: 테스트가 있으면 안전하게 코드를 개선할 수 있습니다.
- **명확한 요구사항**: 테스트가 요구사항을 문서화합니다.
- **버그 조기 발견**: 개발 단계에서 문제를 찾을 수 있습니다.

TDD는 초기에는 느려 보일 수 있지만, 장기적으로는 개발 속도와 코드 품질을 향상시킵니다.

