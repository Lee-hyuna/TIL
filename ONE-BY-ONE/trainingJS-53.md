# Training JS #52:

> 연속된 숫자가 들어있는 배열에서 존재 하지 않는 값을 찾는 문제

```
An array A consisting of N different integers is given. The array contains integers in the range [1..(N + 1)], which means that exactly one element is missing.

Your goal is to find that missing element.

Write a function:

function solution(A);

that, given an array A, returns the value of the missing element.

For example, given array A such that:

  A[0] = 2
  A[1] = 3
  A[2] = 1
  A[3] = 5
the function should return 4, as it is the missing element.

Assume that:

N is an integer within the range [0..100,000];
the elements of A are all distinct;
each element of array A is an integer within the range [1..(N + 1)].
Complexity:

expected worst-case time complexity is O(N);
expected worst-case space complexity is O(1) (not counting the storage required for input arguments).
```
## My solution
```js
function solution(A) {
    var result = A.sort(function(a,b) {return a-b})
    for(var i = 0, len = result.length; i < len; i++) {
        if(result[i] != i+1) {
            return compare(result[i-1],result[i])
        }
    }
}

function compare(a,b) {
    return Math.min(a,b) + Math.abs(a-b) - 1
}
```
## Solution by Others:

수학 공식을 이용하여 풀었다. 1개가 비어있는 배열이니 4개가 있으면 5개가 있다고 생각을 하여 1~5까지 더하고, 현재 배열의 값을 모두 더해서 뺀 값이 없는 값이다.
> 1부터 n까지의 수를 더하는 공식: n * (n+1) /2

```js
function solution(A) {
   const len = A.length

   return len ? ((len + 1) * (len + 2) / 2) - A.reduce((ac, el)=>ac+el) : 1
}
```

> Set: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set
```js
function solution(A) {
    const set = new Set(A);
    let i = 1;

    while (set.has(i)) {
        i++;
    }
    return i;
}
```