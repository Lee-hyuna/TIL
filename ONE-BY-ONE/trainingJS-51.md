# Training JS #51:

```
An array A consisting of N integers is given. Rotation of the array means that each element is shifted right by one index, and the last element of the array is moved to the first place. For example, the rotation of array A = [3, 8, 9, 7, 6] is [6, 3, 8, 9, 7] (elements are shifted right by one index and 6 is moved to the first place).

The goal is to rotate array A K times; that is, each element of A will be shifted to the right K times.

Write a function:

function solution(A, K);

that, given an array A consisting of N integers and an integer K, returns the array A rotated K times.

For example, given

    A = [3, 8, 9, 7, 6]
    K = 3
the function should return [9, 7, 6, 3, 8]. Three rotations were made:

    [3, 8, 9, 7, 6] -> [6, 3, 8, 9, 7]
    [6, 3, 8, 9, 7] -> [7, 6, 3, 8, 9]
    [7, 6, 3, 8, 9] -> [9, 7, 6, 3, 8]
For another example, given

    A = [0, 0, 0]
    K = 1
the function should return [0, 0, 0]

Given

    A = [1, 2, 3, 4]
    K = 4
the function should return [1, 2, 3, 4]

Assume that:

N and K are integers within the range [0..100];
each element of array A is an integer within the range [−1,000..1,000].
```

## Solution by Others:

```js
function solution(A, K) {
  if (typeof A != "undefined") {
    while (A.length > 0 && K > 0) {
      A = [A.pop()].concat(A); // A.unshift(A.pop())로 수정해도 됨
      K--;
    }
  }
  return A;
}
```

```js
function solution(A, K) {
  var result = [];
  var copyA = Array.prototype.slice.call(A);

  if (copyA.length === 0) {
    return result;
  }

  while (K > 0) {
    copyA = shift(copyA);
    K--;
  }
  result = Array.prototype.slice.call(copyA);
  return result;
}

function shift(array) {
  var result = [];
  var copyArray = Array.prototype.slice.call(array);

  var lastValue = copyArray.pop();
  copyArray.unshift(lastValue);

  result = Array.prototype.slice.call(copyArray);
  return result;
}
```

```js
function solution(A, K) {
  let result = [];
  for (let i = 0; i < A.length; i++) {
    result[(i + K) % A.length] = A[i];
  }
  return result;
}
```
