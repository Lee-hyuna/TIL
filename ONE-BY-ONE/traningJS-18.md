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
...