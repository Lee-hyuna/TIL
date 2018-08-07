# Training JS #48:

Write a function:

```js
function solution(A, B, K);
```

that, given three integers A, B and K, returns the number of integers within the range [A..B] that are divisible by K, i.e.:

```js
{ i : A ≤ i ≤ B, i mod K = 0 }
```

For example, for A = 6, B = 11 and K = 2, your function should return 3, because there are three numbers divisible by 2 within the range [6..11], namely 6, 8 and 10.


**Assume that:** 
- A and B are integers within the range [0..2,000,000,000];
- K is an integer within the range [1..2,000,000,000];
- A ≤ B.


**Complexity:**
- expected worst-case time complexity is O(1);
- expected worst-case space complexity is O(1).

### My Solution:
```js
function solution(A, B, K) {
    var newArr = [...Array(B-A +1)].map(() => A++)
    var result = 0
    
    newArr.forEach(el => {
        var possible = String(el / K)
        if(possible.indexOf('.') === -1) {
            result++
        }
    })
    
    return result
}
```

## Solution by Others:
```js
function solution(A, B, K) {
    const diff = A - B < 0 ? B - A : A - B
    let count = 0
    for(let i = 0; i < diff; i++){
        if((A + i) % K === 0) {
            count++
        }
    }
    return count
}
```