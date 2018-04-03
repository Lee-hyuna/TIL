# Training JS #1:

Create a function that determines if every item in an array is a number. The array will always have at least 1 item. It should return either true or false.

```js
containsOnlyNumbers([1,200,-42,0.3,10]); // returns true
containsOnlyNumbers([0.1,'str',2,1000,-9]); // returns false
```


### My Solution:
```js
function containsOnlyNumbers(arr) {
  for (var i = 0 , length = arr.length ; i < length ; i++) {
    var el = arr[i];
    if (typeof el !== 'number') {
      return false
    }
  }
  return true;
}
```