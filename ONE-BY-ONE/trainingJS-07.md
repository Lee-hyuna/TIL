# Training JS #7:

Create a function that adds up all integers from 1 to the input number. The input number is any positive integer >= 1. If 5 is the input number, then the value to return is 1 + 2 + 3 + 4 + 5 which is 15.

```js
addUpFrom1To(10); // returns 55
```

### My Solution:

```js
function addUpFrom1To(n) {
  return n > 1 ? n + addUpFrom1To( n - 1 ) : 1;
}
```

## Solution by Others:
```js
function addUpFrom1To(n) {
  var result = 0;
  for(var i = 1; i < n + 1; i++) {
    result = result + i;
  }
  return result;
}
```
