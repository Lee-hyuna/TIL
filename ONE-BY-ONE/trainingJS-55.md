# Training JS #55:

3개의 정수 A, B, K가 인자로 주어집니다.

K로 나눌 수 있는 범위 [A..B]내의 정수의 개수를 반환합니다.


`i : A <= i <= B, i / K = 0`

예를 들어 A = 6, B = 11 및 K = 2 인 경우 함수는 [6..11],

즉 6, 8 및 10 범위에서 2로 나눌 수있는 세 개의 숫자가 있으므로 3을 반환해야합니다.

- A와 B는 [ 0 .. 2,000,000,000 ] 범위의 정수입니다 .
- K는 [ 1 .. 2,000,000,000 ] 범위의 정수입니다 .
- A <= B


## My solution

```js
function solution(A) {
  let result = [];
  let acc = A.reduce((prev, curr, idx) => (idx > 0 ? prev + curr : 0));

  A.forEach((el, idx) => {
    sum += el;
    result.push(Math.abs(sum - (acc - A[0])));

    if (idx + 1 <= A.length - 1) {
      acc = acc - A[idx + 1];
    }
  });

  return result.reduce(function(prev, curr, idx) {
    return idx > 0 ? (prev < curr ? prev : curr) : curr;
  }, 0);
}
```
