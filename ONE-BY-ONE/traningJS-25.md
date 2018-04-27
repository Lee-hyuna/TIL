# Training JS #25:

Create a function that deep clones an object that contains strings, numbers, arrays, object literals, and functions. It must clone all nested object literals and arrays. Functions do not need to be cloned and can be copied over.

```js
const original = {
  nestedObj: {
    anotherNestedObj: {}
  },
  numbers: [1,2,3],
  func() {}
};

const clone = deepClone(original);

// Verify it is a true deep clone
clone.nestedObj.x = true;
console.log(original.nestedObj.x); // undefined
console.log(original.numbers !== clone.numbers); // true
console.log(original.func !== clone.func); // false –– allowed to be copied over
```

### My Solution:
```js
function deepClone(obj) {
  let newObj = {};
  Object.keys(obj).forEach(key => {
    if(obj[key] && obj[key].constructor.name === 'Object') {
      newObj[key] = deepClone(obj[key]);
    } else if (obj[key] && obj[key].constructor.name === 'Array') {
      newObj[key] = obj[key].map(data => data);    
    } else {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}
```

## Solution by Others:
```js
function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function deepClone(obj) {
  let copied = {};
  
  let keys = Object.keys(org);

  let key;
  let value;

  for(var i=0; i<keys.length; ++i) {
      key = keys[ i ];
      value = org[ key ];

      if( Array.isArray( value ) ) {
          copied[ key ] = value.slice();
      } else if( isFunction( value ) ) {
          copied[ key ] = value;
      } else {
          copied[ key ] = deepClone( value );
      }
  }

  return copied;
}
```

```js
function deepClone(obj) {
  let newObj = {};
  Object.keys(obj).forEach(key => {
    if(obj[key] && obj[key].constructor.name === 'Object') {
      newObj[key] = deepClone(obj[key]);
    } else if (obj[key] && obj[key].constructor.name === 'Array') {
      newObj[key] = obj[key].map(data => data);    
    } else {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

const original = {
  nestedObj: {
    anotherNestedObj: {}
  },
  numbers: [1,2,3],
  func() {}
};

// 참조복사와 값복사 알아보기.
```