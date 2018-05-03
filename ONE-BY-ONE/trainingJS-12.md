# Training JS #12:

Create a function that removes all duplicate items from an array. It should return a new array with the items of the input array in sequential order, minus the duplicate items.

```js
removeDuplicates([1,2,3,3,4,5]); // returns [1,2,3,4,5]
removeDuplicates([null,'str',null,'str']); // returns [null,'str']
removeDuplicates([{},{}]); // returns [{},{}]
```

### My Solution:
```js
function removeDuplicates(arr) {
  return [...new Set(arr)].filter(x => new Set(arr).has(x));
}
```

## Solution by Others:
```js
function hasAlready( v, arr ) {
    for( var i = 0, len = arr.length; i < len; i++ ) {
        if( arr[ i ] === v ) {
            return true;
        }
    }

    return false;
}

function removeDuplicates( arr ) {
  var arrNew = [];
  var originValue;

  for( var i = 0, len = arr.length; i < len; i++ ) {
    originValue = arr[ i ];

    if( !hasAlready( originValue, arrNew ) ) {
        arrNew.push( originValue );
    }
  }

  console.log( arrNew );
}
```

```js
function removeDuplicates( arr ) {
   var tempArr = [];
   for(var i = 0; i < arr.length; i++ ) {
       // 배열의 체크 indexOf
       if(tempArr.indexOf( arr[i] ) === -1) {
           tempArr.push( arr[i] );
       }
   }
   console.log(tempArr);
   return tempArr;
}
```