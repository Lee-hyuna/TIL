# Training JS #49:
A small frog wants to get to the other side of a river. The frog is initially located on one bank of the river (position 0) and wants to get to the opposite bank (position X+1). Leaves fall from a tree onto the surface of the river.

You are given an array A consisting of N integers representing the falling leaves. A[K] represents the position where one leaf falls at time K, measured in seconds.

The goal is to find the earliest time when the frog can jump to the other side of the river. The frog can cross only when leaves appear at every position across the river from 1 to X (that is, we want to find the earliest moment when all the positions from 1 to X are covered by leaves). You may assume that the speed of the current in the river is negligibly small, i.e. the leaves do not change their positions once they fall in the river.

For example, you are given integer X = 5 and array A such that:

```js
  A[0] = 1
  A[1] = 3
  A[2] = 1
  A[3] = 4
  A[4] = 2
  A[5] = 3
  A[6] = 5
  A[7] = 4
```

In second 6, a leaf falls into position 5. This is the earliest time when leaves appear in every position across the river.

Write a function:

```js
function solution(X, A);
```

that, given a non-empty array A consisting of N integers and integer X, returns the earliest time when the frog can jump to the other side of the river.

If the frog is never able to jump to the other side of the river, the function should return −1.

For example, given X = 5 and array A such that:

```js
  A[0] = 1
  A[1] = 3
  A[2] = 1
  A[3] = 4
  A[4] = 2
  A[5] = 3
  A[6] = 5
  A[7] = 4
```
the function should return 6, as explained above.

**Assume that:**
- N and X are integers within the range [1..100,000];
- each element of array A is an integer within the range [1..X].

**Complexity:**
- expected worst-case time complexity is O(N);
- expected worst-case space complexity is O(X) (not counting the storage required for input arguments).

## Solution by Others:
```js
function solution(X, A) {
  const toSet = new Set(A)
  const uniques = [...toSet]
  let result = 0
  
  if(uniques.length !== X) {
      result = -1
  } else {
      result = A.indexOf(uniques[uniques.length - 1])
  }
  return result
}
```


```js
function solution(X, A) {
    let leaves = [...Array(X)].map((value, i) => i+1);
    let sum = leaves.reduce((sum,next) => sum+=next)
    let result = -1;
    for(let i = 0, length = A.length; i < length; i++ ){
        
        if(leaves[A[i]-1] === A[i]){
            leaves[A[i]-1] = 0;
            sum -= A[i];
        }
        
        if(sum === 0){
            result = i;    
            break;
        }
    }
    
    return result;
}
```


```js
function solution(X, A) {
    const tot = X * (X + 1) / 2
    const resultArr = []
    let subTot = 0
    let index = -1
    for (let K = 0; K < A.length; K++) {
        const el = A[K]
        if (el <= X && typeof resultArr[el-1] == 'undefined') {
            resultArr[el - 1] = el
            subTot += el
        }
        if (resultArr.length == X && tot == subTot) {
            index = K
            break;
        }
    }
    return index
}
```