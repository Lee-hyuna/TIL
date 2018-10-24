# Training JS #54:

> 하나의 배열을 P 기준 (N-1 까지)으로 두개로 쪼개서 각 배열의 합을 뺀 절대 값 중 제일 작은 것을 찾는 문제

```
A non-empty array A consisting of N integers is given. Array A represents numbers on a tape.

Any integer P, such that 0 < P < N, splits this tape into two non-empty parts: A[0], A[1], ..., A[P − 1] and A[P], A[P + 1], ..., A[N − 1].

The difference between the two parts is the value of: |(A[0] + A[1] + ... + A[P − 1]) − (A[P] + A[P + 1] + ... + A[N − 1])|

In other words, it is the absolute difference between the sum of the first part and the sum of the second part.

For example, consider array A such that:

  A[0] = 3
  A[1] = 1
  A[2] = 2
  A[3] = 4
  A[4] = 3
We can split this tape in four places:

P = 1, difference = |3 − 10| = 7
P = 2, difference = |4 − 9| = 5
P = 3, difference = |6 − 7| = 1
P = 4, difference = |10 − 3| = 7
Write a function:

function solution(A);

that, given a non-empty array A of N integers, returns the minimal difference that can be achieved.

For example, given:

  A[0] = 3
  A[1] = 1
  A[2] = 2
  A[3] = 4
  A[4] = 3
the function should return 1, as explained above.

Assume that:

N is an integer within the range [2..100,000];
each element of array A is an integer within the range [−1,000..1,000].
Complexity:

expected worst-case time complexity is O(N);
expected worst-case space complexity is O(N) (not counting the storage required for input arguments).
```

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

## Solution by Others:

```js
function solution(A) {
  let different = [];
  let presentSum = 0;
  let remainSum = A.reduce((a, b) => a + b);

  for (n of A) {
    presentSum += n;
    remainSum -= n;
    different.push(Math.abs(presentSum - remainSum));
  }

  return Math.min(...different);
}
```

```js
function solution(A) {
  const tot = A.reduce((ac, el) => ac + el);
  let final;
  A.reduce((ac, el) => {
    const val = Math.abs(ac - (tot - ac));
    if (typeof final == "undefined") final = val;
    else final = final < val ? final : val;

    return ac + el;
  });
  return final;
}
```
