---
title: [JavaScript] 프로그래머스 완벽범죄
date: 2025-12-24
category: 알고리즘
excerpt: 프로그래머스 JavaScript 완벽범죄 문제 풀이
---

## 문제 설명

- 두 도둑이 모두 경찰에 붙잡히지 않도록 물건을 훔쳤을 때, **A 도둑이 남긴 흔적의 누적 개수의 최솟값**을 구하는 문제

## 예제 입력/출력

| info | n | m | result |
| --- | --- | --- | --- |
| [[1, 2], [2, 3], [2, 1]] | 4 | 4 | 2 |
| [[1, 2], [2, 3], [2, 1]] | 1 | 7 | 0 |
| [[3, 3], [3, 3]] | 7 | 1 | 6 |
| [[3, 3], [3, 3]] | 6 | 1 | -1 |

## 제약 조건

- 1 ≤ `info`의 길이(`N`) ≤ 40
    - `info[i]` = 물건 `i`를 훔칠 때 생기는 흔적의 개수
    - `[A에 대한 흔적 개수, B에 대한 흔적 개수]`의 형태
    - 1 ≤ `흔적 개수` ≤ 3
- 1 ≤ `n` ≤ 120
- 1 ≤ `m` ≤ 120

## 문제 풀이

### 1. 브루트포스

> **❌ 시간 복잡도: $O(2^{40})$**
> 
- 각 물건마다 선택지는 2개
    - A가 훔치거나
    - B가 훔치거나
- 물건의 최대 개수는 40개이므로 가능한 모든 경우의 수는 $2^{40}$
- 매우 비효율적!!

### 2. 그리디

> **❌ 불가능**
> 
- 그렇다면 매 물건마다 A와 B의 흔적을 비교해서 더 작은 쪽을 선택하는 방식은 어떨까?
- 각 물건의 선택은 미래 선택 가능성에 영향을 준다.
    - 한 번 B 도둑의 흔적을 많이 사용하면, 이후 물건에서 B 도둑을 사용할 수 없게 될 수 있다.
- 즉, 현재 최적의 선택이 전체 최적을 보장하지 않는다.

### 3. 2차원 DP

> ✅ 시간 복잡도: $O(N \cdot m)$
($N ≤ 40, m ≤ 120$)
> 
1. **상태 정의**
    
    ```jsx
    dp[i][b] = i번째 물건까지 고려했을 때,
               B 도둑의 흔적이 b인 경우의
               A 도둑 흔적 최소값
    ```
    
    - $0 ≤ i ≤$ info.length
    - $0 ≤ b < m$
2. **DP 초기화**
    
    ```jsx
    dp[0][0] = 0
    dp[0][b≠0] = INF
    ```
    
    - 아직 아무 물건도 훔치지 않았을 경우 A와 B는 모두 0
3. **점화식**
    - 물건 `i`의 흔적이 `(a_cost, b_cost)`일 때
    - **1️⃣ A 도둑이 i번 물건을 훔치는 경우**
        
        ```jsx
        dp[i+1][b] = min(
        	dp[i+1][b],
        	dp[i][b] + a_cost
        )
        ```
        
        - 단, `dp[i][b] + a_cost < n` 일 경우에만 가능
    - **2️⃣ B 도둑이 i번 물건을 훔치는 경우**
        
        ```jsx
        dp[i+1][b + b_cost] = min(
        	dp[i+1][b + b_cost],
        	dp[i][b]
        )
        ```
        
        - 단, `b + b_cost < m` 일 경우에만 가능
4. **최종 답**
    
    ```jsx
    const answer = Math.min(...dp[N]);
    return answer === INF ? -1 : answer;
    ```
    
    - `N = info.length`
    - `i`번째 물건에서 A 도둑의 흔적이 가장 작은 값이 정답
    - 만약 모든 값이 `INF` 라면 어떠한 방법으로도 두 도둑 모두 경찰에 붙잡히지 않게 할 수 없다는 뜻
    

## 풀이 코드

### 1️⃣ 2차원 DP

```jsx
function solution(info, n, m) {
    const N = info.length;
    const INF = 1e9;
    
    // 1. 2차원 DP 생성
    const dp = Array.from({ length: N + 1 }, () => Array(m).fill(INF));
    
    // 2. DP 초기화
    dp[0][0] = 0;
    
    // 3. 점화식
    for (let i = 0; i < N; i++) {
        const [aCost, bCost] = info[i];
        
        for (let b = 0; b < m; b++) {
            if (dp[i][b] === INF) continue;
            
            // A 도둑이 i번 물건을 훔치는 경우
            if (dp[i][b] + aCost < n) {
                dp[i + 1][b] = Math.min(dp[i + 1][b], dp[i][b] + aCost)
            }
            
            // B 도둑이 i번 물건을 훔치는 경우
            if (b + bCost < m) {
                dp[i + 1][b + bCost] = Math.min(dp[i + 1][b + bCost], dp[i][b])   
            }
        }
    }
    
    // 4. 최종 답
    const answer = Math.min(...dp[N]);
    return answer === INF ? -1 : answer;
}
```