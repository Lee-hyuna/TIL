# Training JS #20:

Create a function that determines the data type of a value more comprehensively than typeof. It should determine the types of:

- Boolean
- Number
- String
- Array
- Object
- Function
- Null
- Undefined
- Date


```js
type([]); // returns 'array'
type({}); // returns 'object'
type(new Date()); // returns 'date'
type(null); // returns 'null'
```

> It should return the data type as a string in all lowercase letters.

### My Solution:
```js
function type(value) {
  if( value instanceof Array ) { 
    return 'array' 
  } else if(Object(value) === value && value.constructor.toString().indexOf('Object') > -1) {
    return 'object'
  } else if( value instanceof Date ) {
    return 'date'
  }else {
    return 'null'
  }
}
```

## Solution by Others:
```js
function type(value) {
   if(value){
       return value.constructor.name.toLowerCase();
   } else {
       return null;
   }
}
```

```js
function type(value) {
    var strType = Object.prototype.toString.call( value );
    var OBJECT_START = "[object ";
    var OBJECT_END = "]";

    var strRest = strType.split( OBJECT_START )[1];
    strType = strRest.split( OBJECT_END )[0];

    return strType.toLowerCase();
}
```