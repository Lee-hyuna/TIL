# Training JS #46

**문제 설명**

A non-empty array A consisting of N integers is given.

A permutation is a sequence containing each element from 1 to N once, and only once.

> For example, array A such that:

```js
A[0] = 4;
A[1] = 1;
A[2] = 3;
A[3] = 2;
```

is a permutation, but array A such that:

```js
A[0] = 4;
A[1] = 1;
A[2] = 3;
```

is not a permutation, because value 2 is missing.

The goal is to check whether array A is a permutation.

Write a function:

function solution(A);

that, given an array A, returns 1 if array A is a permutation and 0 if it is not.

For example, given array A such that:

```js
A[0] = 4;
A[1] = 1;
A[2] = 3;
A[3] = 2;
```

the function should return 1.

Given array A such that:

```js
A[0] = 4;
A[1] = 1;
A[2] = 3;
```

the function should return 0.

Assume that:

N is an integer within the range [1..100,000];

each element of array A is an integer within the range [1..1,000,000,000].

Complexity:

expected worst-case time complexity is O(N);

expected worst-case space complexity is O(N) (not counting the storage required for input arguments).

## My Solution:

```js
function solution(A) {
  // A = [4,1,3,2]
  // A = [4,1,3]

  var arr = A.sort((a, b) => a - b);
  var result;

  for (var i = 0; i < A.length; i++) {
    if (A[i] === A[i + 1]) {
      result = 0;
      break;
    }
    result = A[i] === i + 1 ? 1 : 0;
  }

  return result;
}
```

## Another by solution:

```js
function solution(A) {
  const set = new Set(A);
  const uniques = [...set];
  const n = uniques.length;
  const totalSum = (n * (n + 1)) / 2;
  const sum = uniques.reduce((arr, val) => arr + val);

  return totalSum - sum === 0 ? 1 : 0;
}
```

```js
function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  let result = 1;
  let sortedA = A.sort(function(a, b) {
    return a - b;
  });

  for (let i = 0, length = sortedA.length; i < length; i++) {
    let prevValue = sortedA[i];

    if (sortedA[i + 1] !== undefined) {
      if (++prevValue !== sortedA[i + 1]) {
        result = 0;
        break;
      }
    }
  }

  return result;
}
```

```js
function solution(A) {
  return A.sort((a, b) => a - b).every((el, idx) => el == idx + 1) * 1;
}
```
