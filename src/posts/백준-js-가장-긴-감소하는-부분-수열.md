---
title: [JavaScript] 백준 가장 긴 감소하는 부분 수열
date: 2025-12-26
category: 알고리즘
excerpt: 백준 JavaScript 가장 긴 감소하는 부분 수열 문제 풀이
---

## 문제 설명

- 수열 A가 주어졌을 때, 가장 긴 감소하는 부분 수열의 길이를 구하는 문제

## 예제 입력/출력

- 입력
    
    ```text
    6
    10 30 10 20 20 10
    ```
    

- 출력
    
    ```text
    3
    ```
    

## 제약 조건

- $1 ≤ N ≤ 1,000$
- $1 ≤ A_{i} ≤ 1,000$

## 문제 풀이

### DP

> **✅ 시간 복잡도: $O(N^2)$**
> 
1. **상태 정의**
    
    ```jsx
    dp[i] = i번째 원소를 마지막으로 하는 가장 긴 감소 부분 수열의 길이
    ```
    
2. **DP 초기화**
    
    ```jsx
    dp[i] = 1
    ```
    
    - 모든 원소는 자기 자신만으로 길이 1의 감소 부분 수열을 만들 수 있기 때문에 dp 배열을 1로 초기화 해준다.
3. **점화식**
    
    ```jsx
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < i; j++) {
        // 감소 조건을 만족하는지 확인하고, dp 배열 갱신
        if (A[j] > A[i]) {
          dp[i] = Math.max(dp[i], dp[j] + 1);
        }
      }
    }
    ```
    
    - 이중 for문으로 수열 A를 탐색하면서 i번째 원소와 j번째 원소를 비교해서 j번째 원소보다 i번째 원소가 더 작을 경우 dp 배열을 갱신해준다.
4. **최종 답**
    
    ```jsx
    Math.max(...dp)
    ```
    
    - dp 배열 중 최대값을 선택한다.

## 풀이 코드

### DP

```jsx
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : `${__dirname}/input.txt`;
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const A = input[1].split(" ").map(Number);

const dp = new Array(N).fill(1);
let result = 1;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (A[j] > A[i]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
  result = Math.max(result, dp[i]);
}

console.log(result);
```

- 최종적으로 답을 구할 때 `Math.max(…dp)` 대신에 result 변수를 하나 만들어서 가장 긴 감소하는 부분 수열의 길이를 매번 갱신하도록 했다.