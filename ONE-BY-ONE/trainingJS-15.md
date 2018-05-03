# Training JS #15:

Create a function that flattens a two-dimensional array.

Given this array:

```js
var arr = [[1,2,3], [4,5,6], [7,8,9]];
```

Its flattened version is:
```js
[1,2,3,4,5,6,7,8,9]
```


### My Solution:
```js
function flatten(arr) {
  var combineArr = [];
  for(var i = 0, len = arr.length; i < len; i++) {
    var firstArr = arr[i];
    for(var j = 0, leng = firstArr.length; j < leng; j++) {
      combineArr.push(firstArr[j]);
    }
  }
}
```

## Solution by Others:
```js
function flatten(arr) {
  return arr.reduce((prev, next) => prev.concat(next))
}
```

```js
function flatten(arr) {
    var arrRet = [];

    for( var i = 0; i < arr.length; i++ ) {
        arrRet = arrRet.concat( arr[ i ] );
    }

    console.log( arrRet );
}
```