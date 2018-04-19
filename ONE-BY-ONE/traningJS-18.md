# Training JS #18:

Create a function that can determine if two objects have the same property keys. They do not need to have the same value. The function should return true or false.

```js
var a = { x: 1, y: 1 };
var b = { x: 0, y: 2 };
var c = { y: 1, z: 1 };
var d = { y: 1, z: 1, a: 1 };

sameKeys(a, b); // returns true
sameKeys(b, c); // returns false
sameKeys(c, d); // returns false
```

### My Solution:
```js
function sameKeys(obj1, obj2) {
  for(var key in obj1) {
    if(obj2.hasOwnProperty(key)) continue
  }
  
  for(key in obj2) {
    if(obj1.hasOwnProperty(key) !== obj2.hasOwnProperty(key)) return false
  }
  return true
}
```

## Solution by Others:
```js
function sameKeys(obj1, obj2) {
  var keys1 = Object.keys(obj1);
  var keys2 = Object.keys(obj2);
  var totalResult = [];
  var arr1 = keys1.length > keys2.length ? keys1 : keys2;
  var arr2 = keys1.length > keys2.length ? keys2 : keys1;
  var isResult = true;
  
  arr1.forEach(o1 => {
    var isResult = false;
    arr2.forEach(o2 => {
      if(o1 === o2) {
        isResult = true;
      }
    })
    totalResult.push(isResult)
  })
  
  totalResult.forEach(result => {
    if(!result) { isResult = false; }
  })
  
  return isResult;
}
```

```js
function sameKeys(obj1, obj2) {
  var arrKey1 = Object.keys( obj1 );
  var key1;

  for(var i=0; i<arrKey1.length; ++i) {
      key1 = arrKey1[ i ];

      if( !obj2.hasOwnProperty( key1 ) ) {
          return false;
      }
  }

  var arrKey2 = Object.keys( obj2 );

  if( arrKey1.length != arrKey2.length ) {
      return false;
  }

  return true;
}
```