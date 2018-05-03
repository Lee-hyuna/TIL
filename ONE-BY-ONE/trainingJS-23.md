# Training JS #23:

Recreate the common array methods `forEach`, `map`, and `filter`, requiring only the item and index as arguments.

`forEach()` loops through the array and invokes the callback argument for each item, passing the item and its index as arguments.

`map()` loops through the array and returns a new array with each returned value of the callback as the new item at that specific index.

`filter()` loops through the array and returns a new array with items for which the callback returned a truthy value.

Your goal is to replicate these functions. Instead of being array methods, however, they are standalone functions which use the array as the first argument.

Example usage:


```js
forEach([1,2,3,4,5], function (item, index) {
  console.log(item, index);
});

var squares = map([1,2,3,4,5], function (item, index) {
  return item * item;
});
// squares = [1,4,9,16,25]

var lessThanFour = filter([1,2,3,4,5], function (item, index) {
  return item < 4;
});
// lessThanFour = [1,2,3]
```

> **Note:** You cannot simply use the array methods themselves inside the functions. This is checked for and will result in point deductions. You must implement your own native code.



### My Solution:
```js
function forEach(arr, callback) {
  var val = arr;
  for(var i = 0, len = val.length; i < len; i++) {
    callback(i, val[i])
  }
}

function map(arr, callback) {
  var val = arr;
  var result = [];
  for(var i = 0, len = val.length; i < len; i++) {
    result.push(callback(val[i], i))
  }
  return result
}

function filter(arr, callback) {
  var val = arr;
  var result = [];
  for(var i = 0, len = val.length; i < len; i++) {
    if(callback(val[i], i)) {
      result.push(val[i])
    }
  }
  return result
}
```

## Solution by Others:
```js
function forEach(arr, callback) {
  if(!arr || !arr.length || !callback || typeof callback !== 'function') {
    return;
  }
  for(var i = 0; i < arr.length; i++) {   
    callback(arr[i], i)
  }
}

function map(arr, callback) {
  if(!arr || !arr.length || !callback || typeof callback !== 'function') {
    return;
  }
  var result = [];
  for(var i = 0; i < arr.length; i++) {   
    result.push(callback(arr[i], i))
  }
  return result;
}

function filter(arr, callback) {
  if(!arr || !arr.length || !callback || typeof callback !== 'function') {
    return;
  }
  var result = [];
  for(var i = 0; i < arr.length; i++) {
    if(callback(arr[i], i)) {
      result.push(arr[i])
    }
  }
  return result
}
```